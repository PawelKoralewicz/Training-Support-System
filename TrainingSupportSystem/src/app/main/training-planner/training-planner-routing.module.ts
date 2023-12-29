import { Injectable, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { TrainingPlannerComponent } from './training-planner.component';
import { PlanCreatorComponent } from './plan-creator/plan-creator.component';
import { TrainingPlannerPanelsComponent } from './training-planner-panels/training-planner-panels.component';
import { Observable, map } from 'rxjs';
import { TrainingPlannerService } from './training-planner.service';

export const exercisesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(TrainingPlannerService).getExercises().pipe(map((data: any) => data.data.map(((ex: any) => ex.attributes.exerciseName))));
}

const routes: Routes = [
  { path: '', component: TrainingPlannerComponent, children: [
    { path: '', component: TrainingPlannerPanelsComponent },
    { path: 'plan-creator', component: PlanCreatorComponent, resolve: { exercises: exercisesResolver} },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingPlannerRoutingModule { 
}
