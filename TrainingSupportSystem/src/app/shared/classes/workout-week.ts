import { IWeeksPlan, IWorkoutDay } from "../interfaces/workout-plan.interface";
import { WorkoutDay } from "./workout-day";

export class WorkoutWeek implements IWeeksPlan {
    weekNumber: number = 1;
    isDeload: boolean = false;
    days: IWorkoutDay[] = [];
    bodyWeight?: number;
    
    constructor(week: number, days: number) {
        this.weekNumber = week;
        for(let i = 0; i < days; i++) {
            this.days.push(new WorkoutDay(i + 1));
        }
    }
}