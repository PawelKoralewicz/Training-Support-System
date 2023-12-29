import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { imgPath } from 'src/app/shared/paths/images-path';
import { DietGeneratorFormComponent } from '../diet-generator-form/diet-generator-form.component';

@Component({
  selector: 'app-diet-generators-panels',
  templateUrl: './diet-generators-panels.component.html',
  styleUrls: ['./diet-generators-panels.component.scss'],
  providers: [DialogService]
})
export class DietGeneratorsPanelsComponent {

  ref?: DynamicDialogRef;
  panels = [
    {
      title: 'Dieting calculator',
      description: 'Calculate your caloric demand to lose, maintain or increase body weight.',
      imgsrc: imgPath + 'calorie-calculator.png',
      routerLink: 'calculator'
    },
    {
      title: 'Meal creator',
      description: 'Create meals simple way. Just check products and amount of them.',
      imgsrc: imgPath + 'cooker.svg',
      routerLink: 'meal-creator'
    },
    {
      title: 'Diet plan creator',
      description: 'Create diet plan on your own. Adjust meals amount and more.',
      imgsrc: imgPath + 'diet-plan-creator-icon.svg',
      routerLink: 'plan-creator'
    },
    {
      title: 'Diet plan generator',
      description: 'Fill a short form and get a meal plan for your needs.',
      imgsrc: imgPath + 'diet-generator-icon.svg',
      command: () => this.generatePlan()
      // routerLink: 'plan-creator'
    },
  ]

  constructor(private dialogService: DialogService) { }

  generatePlan() {
    this.dialogService.open(DietGeneratorFormComponent, {});
  }
}
