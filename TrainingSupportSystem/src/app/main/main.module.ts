import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { RpeCalculatorComponent } from './rpe-calculator/rpe-calculator.component';
import { ChartsCustomizatorComponent } from './rpe-calculator/charts-customizator/charts-customizator.component';
import { AdministrationPanelComponent } from './administration-panel/administration-panel.component';


@NgModule({
  declarations: [
    MainComponent,
    RpeCalculatorComponent,
    ChartsCustomizatorComponent,
    AdministrationPanelComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
