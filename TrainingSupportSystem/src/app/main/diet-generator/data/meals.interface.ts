import { IIngredients } from "./ingredients.interface";
import { MealType } from "./meal-type.enum";

export interface IMeal {
    ingredientName?: string;
    ingredientPortion?: number;
    mealName: string;
    mealType: MealType;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    allergens: string[];
    ingredients: IIngredients[];
}