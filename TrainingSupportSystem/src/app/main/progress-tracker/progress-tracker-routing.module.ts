import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressTrackerComponent } from './progress-tracker.component';
import { ChartsViewComponent } from './charts-view/charts-view.component';
import { ChartsTrackSelectorComponent } from './charts-track-selector/charts-track-selector.component';

const routes: Routes = [
  { path: '', component: ProgressTrackerComponent, children: [
    { path: '', component: ChartsTrackSelectorComponent, },
    { path: 'charts', component: ChartsViewComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressTrackerRoutingModule { }
