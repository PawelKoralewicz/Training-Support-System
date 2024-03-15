import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { WorkoutPlan } from 'src/app/shared/classes/workout-plan';
import { workoutPlanTableCols } from '../data/workout-plan-table.columns';
import { WorkoutSet } from 'src/app/shared/classes/workout-set';
import { rpeValues } from '../../rpe-calculator/data/rpe-values';
import { WorkoutDay } from 'src/app/shared/classes/workout-day';
import { WorkoutWeek } from 'src/app/shared/classes/workout-week';
import { Exercise } from 'src/app/shared/classes/exercise';
import { MenuItem, MessageService } from 'primeng/api';
import { Icon } from 'src/app/shared/enums/icons.enum';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { homeBreadcrumbPC, planCreatorBreadcrumbItems } from './data/plan-creator.breadcrumb';
import { IPlanCreatorForm } from './data/plan-creator-form.interface';
import { TrainingPlannerService } from '../training-planner.service';
import { WorkoutPlanAdvancement } from 'src/app/shared/enums/workout-plan-advancement.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsersWorkoutPlan } from '../data/interfaces/users-workout-plan-server.interface';
import { IWeeksPlan } from 'src/app/shared/interfaces/workout-plan.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { TrainingPriority } from 'src/app/shared/enums/training-priority.enum';
import { Role } from 'src/app/shared/enums/permissions.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanSaverFormComponent } from './plan-saver-form/plan-saver-form.component';

@Component({
  selector: 'app-plan-creator',
  templateUrl: './plan-creator.component.html',
  styleUrls: ['./plan-creator.component.scss'],
  providers: [DialogService]
})
export class PlanCreatorComponent implements OnInit {
  @ViewChild('trainingPlanTable', { read: ElementRef }) trainingPlanTable!: ElementRef;

  editingMode = false;
  fromPlanGenerator = false;
  defaultPlanLength = 12;
  defaultWorkoutDays = 4;
  tables = new WorkoutPlan(this.defaultPlanLength, this.defaultWorkoutDays);
  columns = workoutPlanTableCols;
  rpeValues = rpeValues;
  tempoRegex = /^[0-9]*$/;
  displayedPage = 0;
  selectedExercise!: Exercise;
  sheetRow = 0;
  breadcrumbHome = homeBreadcrumbPC;
  breadcrumbModel = planCreatorBreadcrumbItems;
  roleOpts = Role;
  exercises: any[] = [];
  filteredExercises: any[] = [];

  userRole = this.authService.role;
  ref?: DynamicDialogRef;

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: IPlanCreatorForm = {
    oneRmPercent: false,
    rpeColumn: false,
    tempoColumn: false,
    restColumn: false,
    volumeColumn: false,
    commentColumn: false,
    trainingsPerWeek: this.defaultWorkoutDays,
    planLength: this.defaultPlanLength
  };

  contextMenuItems: MenuItem[] = [
    {
      label: 'New exercise',
      icon: Icon.PENCIL,
      command: () => this.addNewExercise(this.selectedExercise)
    },
    {
      label: 'New set',
      icon: 'pi pi-plus-circle',
      command: () => this.addNewSet(this.selectedExercise)
    },
    {
      label: 'Remove exercise',
      icon: Icon.TRASH,
      command: () => this.deleteExercise(this.selectedExercise)
    },
    {
      label: 'Remove last set',
      icon: Icon.TIMES_CIRCLE,
      command: () => this.deleteLastSet(this.selectedExercise)
    },
    {
      label: 'Mark week as deload',
      icon: '',
      command: () => this.toggleDeload()
    },
    {
      label: 'Copy to next week',
      icon: '',
      command: () => this.copyToNextWeek(this.displayedPage)
    }
  ];

  constructor(
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private trainingPlannerService: TrainingPlannerService,
    private authService: AuthService,
    public dialogService: DialogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.exercises = this.activatedRoute.snapshot.data['exercises'];
  }
  
  ngOnInit(): void {
    this.initializePlanCreator();
  }

  filterExercises(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.exercises as any[]).length; i++) {
      let exercise = (this.exercises as any[])[i];
      if (exercise.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(exercise);
      }
    }

    this.filteredExercises = filtered;
  }

  calculateVolume(exercise: Exercise) {
    let volume = 0;
    exercise.sets.forEach((set) => {
      volume += (set.weight ? set.weight : 0) * (set.reps ? set.reps : 0);
    })

    exercise.volume = volume;

    return volume;
  }

  initializePlanCreator() {
    if (history.state.plan && !history.state.editingMode && !history.state.fromGenerator) {
      this.model = history.state.plan.options;
      this.initializeColumns(this.model);
      this.initializeWorkoutPlan(history.state.plan.plan);
    } else if ((history.state.editingMode || history.state.fromGenerator) && history.state.plan) {
      history.state.editingMode ? this.editingMode = true : this.fromPlanGenerator = true;
      this.model = history.state.plan.options;
      this.initializeColumns(this.model);
      this.initializeWorkoutPlan(history.state.plan.plan);
      this.editingMode = history.state.editingMode;
    }
  }

  initializeWorkoutPlan(plan: IWeeksPlan[]) {
    this.tables.plan = [...plan];
  }

  initializeColumns(model: IPlanCreatorForm) {
    this.columns = [...workoutPlanTableCols];

    const oneRmPercent = { field: 'oneRmPercent', header: '1RM %', index: 2 };
    const rpe = { field: 'rpe', header: 'RPE', index: 5 };
    const tempo = { field: 'tempo', header: 'Tempo', index: 6 };
    const rest = { field: 'rest', header: 'rest', index: 7 };
    const volume = { field: 'volume', header: 'Volume', index: 8 };
    const comment = { field: 'comment', header: 'Comment', index: 9 };

    model.oneRmPercent ? this.columns.push(oneRmPercent) : null;
    model.rpeColumn ? this.columns.push(rpe) : null;
    model.tempoColumn ? this.columns.push(tempo) : null;
    model.restColumn ? this.columns.push(rest) : null;
    model.volumeColumn ? this.columns.push(volume) : null;
    model.commentColumn ? this.columns.push(comment) : null;

    this.columns.sort((a, b) => a.index - b.index);
  }

  toggleColumn(event: any, field: string, header: string, index: number) {
    if (event.checked) {
      this.columns.push({ field, header, index });
    } else {
      const id = this.columns.findIndex(element => element.index === index);
      this.columns.splice(id, 1);
    }

    this.columns.sort((a, b) => a.index - b.index);
  }

  toggleDeload() {
    this.tables.plan[this.displayedPage].isDeload = !this.tables.plan[this.displayedPage].isDeload;
  }

  copyToNextWeek(displayedPage: number) {
    const currWeek = JSON.parse(JSON.stringify(this.tables.plan[displayedPage].days));
    this.tables.plan[displayedPage + 1].days = currWeek;
  }

  setCmDeloadLabel() {
    this.contextMenuItems[this.contextMenuItems.length - 2].label = this.tables.plan[this.displayedPage].isDeload ? 'Unmark week as deload' : 'Mark week as deload';
  }

  cmItemsConfig() {
    this.toggleCopyingOptionState();
    this.setCmDeloadLabel();
  }

  onPageChange(event: any) {
    this.displayedPage = event.page;
  }

  toggleCopyingOptionState() {
    this.contextMenuItems[this.contextMenuItems.length - 1].disabled =
      this.displayedPage === this.model.planLength - 1
        ? true : false;
  }

  addNewExercise(selectedExercise: Exercise) {
    const exercises = this.tables.plan[this.displayedPage].days[selectedExercise.dayNumber - 1].exercises;
    const exerciseId = exercises[exercises.length - 1].exerciseId;
    exercises.push(new Exercise(selectedExercise.dayNumber, exerciseId + 1));
  }

  deleteExercise(selectedExercise: Exercise) {
    const exercises = this.tables.plan[this.displayedPage].days[selectedExercise.dayNumber - 1].exercises;
    const index = exercises.findIndex(element => element.exerciseId === selectedExercise.exerciseId);
    if (exercises.length > 1) {
      exercises.splice(index, 1);
      exercises.forEach((exercise, index) => exercise.exerciseId = index);
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'There has to be at least one exercise each day.'
      })
    }
  }

  addNewSet(selectedExercise: Exercise) {
    const sets = this.tables.plan[this.displayedPage].days[selectedExercise.dayNumber - 1].exercises[selectedExercise.exerciseId].sets;
    sets.push(new WorkoutSet(selectedExercise.sets.length + 1));
  }

  deleteLastSet(selectedExercise: Exercise) {
    const sets = this.tables.plan[this.displayedPage].days[selectedExercise.dayNumber - 1].exercises[selectedExercise.exerciseId].sets;
    if (sets.length > 1) {
      sets.pop();
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'There has to be at least one set for each exercise.'
      })
    }
  }

  exportToExcel() {
    const lastDisplayedPage = this.displayedPage;
    this.displayedPage = 0;
    this.cd.detectChanges();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.trainingPlanTable.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    for (let i = 1; i < this.tables.plan.length; i++) {
      this.displayedPage++;
      this.cd.detectChanges();
      this.appendTableInSheet(ws, i);
    }

    XLSX.utils.book_append_sheet(wb, ws, "Plan");
    this.displayedPage = lastDisplayedPage;
    XLSX.writeFile(wb, 'workout-plan.xlsx');
    this.sheetRow = 0;
  }

  appendTableInSheet(ws: XLSX.WorkSheet, week: number) {
    const row = week < 3 ? 0 : this.calculateSheetRow(week - 3);

    const column = week % 3 === 0 ? 0 : (week % 3 * this.columns.length + week % 3 * 3);

    XLSX.utils.sheet_add_dom(ws, this.trainingPlanTable.nativeElement, { origin: { r: row, c: column } });
  }

  calculateSheetRow(week: number) {
    const weeksLeft = this.tables.plan.length - (week + 1);
    const countNextWeeks = weeksLeft > 2 ? 2 : weeksLeft;

    if (week % 3 === 0) {
      const weekLengths: number[] = [];
      let setsCount = 0;

      for (let i = week; i <= week + countNextWeeks; i++) {
        const days = this.tables.plan[i].days;

        days.forEach((day: WorkoutDay) => {
          day.exercises.forEach((exercise) => {
            setsCount += exercise.sets.length;
          })
        })

        weekLengths.push(setsCount);
        setsCount = 0;
      }

      const longestWeekLength = Math.max(...weekLengths);
      const longestWeekIndex = weekLengths.findIndex(element => element === longestWeekLength);
      const weekLength = longestWeekLength + this.tables.plan[week + longestWeekIndex].days.length + 1 + 2;
      return this.sheetRow += weekLength;
    } else {
      return this.sheetRow;
    }
  }

  exportToPdf() {
    const pdf = new jsPDF('p', 'px',);
    const lastDisplayedPage = this.displayedPage;

    const table = this.trainingPlanTable.nativeElement.firstChild.firstElementChild.firstElementChild;

    autoTable(pdf, {
      html: table,
      useCss: true,
      startY: 20,
      showHead: 'firstPage'
    })

    if (this.tables.plan.length > 1) {
      for (let i = 1; i < this.tables.plan.length; i++) {
        pdf.addPage();

        this.displayedPage = i;
        this.cd.detectChanges();

        autoTable(pdf, {
          html: table,
          useCss: true,
          showHead: 'firstPage'
        })
      }
    }

    pdf.save('training-plan.pdf');

    this.displayedPage = lastDisplayedPage;
  }

  savePlanPrivate() {
    let plan = {
      options: this.model,
      plan: this.tables.plan,
    }

    this.ref = this.dialogService.open(PlanSaverFormComponent, {});
    this.ref.onClose.subscribe(data => {
      if(data) {
        if (data.planName && data.advancement && data.mainGoal && data.focus && data.priority) {
          const planData = { ...plan, ...data };
          this.trainingPlannerService.postNewPlanPrivate(planData.advancement, planData.name, planData.options, planData.plan, planData.mainGoal, planData.focus, planData.priority).subscribe(() => this.editingMode = true);
        }
      }
    })

  }

  savePlanGlobal() {
    if (this.authService.role === this.roleOpts.ADMIN) {
      let plan = {
        options: this.model,
        plan: this.tables.plan,
      }


      this.ref = this.dialogService.open(PlanSaverFormComponent, {});
      this.ref.onClose.subscribe((data) => {
        if (data) {
          if (data.planName && data.advancement && data.mainGoal && data.focus && data.priority) {
            const planData = { ...plan, ...data };
            this.trainingPlannerService.postNewPlanGlobal(planData.advancement, planData.planName, planData.options, planData.plan, planData.mainGoal, planData.focus, planData.priority).subscribe();
          }
        }
      });
    }
  }

  updatePlanPrivate() {
    if(history.state.plan && history.state.editingMode) {
      const id = history.state.plan.id;
      this.trainingPlannerService.editPlan(id, this.tables.plan, this.model).subscribe();
    }
  }

  updatePlanGlobal() {
    if(history.state.plan && history.state.fromGenerator) {
      const id = history.state.plan.id;
      this.trainingPlannerService.editPlanGlobal(id, this.tables.plan, this.model).subscribe();
    }
  }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'plan-creator-field-group',
      fieldGroup: [
        {
          fieldGroupClassName: 'plan-creator-fields',
          fieldGroup: [
            {
              key: 'oneRmPercent',
              type: 'checkbox',
              props: {
                label: '1RM %',
                onChange: (event: any) => {
                  this.toggleColumn(event, 'oneRmPercent', '1RM %', 2);
                  // this.toggleColumn(this.model, event, 2);
                },
              }
            },
            {
              key: 'rpeColumn',
              type: 'checkbox',
              props: {
                label: 'RPE',
                onChange: (event: any) => {
                  this.toggleColumn(event, 'rpe', 'RPE', 5);
                },
              }
            },
            {
              key: 'tempoColumn',
              type: 'checkbox',
              props: {
                label: 'Tempo',
                onChange: (event: any) => {
                  this.toggleColumn(event, 'tempo', 'Tempo', 6);
                },
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'plan-creator-fields',
          fieldGroup: [
            {
              key: 'restColumn',
              type: 'checkbox',
              props: {
                label: 'Rest',
                onChange: (event: any) => {
                  this.toggleColumn(event, 'rest', 'Rest', 7);
                },
              }
            },
            {
              key: 'volumeColumn',
              type: 'checkbox',
              props: {
                label: 'Volume',
                onChange: (event: any) => {
                  this.toggleColumn(event, 'volume', 'Volume', 8);
                },
              }
            },
            {
              key: 'commentColumn',
              type: 'checkbox',
              props: {
                label: 'Comment',
                onChange: (event: any) => {
                  this.toggleColumn(event, 'comment', 'Comment', 9);
                },
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'plan-creator-fields',
          fieldGroup: [
            {
              key: 'trainingsPerWeek',
              type: 'number',
              defaultValue: this.defaultWorkoutDays,
              props: {
                label: 'Trainings per week',
                showButtons: true,
                minValue: 1,
                maxValue: 7,
                ngModelChange: (value: number) => {
                  value = value > 7 ? 7 : value;
                  if (value > this.tables.plan[0].days.length) {
                    this.tables.plan.forEach(plan => {
                      for (let i = plan.days.length; i < value; i++) {
                        plan.days.push(new WorkoutDay(i + 1));
                      }
                    })
                  } else {
                    this.tables.plan.forEach(plan => {
                      plan.days.pop();
                    })
                  }
                }
              }
            },
            {
              key: 'planLength',
              type: 'number',
              defaultValue: this.defaultPlanLength,
              props: {
                label: 'Plan length',
                showButtons: true,
                minValue: 1,
                maxValue: 20,
                ngModelChange: (value: number) => {
                  value = value > 20 ? 20 : value;
                  if (value > this.tables.plan.length) {
                    for (let i = this.tables.plan.length; i < value; i++) {
                      this.tables.plan.push(new WorkoutWeek(i + 1, this.model.trainingsPerWeek));
                    }
                  } else {
                    for (let i = value; i < this.tables.plan.length; i++) {
                      this.tables.plan.pop();
                    }
                  }
                }
              },
              expressions: {
                'props.suffix': () => this.model.planLength === 1 ? ' week' : ' weeks'
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'plan-creator-fields',
          fieldGroup: [
            {
              type: 'button',
              props: {
                label: 'excel',
                command: () => this.exportToExcel()
              }
            },
            {
              type: 'button',
              props: {
                label: 'PDF',
                command: () => this.exportToPdf()
              }
            }
          ]
        }
      ]
    }
  ];
}
