import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingPlannerRoutingModule } from './training-planner-routing.module';
import { PlanCreatorComponent } from './plan-creator/plan-creator.component';
import { TrainingPlannerComponent } from './training-planner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainingPlannerPanelsComponent } from './training-planner-panels/training-planner-panels.component';
import { PlanCreatorChooserComponent } from './plan-creator/plan-creator-chooser/plan-creator-chooser.component';
import { PlanGenratorComponent } from './plan-genrator/plan-genrator.component';
import { PlanSaverFormComponent } from './plan-creator/plan-saver-form/plan-saver-form.component';


@NgModule({
  declarations: [
    PlanCreatorComponent,
    TrainingPlannerComponent,
    TrainingPlannerPanelsComponent,
    PlanCreatorChooserComponent,
    PlanGenratorComponent,
    PlanSaverFormComponent
  ],
  imports: [
    CommonModule,
    TrainingPlannerRoutingModule,
    SharedModule
  ]
})
export class TrainingPlannerModule { }
