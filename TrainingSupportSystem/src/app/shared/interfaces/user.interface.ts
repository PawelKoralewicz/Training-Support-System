import { IUsersWorkoutPlan } from "src/app/main/training-planner/data/interfaces/users-workout-plan-server.interface";
import { Role } from "../enums/permissions.enum";

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    rpeCharts: any;
    role: {
        id: number;
        name: Role;
        description: string;
    };
    workoutPlans: IUsersWorkoutPlan[];
    personalInfo: IPersonalInfo;
}

interface IPersonalInfo {
    id?: number;
    height: number;
    weight: number;
    age: number;
    activity: number;
    goal: string;
    totalCaloricDemand?: number;
    user?: number | string;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
}