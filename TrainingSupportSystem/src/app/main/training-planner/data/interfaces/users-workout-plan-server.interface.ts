import { WorkoutPlan } from "src/app/shared/classes/workout-plan";
import { IPlanCreatorForm } from "../../plan-creator/data/plan-creator-form.interface";
import { WorkoutPlanAdvancement } from "src/app/shared/enums/workout-plan-advancement.enum";
import { IWeeksPlan } from "src/app/shared/interfaces/workout-plan.interface";

export interface IUsersWorkoutPlanServer {
    data: IUsersWorkoutPlan[];
}

export interface IUsersWorkoutPlan { 
    id: number, 
    planName: string,
    options: IPlanCreatorForm, 
    plan: IWeeksPlan[],
    advancement: WorkoutPlanAdvancement
}

