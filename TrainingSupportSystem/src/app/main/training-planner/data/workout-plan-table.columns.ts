export const workoutPlanTableCols: IWorkoutPlanColumns[] = [
    { field: 'exercise', header: 'Exercise', index: 0 },
    { field: 'setNumber', header: 'Sets', index: 1 },
    { field: 'weight', header: 'Weight', index: 3 },
    { field: 'reps', header: 'Reps', index: 4 },
]

export interface IWorkoutPlanColumns {
    field: string;
    header: string;
    index: number;
}