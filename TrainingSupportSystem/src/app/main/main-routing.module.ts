import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { RpeCalculatorComponent } from './rpe-calculator/rpe-calculator.component';
import { ChartsCustomizatorComponent } from './rpe-calculator/charts-customizator/charts-customizator.component';
import { DietGeneratorModule } from './diet-generator/diet-generator.module';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: 'rpe-calculator', component: RpeCalculatorComponent },
    { path: 'rpe-calculator/customize', component: ChartsCustomizatorComponent },
    { path: 'dieting', loadChildren: () => import('./diet-generator/diet-generator.module').then(() => DietGeneratorModule)}
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
