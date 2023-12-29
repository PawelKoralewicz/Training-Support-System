import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWeeksPlan } from 'src/app/shared/interfaces/workout-plan.interface';
import { serverUrl } from 'src/app/shared/paths/server-path';
import { IPlanCreatorForm } from './plan-creator/data/plan-creator-form.interface';
import { WorkoutPlanAdvancement } from 'src/app/shared/enums/workout-plan-advancement.enum';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { TrainingPriority } from 'src/app/shared/enums/training-priority.enum';
import { IWorkoutPlansServer } from './data/interfaces/workout-plans-server';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlannerService {
  readonly url = serverUrl;

  constructor(
    private http: HttpClient,
    ) { }

  postNewPlanPrivate(advancement: WorkoutPlanAdvancement, planName: string, options: IPlanCreatorForm, plan: IWeeksPlan[], mainGoal: string, focus: string, priority: TrainingPriority) {
    const user = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    return this.http.post(this.url + 'users-workout-plans', { data: { advancement, planName, options, plan, user } });
  }

  postNewPlanGlobal(advancement: WorkoutPlanAdvancement, planName: string, options: IPlanCreatorForm, plan: IWeeksPlan[], mainGoal: string, focus: string, priority: TrainingPriority) {
    return this.http.post(this.url + 'workout-plans', { data: { advancement, planName, options, plan, mainGoal, focus, priority }})
  }

  getPlans() {
    return this.http.get<IUser>(this.url + 'users/me', { params: { populate: 'workoutPlans' } });
  }

  getExercises() {
    return this.http.get(this.url + 'exercises', { params: { sort: 'exerciseName', "pagination[limit]": 999 }});
  }

  editPlan(id: number, plan: IWeeksPlan[], options?: IPlanCreatorForm) {
    const data = options ? { plan, options } : { plan };
    return this.http.put(this.url + `users-workout-plans/${id}`, { data });
  }

  editPlanGlobal(id: number, plan: IWeeksPlan[], options: IPlanCreatorForm) {
    return this.http.put(this.url + `workout-plans/${id}`, { data: { plan, options } });
  }

  generatePlans(preferences = {}) {
    return this.http.get<IWorkoutPlansServer>(this.url + 'workout-plans', {params: { ...preferences }} )
  }
}
