import { IExercise, IWorkoutDay } from "../interfaces/workout-plan.interface";
import { Exercise } from "./exercise";

export class WorkoutDay implements IWorkoutDay {
    dayNumber = 1;
    exercises: IExercise[] = [new Exercise(this.dayNumber, 0)];

    constructor(day: number) {
        this.dayNumber = day;
        this.exercises = [new Exercise(this.dayNumber, 0)];

    }
}