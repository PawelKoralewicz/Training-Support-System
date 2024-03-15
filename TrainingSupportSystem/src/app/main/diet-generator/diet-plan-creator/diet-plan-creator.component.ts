import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { SelectItemGroup } from 'primeng/api';
import { IIngredients } from '../data/ingredients.interface';

@Component({
  selector: 'app-diet-plan-creator',
  templateUrl: './diet-plan-creator.component.html',
  styleUrls: ['./diet-plan-creator.component.scss']
})
export class DietPlanCreatorComponent {

  meal: any;
  meals: SelectItemGroup[] = [
    {
      label: 'Breakfasts',
      items: []
    },
    {
      label: 'Dinners',
      items: []
    },
    {
      label: 'Suppers',
      items: []
    },
  ]

  totalCalories = {
    calories: 0,
    carbs: 0,
    protein: 0,
    fats: 0
  };
  selectedMeals: any[] = [];
  groceries: { name: string, defaultPortioning: string }[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.meals[0].items = this.activatedRoute.snapshot.data['breakfasts'];
    this.meals[1].items = this.activatedRoute.snapshot.data['dinners'];
    this.meals[2].items = this.activatedRoute.snapshot.data['suppers'];
    this.groceries = this.activatedRoute.snapshot.data['groceries'];
    console.log(this.meals[0].items);
  }

  addMeal() {
    this.selectedMeals.push(this.meal);
    this.countTotalCalories();
  }

  deleteMeal(index: number) {
    this.selectedMeals.splice(index, 1);
    this.countTotalCalories();
  }

  getTooltip(i: number): string {
    
    const allergens = this.selectedMeals[i].allergens;
    const ingredientsList = [];

    if(allergens && allergens.length) {
      ingredientsList.push('<div>Allergens:</div><ul>');
      allergens.forEach((allergen: any) => ingredientsList.push(`<li>${allergen}</li>`))
      ingredientsList.push('</ul>');
    }
    
    const text = ingredientsList.join('');
    return text;
  }

  countTotalCalories() {
    Object.entries(this.totalCalories).forEach(([key, value]) => {
      Object.assign(this.totalCalories, {[key]: 0})
    })
    this.selectedMeals.forEach(meal => {
      this.totalCalories.calories += meal.calories;
      this.totalCalories.carbs += meal.carbs;
      this.totalCalories.protein += meal.protein;
      this.totalCalories.fats += meal.fats;
    })
  }

  getPortioning(name: string, portion: number) {
    const index = this.groceries.findIndex(el => el.name === name);
    return `${name}, ${portion} ${this.groceries[index].defaultPortioning}`;
  }

  exportToPDF() {
    const doc = new jsPDF();
    let y = 10;

    doc.text(`${this.totalCalories.calories} kcal, C: ${Math.floor(this.totalCalories.carbs)} g, P: ${Math.floor(this.totalCalories.protein)} g, F: ${Math.floor(this.totalCalories.fats)} g`, 10, y);
    y += 30;

    this.selectedMeals.forEach((meal, mi) => {
      if(y + 10 >= doc.internal.pageSize.height - 10 || y + meal.ingredients.length * 10 + 20 > doc.internal.pageSize.height) {
        doc.addPage();
        y = 10;
      }

      doc.text(`${mi + 1}. ${meal.mealName}`, 10, y);
      y += 10;

      doc.text(`${meal.calories} kcal, C: ${Math.round(meal.carbs / 10) * 10} g, P: ${Math.round(meal.protein / 10) * 10} g, F: ${Math.round(meal.fats / 10) * 10} g`, 10, y);
      y += 10;

      meal.ingredients.forEach((ingredient: IIngredients) => {
        doc.text(`- ${this.getPortioning(ingredient.ingredientName, ingredient.portionSize)}`, 10, y);
        y += 10;
      })
    })

    doc.save('diet-plan.pdf');
  }

}
