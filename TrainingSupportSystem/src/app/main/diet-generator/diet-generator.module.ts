import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietGeneratorRoutingModule } from './diet-generator-routing.module';
import { DietGeneratorComponent } from './diet-generator.component';
import { DietGeneratorsPanelsComponent } from './diet-generators-panels/diet-generators-panels.component';
import { DietCalculatorComponent } from './diet-calculator/diet-calculator.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DietGeneratorComponent,
    DietGeneratorsPanelsComponent,
    DietCalculatorComponent
  ],
  imports: [
    CommonModule,
    DietGeneratorRoutingModule,
    SharedModule
  ]
})
export class DietGeneratorModule { }
