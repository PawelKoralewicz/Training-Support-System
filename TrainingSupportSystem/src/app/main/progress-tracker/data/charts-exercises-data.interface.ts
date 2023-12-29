import { ISet } from "src/app/shared/interfaces/workout-plan.interface";

export interface IChartsExercisesData {
    exerciseName: string;
    hasRequiredData: boolean;
    weeks: IChartsWeeksData[];
}

interface IChartsWeeksData {
    weekNumber: number;
    bodyWeight?: number;
    days: IChartsDaysData[];
}

export interface IChartsDaysData {
    dayNumber: number;
    exerciseVolume: number;
    exerciseId: number;
    sets: ISet[];
}