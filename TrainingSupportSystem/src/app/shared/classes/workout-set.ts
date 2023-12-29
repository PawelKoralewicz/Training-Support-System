import { ISet } from "../interfaces/workout-plan.interface";

export class WorkoutSet implements ISet {
    setNumber = 1;
    weight = undefined;
    reps = undefined;
    oneRmPercent = undefined;
    rpe = undefined;
    tempo = undefined;
    rest = undefined;
    volume = undefined;
    comment = undefined;

    constructor(
        set = 1, 
        reps = undefined, 
        rpe = undefined,
        tempo = undefined,
        rest = undefined,
        volume = undefined,
        comment = undefined
        ) {
        this.setNumber = set;
        this.reps = reps;
        this.rpe = rpe;
        this.tempo = tempo;
        this.rest = rest;
        this.volume = volume;
        this.comment = comment;
    }
}