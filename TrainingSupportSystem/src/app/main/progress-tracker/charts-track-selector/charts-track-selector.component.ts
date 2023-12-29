import { Component, OnInit } from '@angular/core';
import { TrainingPlannerService } from '../../training-planner/training-planner.service';
import { IUsersWorkoutPlan } from '../../training-planner/data/interfaces/users-workout-plan-server.interface';
import { IWeeksPlan } from 'src/app/shared/interfaces/workout-plan.interface';
import { IChartsExercisesData } from '../data/charts-exercises-data.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExerciseDataUpdateComponent } from '../exercise-data-update/exercise-data-update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts-track-selector',
  templateUrl: './charts-track-selector.component.html',
  styleUrls: ['./charts-track-selector.component.scss'],
  providers: [DialogService]

})
export class ChartsTrackSelectorComponent implements OnInit{
  workoutPlans: IUsersWorkoutPlan[] = [];
  exercisesSet = new Set<string>();
  exercisesList: {label: string, value: string}[] = [];
  selectedExercises: string[] = [];
  selectedPlan?: IWeeksPlan[];
  selectedExercisesData: IChartsExercisesData[] = [];
  selectedPlanId?: number;
  allExercisesValid = false;
  ref?: DynamicDialogRef;

  constructor(
    private trainingPlannerService: TrainingPlannerService,
    public dialogService: DialogService,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    this.trainingPlannerService.getPlans().subscribe(res => this.workoutPlans = res.workoutPlans);
  }

  getPlanData(plan: IWeeksPlan[], planId: number) {
    this.selectedPlan = plan;
    this.exercisesSet = new Set<string>();
    this.selectedPlanId = planId;
    this.selectedExercisesData = [];
    this.selectedExercises = [];

    plan.forEach(week => {
      week.days.forEach(day => {
        day.exercises.forEach(exercise => {
          if(exercise.exerciseName.length) {
            this.exercisesSet.add(exercise.exerciseName);
          }
        })
      })
    })
    this.exercisesSet.forEach(ex => this.exercisesList.push({ label: ex, value: ex}))
  }

  getExercisesData() {
    const exercisesData: IChartsExercisesData[] = [];

    this.selectedExercises.forEach((el, si) => {
      exercisesData.push({ exerciseName: el, weeks: [], hasRequiredData: false });

      this.selectedPlan?.forEach((week, wi) => {
        exercisesData[si].weeks.push({ weekNumber: week.weekNumber, bodyWeight: week.bodyWeight,days: [] })

        week.days.forEach((day, di) => {
          day.exercises.forEach(exercise => {
            if (exercise.exerciseName === el) {
              exercisesData[si].weeks[wi].days.push({ dayNumber: day.dayNumber, sets: exercise.sets, exerciseVolume: exercise.volume, exerciseId: exercise.exerciseId });
            }
          })
        })
      })
    })

    this.selectedExercisesData = exercisesData;
    this.validateExerciseSets();
  }

  validateExerciseSets() {
    let allExercisesValid = true;

    this.selectedExercisesData.forEach((el, si) => {
      let hasFirstRequiredData = false;
      let hasSecondRequiredData = false;

      for (let i = 0; i <= 1; i++) {
        el.weeks[i].days.forEach(day => day.sets.forEach(set => {
          if(set.weight && set.rpe && set.reps) {
            i === 0 ? hasFirstRequiredData = true : hasSecondRequiredData = true;
          }
        }))
      }
      this.selectedExercisesData[si].hasRequiredData = hasFirstRequiredData && hasSecondRequiredData ? true : false;
      if(!this.selectedExercisesData[si].hasRequiredData) allExercisesValid = false;
    })
    this.allExercisesValid = allExercisesValid;
  }

  updateExerciseData(exercise: IChartsExercisesData) {
    this.ref = this.dialogService.open(ExerciseDataUpdateComponent, { header: `Update ${exercise.exerciseName} data`, data: exercise });

    this.ref.onClose.subscribe((res) => {
      if(res) {
        exercise = res;
        this.updateSelectedPlan(res);
        this.validateExerciseSets();
        this.savePlanEdit();
      }
      },
    );
  }

  savePlanEdit() {
    if(this.selectedPlan && this.selectedPlanId)
    this.trainingPlannerService.editPlan(this.selectedPlanId, this.selectedPlan).subscribe();
  }

  updateSelectedPlan(exercise: IChartsExercisesData) {
      exercise.weeks.forEach((week, wi) => {
        week.days.forEach((day, di) => {
          if(this.selectedPlan) {
            this.selectedPlan[wi].bodyWeight = exercise.weeks[wi].bodyWeight;
            this.selectedPlan[wi].days[di].exercises.forEach(ex => {
              if(ex.exerciseName === exercise.exerciseName) {
                ex.sets = exercise.weeks[wi].days[di].sets;
                ex.volume = exercise.weeks[wi].days[di].exerciseVolume;
              }
            })
          }
        })
      } )
  }

  chartsViewRedirect() {
    if(this.allExercisesValid && this.selectedExercisesData) {
      this.router.navigateByUrl('progress-tracker/charts', { state: {data: this.selectedExercisesData }});
    }
  }
}
