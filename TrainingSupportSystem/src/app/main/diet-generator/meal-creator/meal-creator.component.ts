import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MealType } from '../data/meal-type.enum';
import { DietGeneratorService } from '../diet-generator.service';
import { IGrocery } from '../data/groceries.interface';
import { Meal } from './data/meal';
import { allergens } from '../data/allergens';
import { mealCreatorBreadcrumb, mealCreatorBreadcrumbHome } from './data/meal-creator.breadcrumb';
import { AuthService } from 'src/app/auth/auth.service';
import { Permissions } from 'src/app/shared/enums/permissions.enum';

@Component({
  selector: 'app-meal-creator',
  templateUrl: './meal-creator.component.html',
  styleUrls: ['./meal-creator.component.scss']
})
export class MealCreatorComponent implements OnInit {
  breadcrumb = mealCreatorBreadcrumb;
  homeBcrumb = mealCreatorBreadcrumbHome;
  userPermissions = this.authService.permissions;
  permissionOpts = Permissions;
  canSave = false;

  form = new FormGroup({});
  model = new Meal();
  options: FormlyFormOptions = {};
  groceries: IGrocery[] = [];
  allergens = allergens;
  ingredients: { 
    name: string,
    portion: number, 
    portioning: string, 
    calories: number, 
    carbs: number, 
    protein: number, 
    fats: number 
  }[] = [];

  constructor(
    private dietGeneratorService: DietGeneratorService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getGroceries();
    this.checkCanSave();
  }

  ingredientAmountChange(i: number) {
      const {name, portion} = this.ingredients[i];
      const ingredient = this.countMacros(name, portion);
      this.ingredients[i] = ingredient;
      this.countMealMacros();
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i, 1);
    this.countMealMacros();
    if(this.form.valid && this.ingredients.length) {
      this.canSave = true;
    } else {
      this.canSave = false;
    }
  }

  getGroceries() {
    this.dietGeneratorService.getGroceries().subscribe(res => {
      res.data.forEach(element => {
        this.groceries.push(element.attributes);
      })
    });
  }

  addIngredient(ingredientName: string, portionSize: number) {
    if (this.model.ingredients.length) {
      const index = this.model.ingredients.findIndex(element => element.ingredientName === ingredientName);
      index >= 0
        ? this.model.ingredients[index].portionSize += portionSize
        : this.model.ingredients.push({
          ingredientName,
          portionSize
        });
    } else {
      this.model.ingredients.push({ ingredientName, portionSize })
    }
  }

  countMacros(ingredientName: string, portionSize: number) {
    const index = this.groceries.findIndex(element => element.name === ingredientName);
    const ingredient = this.groceries[index];
    const portioning = ingredient.defaultPortioning;
    const portionMacrosFactor = (portionSize * ingredient.singlePortionGrammature) / 100;
    const calories = Math.floor(ingredient.caloriesPerHundredGrams * portionMacrosFactor);
    const carbs = Number((ingredient.carbsPerHundredGrams * portionMacrosFactor).toFixed(1));
    const protein = Number((ingredient.proteinPerHundredGrams * portionMacrosFactor).toFixed(1));
    const fats = Number((ingredient.fatsPerHundredGrams * portionMacrosFactor).toFixed(1));

    return {
      name: ingredientName,
      portion: portionSize,
      portioning,
      calories,
      carbs,
      protein,
      fats
    }
  }

  checkCanSave() {
    this.form.valueChanges.subscribe(() => {
      if(this.ingredients.length) {
        if(this.form.valid) {
          this.canSave = true;
        } else  {
          this.canSave = false;
        }
      } else {
        this.canSave = false;
      }
    })
  }

  countMealMacros() {
    const meal = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };

    const { calories, protein, carbs, fats, ...rest } = this.model;
    this.ingredients.forEach(el => {
      meal.calories += el.calories;
      meal.protein += el.protein;
      meal.carbs += el.carbs;
      meal.fats += el.fats;
    })

    this.model = { ...meal, ...rest };
  }

  checkIfAllergen(ingredientName: string) {
    const index = this.groceries.findIndex(element => element.name === ingredientName);
    const ingredient = this.groceries[index];
    ingredient.foodFamily.some(item => this.allergens.includes(item)
      ? (this.model.allergens.includes(item)
        ? null
        : this.model.allergens.push(item))
      : null);
  }

  saveMealGlobal() {
    if(this.userPermissions === this.permissionOpts.ADMIN) {
      delete this.model.ingredientName;
      delete this.model.ingredientPortion;
  
      this.dietGeneratorService.saveMeal(this.model).subscribe();
  
      this.model = new Meal();
      this.ingredients = [];
    }
  }
  
  saveMealPrivate() {
    delete this.model.ingredientName;
    delete this.model.ingredientPortion;

    const user = Number(localStorage.getItem('userId') || sessionStorage.getItem('userId'));
    
    if(user > 0) {
      this.dietGeneratorService.savePrivateMeal(this.model, user).subscribe();
    
      this.model = new Meal();
      this.ingredients = [];
    }
  }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'mealName',
          type: 'input',
          props: {
            required: true,
            label: 'Meal name'
          },
        },
        {
          key: 'mealType',
          type: 'radios',
          props: {
            required: true,
            label: 'Meal type',
            options: [
              { label: 'Breakfast', value: MealType.BREAKFAST },
              { label: 'Dinner', value: MealType.DINNER },
              { label: 'Supper', value: MealType.SUPPER },
            ]
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'ingredients-section',
      fieldGroup: [
        {
          key: 'ingredientName',
          type: 'dropdown',
          props: {
            label: 'Ingredient',
            options: this.groceries,
            filter: true,
            filterBy: 'name',
            optionLabel: 'name',
            optionValue: 'name',
          }
        },
        {
          key: 'ingredientPortion',
          type: 'number',
          defaultValue: this.model.ingredientName ? 1 : null,
          props: {
            label: "Portion size",
            mode: 'decimal'
          },
          expressions: {
            'props.suffix': (field) => {
              if (this.model.ingredientName && field.props) {
                const index = this.groceries.findIndex(element => element.name === this.model.ingredientName);
                return ' ' + this.groceries[index].defaultPortioning;
              }
              return '';
            }
          }
        },
        {
          type: 'button',
          props: {
            label: 'Add ingredient',
            command: () => {
              if (this.model.ingredientName && this.model.ingredientPortion) {
                const ingredientName = this.model.ingredientName;
                const portionSize = this.model.ingredientPortion;
                
                this.addIngredient(ingredientName, portionSize);
                this.ingredients.push(this.countMacros(ingredientName, portionSize));
                this.checkIfAllergen(ingredientName);
                this.countMealMacros();
                if(this.form.valid) {
                  this.canSave = true;
                }
              }
            },
          },
          expressions: {
            'props.disabled': () => {
              return this.model.ingredientName && this.model.ingredientPortion ? false : true;
            }
          }
        },
      ]
    }
  ];
}
