import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressTrackerRoutingModule } from './progress-tracker-routing.module';
import { ProgressTrackerComponent } from './progress-tracker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExerciseDataUpdateComponent } from './exercise-data-update/exercise-data-update.component';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { ChartsTrackSelectorComponent } from './charts-track-selector/charts-track-selector.component';


@NgModule({
  declarations: [
    ProgressTrackerComponent,
    ExerciseDataUpdateComponent,
    ChartsViewComponent,
    ChartsTrackSelectorComponent
  ],
  imports: [
    CommonModule,
    ProgressTrackerRoutingModule,
    SharedModule
  ]
})
export class ProgressTrackerModule { }
