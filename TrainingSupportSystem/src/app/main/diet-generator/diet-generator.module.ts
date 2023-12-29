import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietGeneratorRoutingModule } from './diet-generator-routing.module';
import { DietGeneratorComponent } from './diet-generator.component';
import { DietGeneratorsPanelsComponent } from './diet-generators-panels/diet-generators-panels.component';
import { DietCalculatorComponent } from './diet-calculator/diet-calculator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealCreatorComponent } from './meal-creator/meal-creator.component';
import { DietPlanCreatorComponent } from './diet-plan-creator/diet-plan-creator.component';
import { DietGeneratorFormComponent } from './diet-generator-form/diet-generator-form.component';
import { GeneratedDietComponent } from './generated-diet/generated-diet.component';


@NgModule({
  declarations: [
    DietGeneratorComponent,
    DietGeneratorsPanelsComponent,
    DietCalculatorComponent,
    MealCreatorComponent,
    DietPlanCreatorComponent,
    DietGeneratorFormComponent,
    GeneratedDietComponent
  ],
  imports: [
    CommonModule,
    DietGeneratorRoutingModule,
    SharedModule
  ]
})
export class DietGeneratorModule { }
