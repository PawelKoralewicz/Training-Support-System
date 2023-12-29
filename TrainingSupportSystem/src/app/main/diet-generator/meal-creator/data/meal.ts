import { IIngredients } from "../../data/ingredients.interface";
import { MealType } from "../../data/meal-type.enum";

export class Meal {
    ingredientName: string | undefined;
    ingredientPortion: number | undefined;
    mealName: string | undefined;
    mealType: MealType | undefined;
    calories: number = 0;
    protein: number = 0;
    carbs: number = 0;
    fats: number = 0;
    allergens: string[] = [];
    ingredients: IIngredients[] = [];
}