export interface IWorkoutPlan {
    plan: IWeeksPlan[];
}

export interface IWeeksPlan {
    weekNumber: number;
    isDeload: boolean;
    days: IWorkoutDay[];
    bodyWeight?: number;
}

export interface IWorkoutDay {
    dayNumber: number;
    exercises: IExercise[];
}

export interface IExercise {
    exerciseId: number;
    exerciseName: string;
    volume: number;
    sets: ISet[];
}

export interface ISet {
    setNumber: number;
    weight: number | undefined;
    oneRmPercent: number | undefined;
    rpe: number | undefined;
    reps: number | undefined;
    tempo: string | undefined;
    rest: number | undefined;
    comment: string | undefined;
}