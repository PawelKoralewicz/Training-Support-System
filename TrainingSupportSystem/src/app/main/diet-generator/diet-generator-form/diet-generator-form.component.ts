import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DietGeneratorService } from '../diet-generator.service';
import { allergens } from '../data/allergens';
import { MealType } from '../data/meal-type.enum';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { concatMap, from, interval } from 'rxjs';

@Component({
  selector: 'app-diet-generator-form',
  templateUrl: './diet-generator-form.component.html',
  styleUrls: ['./diet-generator-form.component.scss']
})
export class DietGeneratorFormComponent implements OnInit {
  form = new FormGroup<any>({});
  options: FormlyFormOptions = {};
  model: any = {};
  savedCaloricDemand?: number;
  meals: any[] = [];

  constructor(
    private dietGeneratorService: DietGeneratorService,
    private router: Router,
    public dynamicDialogRef: DynamicDialogRef
    ) {
    this.getPersonalInfo();
  }

  ngOnInit(): void {
  }

  getPersonalInfo() {
    this.dietGeneratorService.getMyPersonalInfo().subscribe(res => this.savedCaloricDemand = res.personalInfo.totalCaloricDemand)
  }

  generateDietPlan() {
    const preferences = {};
    const caloriesDivision = this.caloriesDivision(this.model.mealsAmount);
    const mealTypesDivision = this.mealTypesDivision(this.model.mealsAmount);
    const preferencesArray: any[] = [];

    caloriesDivision.forEach((el, index) => caloriesDivision[index] = Math.ceil(el * this.model.calories));

    if(caloriesDivision && caloriesDivision.length) {
      if(this.model.allergens && this.model.allergens.length) {
        this.model.allergens.forEach((allergen: any, index: number) => {
          const allergensFilter = `filters[$or][${index}][allergens][$notContains]`;
          Object.assign(preferences, {[allergensFilter]: allergen});
        })
      }

      if(mealTypesDivision && mealTypesDivision.length) {
        mealTypesDivision.forEach(el => {
        })
      }
      
      caloriesDivision.forEach((el, index) => {
        const mealTypeFilter = `filters[mealType][$eq]`;
        const caloriesFilter = `filters[calories][$lte]`;
        Object.assign(preferences, {[caloriesFilter]: el });
        if(this.model.mealsAmount >= 3) {
          Object.assign(preferences, {[mealTypeFilter]: mealTypesDivision[index] });
        }
        preferencesArray.push({...preferences});
      });
      this.getMeals(preferencesArray)
    }
  }

  getMeals(preferencesArray: any[]) {
    from(preferencesArray).pipe(
      concatMap(el => this.dietGeneratorService.getMeals(el))
    ).subscribe({
      next: (res: any) => {
      if(res.data.length) {
        res.data.map((el: any) => this.meals.push(el.attributes));
      }
    },
    complete: () => this.navigateToGeneratedPlan()
  })
  }

  navigateToGeneratedPlan() {
    this.dynamicDialogRef.close();
    console.log(this.meals);
    this.router.navigateByUrl('dieting/diet-plan', { state: { meals: [...this.meals], userSelection: this.model } })
  }

  caloriesDivision(mealsAmount: number) {
    switch (mealsAmount) {
      case 1:
        return [1];
      case 2:
        return [0.5, 0.5];
      case 3:
        return [0.3, 0.4, 0.3];
      case 4:
        return [0.3, 0.15, 0.35, 0.2];
      case 5:
        return [0.2, 0.1, 0.3, 0.2, 0.2];
      case 6:
        return [0.2, 0.1, 0.3, 0.2, 0.1, 0.1];
      case 7:
        return [0.15, 0.15, 0.3, 0.15, 0.05, 0.05];
      default:
        return [];
    }
  }

  mealTypesDivision(mealsAmount: number) {
    switch(mealsAmount) {
      case 3:
        return [MealType.BREAKFAST, MealType.DINNER, MealType.SUPPER];
      case 4:
        return [MealType.BREAKFAST, MealType.BREAKFAST, MealType.DINNER, MealType.SUPPER];
      case 5:
        return [MealType.BREAKFAST, MealType.BREAKFAST, MealType.DINNER, MealType.SUPPER, MealType.SUPPER];
      case 6:
        return [MealType.BREAKFAST, MealType.BREAKFAST, MealType.DINNER, MealType.SUPPER, MealType.SUPPER, MealType.SUPPER];
      case 7:
        return [MealType.BREAKFAST, MealType.BREAKFAST, MealType.DINNER, MealType.SUPPER, MealType.SUPPER, MealType.SUPPER, MealType.SUPPER];
      default:
        return [];
    }
  }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'calories-group',
      fieldGroup: [
        {
          key: 'calories',
          type: 'number',
          props: {
            // suffix: ' kcal',
            label: 'Calories',
            required: true,
            min: 1200
          }
        },
        {
          key: 'useSavedData',
          type: 'checkbox',
          props: {
            label: 'Use last saved caloric demand',
            onChange: (event: any) => {
              if (this.savedCaloricDemand && event.checked) {
                this.form.get('calories')?.setValue(this.savedCaloricDemand);
              } else {
                this.form.get('calories')?.setValue(undefined);
              }
            }
          },
          expressions: {
            'props.disabled': () => !this.savedCaloricDemand
          }
        }
      ]
    },
    {
      key: 'allergens',
      type: 'multiselect',
      props: {
        options: allergens,
        label: 'Allergies'
      }
    },
    {
      key: 'preference',
      type: 'radios',
      props: {
        label: 'Preference',
        options: [
          { label: 'Low carbs', value: 'lowCarbs' },
          { label: 'Low fats', value: 'lowFat' },
          { label: 'High protein', value: 'highProtein' },
        ]
      }
    },
    {
      key: 'mealsAmount',
      type: 'number',
      defaultValue: 3,
      props: {
        label: 'Meals amount',
        min: 1,
        max: 7,
        showButtons: true,
      }
    },
    {
      type: 'button',
      props: {
        label: 'generate',
        command: () => this.generateDietPlan()
      },
      expressions: {
        'props.disabled': () => !this.form.valid
      }
    }
  ]
}
