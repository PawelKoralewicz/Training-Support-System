import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { imgPath } from 'src/app/shared/paths/images-path';
import { PlanCreatorChooserComponent } from '../plan-creator/plan-creator-chooser/plan-creator-chooser.component';
import { PlanGenratorComponent } from '../plan-genrator/plan-genrator.component';

@Component({
  selector: 'app-training-planner-panels',
  templateUrl: './training-planner-panels.component.html',
  styleUrls: ['./training-planner-panels.component.scss'],
  providers: [DialogService]
})
export class TrainingPlannerPanelsComponent {

  ref?: DynamicDialogRef;

  panels: {label: string, desc: string, icon: string, command?: () => void}[] = [
    {
      label: 'Plan creator',
      desc: 'Create your own training plans form scratch or based on previous ones.',
      icon: imgPath + 'plan-creator-icon.svg',
      command: () => this.choosePlan()
    },
    {
      label: 'Plan generator',
      desc: 'Fill a short form about your training goals, and get a ready to go training plan.',
      icon: imgPath + 'plan-generator-icon.svg',
      command: () => this.generatePlan()
    },
    {
      label: 'Plan editor',
      desc: 'Update any of your workout plans.',
      icon: imgPath + 'plan-editor-icon.svg',
      command: () => this.choosePlanToEdit()
    }
  ]

  constructor(public dialogService: DialogService) { }

  choosePlan() {
    this.ref = this.dialogService.open(PlanCreatorChooserComponent, { header: 'Choose a plan'});
  }

  generatePlan() {
    this.ref = this.dialogService.open(PlanGenratorComponent, { header: 'Plan generator'});
  }

  choosePlanToEdit() {
    this.ref = this.dialogService.open(PlanCreatorChooserComponent, { header: 'Choose plan to edit', data: { editingMode: true }})
  }
}
