import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal-creator/data/meal';
import { MealType } from '../data/meal-type.enum';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-generated-diet',
  templateUrl: './generated-diet.component.html',
  styleUrls: ['./generated-diet.component.scss']
})
export class GeneratedDietComponent implements OnInit {

  dietPlan: Meal[][] = [];
  groceries: { name: string, defaultPortioning: string }[] = [];
  meals: Meal[][] = [];
  breakfasts: Meal[] = [];
  dinners: Meal[] = [];
  suppers: Meal[] = [];
  userPreferences = {
    userSelection: { calories: 2500, mealsAmount: 3, preference: 'highProtein' },
    caloriesDivision: [0.3, 0.4, 0.3],
    mealTypesDivision: [
      MealType.BREAKFAST, MealType.DINNER, MealType.SUPPER
    ]
  };

  lowestCalorieMeal = Math.min(
    ...this.breakfasts.map(el => el.calories), 
    ...this.dinners.map(el => el.calories), 
    ...this.suppers.map(el => el.calories));

  calories: number[] = [];
  dietMacros = {
    kcal: 0,
    carbs: 0,
    protein: 0,
    fats: 0
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.groceries = this.activatedRoute.snapshot.data['groceries'];
    console.log(this.groceries);
    this.initialize();
  }

  ngOnInit(): void {
    if (history.state.meals) {
      this.createMealsList();
      this.generateDiet();
      this.countDietMacros();
    }
  }

  initialize() {
    if (history.state.meals) {
      history.state.meals.map((el: Meal) => {
        if (el.mealType === MealType.BREAKFAST) {
          this.breakfasts.push(el);
        } else if (el.mealType === MealType.DINNER) {
          this.dinners.push(el);
        } else {
          this.suppers.push(el);
        }
      })
      this.userPreferences = history.state;
    }
    console.log(this.userPreferences);
  }

  createMealsList() {
    this.userPreferences.caloriesDivision.forEach(el => this.calories.push(el * this.userPreferences.userSelection.calories));

    this.userPreferences.mealTypesDivision.forEach((el, index) => {

      let meals = JSON.parse(JSON.stringify(this.breakfasts));

      if (el === MealType.DINNER) meals = JSON.parse(JSON.stringify(this.dinners));
      if (el === MealType.SUPPER) meals = JSON.parse(JSON.stringify(this.suppers));

      const adjustedMeals = this.adjustMealsPortions(meals, this.calories[index]);
      this.meals.push(adjustedMeals);
    })
  }

  adjustMealsPortions(meals: Meal[], caloriesLimit: number) {
    const mealsList: Meal[] = [];
    meals.forEach(meal => {
      const maxPortions = Math.floor(caloriesLimit / meal.calories);
      if (maxPortions > 1) {
        meal.calories *= maxPortions;
        meal.carbs *= maxPortions;
        meal.protein *= maxPortions;
        meal.fats *= maxPortions;
        meal.ingredients.forEach(ingredient => ingredient.portionSize *= maxPortions);
        mealsList.push(meal);
      } else {
        mealsList.push(meal);
      }
    })

    return mealsList;
  }



  generateDiet() {
    this.userPreferences.mealTypesDivision.forEach((type, index) => {

      let meals = JSON.parse(JSON.stringify(this.breakfasts));

      if (type === MealType.DINNER) meals = JSON.parse(JSON.stringify(this.dinners));
      if (type === MealType.SUPPER) meals = JSON.parse(JSON.stringify(this.suppers));

      const meal = [this.selectMeal(index, 0), ...this.supplyDietPlan(meals, this.calories[index], index)];

      this.dietPlan.push(meal);
    })

    this.checkIfAnyCaloriesLeft();
  }

  generateMealNumber(mealsCount: number) {
    return Math.floor(Math.random() * mealsCount);
  }

  selectMeal(index: number, mealNumber: number): Meal {
    const meal = this.meals[index][mealNumber];
    this.calories[index] -= meal.calories;
    return meal;
  }

  regenerateMeal(mealIndex: number) {
    const dishNumber = this.generateMealNumber(this.meals[mealIndex].length - 1);
    this.dietPlan[mealIndex].forEach(dish => this.calories[mealIndex] += dish.calories);
    this.dietPlan[mealIndex] = [this.selectMeal(mealIndex, dishNumber)];
    this.checkIfAnyCaloriesLeft();
  }

  supplyDietPlan(meals: Meal[], caloriesLimit: number, mealIndex: number): Meal[] {
    const index = meals.findIndex(el => el.calories <= caloriesLimit);
    const nextMealIndex = this.calories.length - 1 > mealIndex ? mealIndex + 1 : 0;

    if (index >= 0) {
      const meal = this.adjustMealsPortions([meals[index]], caloriesLimit)[0];
      const caloriesLeft = caloriesLimit - meal.calories;
      this.calories[mealIndex] -= meal.calories + caloriesLeft;
      this.calories[nextMealIndex] += caloriesLeft;
      return [meal];
    } else {
      this.calories[mealIndex] -= caloriesLimit;
      this.calories[nextMealIndex] += caloriesLimit;
      return [];
    }
  }

  checkIfAnyCaloriesLeft() {
    this.calories.forEach((cal, index) => {
      const mealType = this.userPreferences.mealTypesDivision[index]
      if (cal > 0) {
        let meals = JSON.parse(JSON.stringify(this.breakfasts));

        if (mealType === MealType.DINNER) meals = JSON.parse(JSON.stringify(this.dinners));
        if (mealType === MealType.SUPPER) meals = JSON.parse(JSON.stringify(this.suppers));

        this.dietPlan[index].push(...this.supplyDietPlan(meals, cal, index));

        this.mergeDuplicateMeals(this.dietPlan[index]);
      }
    })
    console.log(this.dietPlan);
  }

  mergeDuplicateMeals(meals: Meal[]) {
    if (meals.length > 1) {
      meals.sort((a, b) => {
        if (a.mealName && b.mealName) {
          a.mealName < b.mealName ? -1 : 1
        }
        return 0;
      })

      for (let i = 0; i < meals.length; i++) {
        if(i < meals.length - 1) {
          if(meals[i].mealName === meals[i+1].mealName) {

            meals[i].calories += meals[i+1].calories;
            meals[i].carbs += meals[i+1].carbs;
            meals[i].protein += meals[i+1].protein;
            meals[i].fats += meals[i+1].fats;

            meals[i].ingredients.forEach((el, j) => {
              el.portionSize += meals[i+1].ingredients[j].portionSize
            });

            meals.splice(i + 1, 1);
          }
        }
      }
    }
  }

  getPortioning(name: string, portion: number) {
    const index = this.groceries.findIndex(el => el.name === name);
    return `${name}, ${portion} ${this.groceries[index].defaultPortioning}`;
  }

  countDietMacros() {
    this.dietPlan.forEach(el => {
      el.forEach(dish => {
        this.dietMacros.kcal += dish.calories;
        this.dietMacros.carbs += dish.carbs;
        this.dietMacros.protein += dish.protein;
        this.dietMacros.fats += dish.fats;
      })
    })
  }

  exportToPdf() {
    let y = 10;

    const doc = new jsPDF();

    this.dietPlan.forEach((meal, mi) => {
      if(y + 10 >= doc.internal.pageSize.height - 10 || y + meal[0].ingredients.length * 10 + 20 > doc.internal.pageSize.height) {
        doc.addPage();
        y = 10;
      }

      doc.text(`Meal ${mi + 1}`, 10, y);
      y += 10;
      meal.forEach((dish, di) => {
        if(y + 10 >= doc.internal.pageSize.height - 10 || y + dish.ingredients.length * 10 > doc.internal.pageSize.height) {

          doc.addPage();
          y = 10;
        }

        doc.text(`${di + 1}. ${dish.mealName}`, 10, y);
        y += 10;
        doc.text(`${dish.calories} kcal, C: ${Math.round(dish.carbs / 10) * 10} g, P: ${Math.round(dish.protein / 10) * 10} g, F: ${Math.round(dish.fats / 10) * 10} g`, 10, y);
        y += 10;
        dish.ingredients.forEach(ingredient => {

          if(y + 10 >= doc.internal.pageSize.height - 10) {
            doc.addPage();
            y = 10;
          }
          doc.text(`- ${this.getPortioning(ingredient.ingredientName, ingredient.portionSize)}`, 10, y);
          y += 10;
        })
      })
    })
    doc.save('diet-plan.pdf');
  }
}
