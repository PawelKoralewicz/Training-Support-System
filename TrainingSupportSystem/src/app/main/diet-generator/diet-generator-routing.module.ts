import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { DietGeneratorComponent } from './diet-generator.component';
import { DietGeneratorsPanelsComponent } from './diet-generators-panels/diet-generators-panels.component';
import { DietCalculatorComponent } from './diet-calculator/diet-calculator.component';
import { MealCreatorComponent } from './meal-creator/meal-creator.component';
import { DietPlanCreatorComponent } from './diet-plan-creator/diet-plan-creator.component';
import { DietGeneratorService } from './diet-generator.service';
import { map } from 'rxjs';
import { GeneratedDietComponent } from './generated-diet/generated-diet.component';

export const breakfastResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(DietGeneratorService).getMeals({ "filters[mealType][$eq]": "breakfast" }).pipe(map((data: any) =>
    data.data.map((br: any) => {
      delete br.attributes.createdAt;
      delete br.attributes.publishedAt;
      delete br.attributes.updatedAt;
      return br.attributes
    })
  ));
}
export const dinnerResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(DietGeneratorService).getMeals({ "filters[mealType][$eq]": "dinner" }).pipe(map((data: any) => data.data.map((br: any) => {
    delete br.attributes.createdAt;
    delete br.attributes.publishedAt;
    delete br.attributes.updatedAt;
    return br.attributes
  })
  ));
}
export const supperResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(DietGeneratorService).getMeals({ "filters[mealType][$eq]": "supper" }).pipe(map((data: any) => data.data.map((br: any) => {
    delete br.attributes.createdAt;
    delete br.attributes.publishedAt;
    delete br.attributes.updatedAt;
    return br.attributes
  })));
}

export const groceriesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(DietGeneratorService).getGroceries().pipe(map(data => data.data.map(br => {
    return {
      name: br.attributes.name,
      defaultPortioning: br.attributes.defaultPortioning
    }
  })))
}

const routes: Routes = [
  {
    path: '', component: DietGeneratorComponent, children: [
      { path: '', component: DietGeneratorsPanelsComponent },
      { path: 'calculator', component: DietCalculatorComponent },
      { path: 'meal-creator', component: MealCreatorComponent },
      {
        path: 'plan-creator', component: DietPlanCreatorComponent, resolve: {
          breakfasts: breakfastResolver,
          dinners: dinnerResolver,
          suppers: supperResolver,
          groceries: groceriesResolver
        }
      },
      { path: 'diet-plan', component: GeneratedDietComponent, resolve: {
          groceries: groceriesResolver
        } 
      },
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietGeneratorRoutingModule { }
