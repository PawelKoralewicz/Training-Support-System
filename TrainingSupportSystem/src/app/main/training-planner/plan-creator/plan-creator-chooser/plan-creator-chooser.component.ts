import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingPlannerService } from '../../training-planner.service';
import { IUsersWorkoutPlan } from '../../data/interfaces/users-workout-plan-server.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IWorkoutPlanGlobal } from '../../data/interfaces/workout-plans-server';

@Component({
  selector: 'app-plan-creator-chooser',
  templateUrl: './plan-creator-chooser.component.html',
  styleUrls: ['./plan-creator-chooser.component.scss'],
})
export class PlanCreatorChooserComponent implements OnInit, OnDestroy {

  @Input() fromGenerator = false;
  @Input() editingMode = false;
  @Input() generatedPlans: IWorkoutPlanGlobal[] = [];
  @Input() generatedExact = true;

  workoutPlans: (IUsersWorkoutPlan | IWorkoutPlanGlobal)[] = [];

  constructor(
    private router: Router,
    private trainingPlannerService: TrainingPlannerService,
    public ref: DynamicDialogRef,
    public dynamicDialogConfig: DynamicDialogConfig
    ) { }

  ngOnInit(): void {
    if(this.dynamicDialogConfig.data) {
      this.editingMode = this.dynamicDialogConfig.data.editingMode ? true : false; 
    }
    this.fromGenerator ? this.workoutPlans = this.generatedPlans : this.getPlans();
  }

  ngOnDestroy(): void {
    this.fromGenerator = false;
    this.editingMode = false;
    this.generatedExact = true;
  }
  
  getPlans() {
    this.trainingPlannerService.getPlans().subscribe(res => this.workoutPlans = res.workoutPlans);
  }

  navigateToPlanCreator(plan?: IUsersWorkoutPlan | IWorkoutPlanGlobal) {
    this.ref.close();
    let state = {};

    if(this.editingMode) {
      state = { state: {plan, editingMode: true} };
    } else if(this.fromGenerator) {
      state = { state: {plan, fromGenerator: true } };
    } else {
      state = { state: { plan } };
    }
    this.router.navigateByUrl('training/plan-creator', state);
  }

}
