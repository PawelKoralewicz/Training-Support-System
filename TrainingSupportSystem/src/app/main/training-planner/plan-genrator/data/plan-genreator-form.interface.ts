import { TrainingPriority } from "src/app/shared/enums/training-priority.enum";
import { WorkoutFocus } from "src/app/shared/enums/workout-focus.enum";
import { WorkoutMainGoal } from "src/app/shared/enums/workout-goal.enum";
import { WorkoutPlanAdvancement } from "src/app/shared/enums/workout-plan-advancement.enum";

export interface IPlanGeneratorForm {
    mainGoal?: WorkoutMainGoal, 
    advancement?: WorkoutPlanAdvancement, 
    focus?: WorkoutFocus,
    priority?: TrainingPriority
}