import { WorkoutPlanAdvancement } from "src/app/shared/enums/workout-plan-advancement.enum";
import { IWeeksPlan } from "src/app/shared/interfaces/workout-plan.interface";
import { IPlanCreatorForm } from "../../plan-creator/data/plan-creator-form.interface";
import { WorkoutMainGoal } from "src/app/shared/enums/workout-goal.enum";
import { WorkoutFocus } from "src/app/shared/enums/workout-focus.enum";
import { TrainingPriority } from "src/app/shared/enums/training-priority.enum";

export interface IWorkoutPlansServer {
    data: IWorkoutPlanGlobalServer[];
    meta: Object;
}

export interface IWorkoutPlanGlobalServer {
    id: number;
    attributes: IWorkoutPlanGlobal;
}

export interface IWorkoutPlanGlobal {
    id: number;
    advancement: WorkoutPlanAdvancement;
    planName: string;
    plan: IWeeksPlan[];
    options: IPlanCreatorForm;
    mainGoal: WorkoutMainGoal;
    focus: WorkoutFocus;
    priority: TrainingPriority;
}