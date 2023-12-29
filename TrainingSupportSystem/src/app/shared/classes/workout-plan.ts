import { IWeeksPlan, IWorkoutPlan } from "../interfaces/workout-plan.interface";
import { WorkoutWeek } from "./workout-week";

export class WorkoutPlan implements IWorkoutPlan {
    plan: IWeeksPlan[] = [];

    constructor(weeks: number, days: number) {
        for (let i = 0; i < weeks; i++) {
            this.plan.push(new WorkoutWeek(i + 1, days));
        }
    }
}