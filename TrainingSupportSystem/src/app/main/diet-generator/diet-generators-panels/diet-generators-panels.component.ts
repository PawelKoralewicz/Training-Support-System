import { Component } from '@angular/core';

@Component({
  selector: 'app-diet-generators-panels',
  templateUrl: './diet-generators-panels.component.html',
  styleUrls: ['./diet-generators-panels.component.scss']
})
export class DietGeneratorsPanelsComponent {

  panels = [
    {
      title: 'Dieting calculator',
      description: 'Calculate your caloric demand to lose, maintain or increase body weight.',
      imgsrc: '/assets/images/calorie-calculator.png',
      routerLink: 'calculator'
    }
  ]
}
