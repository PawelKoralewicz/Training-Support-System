import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietGeneratorComponent } from './diet-generator.component';
import { DietGeneratorsPanelsComponent } from './diet-generators-panels/diet-generators-panels.component';
import { DietCalculatorComponent } from './diet-calculator/diet-calculator.component';

const routes: Routes = [
  { path: '', component: DietGeneratorComponent, children: [
    { path: '', component: DietGeneratorsPanelsComponent },
    { path: 'calculator', component: DietCalculatorComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietGeneratorRoutingModule { }
