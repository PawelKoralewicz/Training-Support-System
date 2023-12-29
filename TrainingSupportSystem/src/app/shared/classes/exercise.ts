import { IExercise, ISet } from "../interfaces/workout-plan.interface";
import { WorkoutSet } from "./workout-set";

export class Exercise implements IExercise {
    dayNumber = 1;
    exerciseName = '';
    exerciseId: number = 0;
    sets: ISet[] = [new WorkoutSet()];
    volume: number = 0;
    
    constructor(dayNumber: number, exerciseId: number) {
        this.dayNumber = dayNumber;
        this.exerciseId = exerciseId;
    }
}