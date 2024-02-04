import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { dietCalculatorFormModel } from './data/diet-calculator-form.model';
import { IDietCalculator } from './data/diet-calculator.interface';
import { Chart } from 'chart.js';
import { dietCalculatorBreadcrumb, homeBreadcrumbDC } from './data/diet-calculator.breadcrumb';
import { DietGeneratorService } from '../diet-generator.service';

@Component({
  selector: 'app-diet-calculator',
  templateUrl: './diet-calculator.component.html',
  styleUrls: ['./diet-calculator.component.scss']
})
export class DietCalculatorComponent implements OnInit {
  @ViewChild('caloricChart', { static: true }) caloricChart!: ElementRef;

  form = new FormGroup({});
  model: IDietCalculator = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = dietCalculatorFormModel;
  basalMetabolism!: number;
  totalMetabolism!: number;
  totalCaloricDemand!: number;
  mode: "CREATE" | "EDIT" = "CREATE";
  macros: number[] = [];
  cards: {title: string, amount?: number, desc: string, unit: string}[] = [];
  chart: any;
  displayCards = false;
  breadcrumbModel = dietCalculatorBreadcrumb;
  breadcrumbHome = homeBreadcrumbDC;

  constructor(private dietGeneratorService: DietGeneratorService) { }

  ngOnInit(): void {
    this.dietGeneratorService.getMyPersonalInfo().subscribe({
      next: (res) => {
        if(res.personalInfo) {
          this.mode = "EDIT";
          const { gender, personalInfo, ...rest } = res;
          delete personalInfo.createdAt;
          delete personalInfo.updatedAt;
          delete personalInfo.publishedAt;
          delete personalInfo.totalCaloricDemand;
          this.model = { gender, ...personalInfo };
        }
      },
      complete: () => this.mode === "EDIT" ? this.calculate() : null
    })
    this.cards = [
      { 
        title: 'Basal Metabolism',
        unit: 'kcal',
        desc: 'You should NOT get below that value' 
      },
      {
        title: 'Total Metabolism',
        unit: 'kcal',
        desc: 'Amount of calories to maintain weight'
      },
      {
        title: 'Caloric Demand',
        unit: 'kcal',
        desc: 'Amount of calories you need to achieve your goal'
      },
      {
        title: 'Water',
        unit: 'L',
        desc: 'Minimum amount of water you should drink'
      }
    ]
  }

  saveData() {
    this.calculate();
    const totalCaloricDemand = Math.floor(this.totalCaloricDemand);
    const user = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const { gender, ...restData } = this.model;
    this.dietGeneratorService.savePersonalInfo({ ...restData, user, totalCaloricDemand }).subscribe();
  }

  updateData() {
    this.calculate();
    const totalCaloricDemand = Math.floor(this.totalCaloricDemand);
    const { gender, id, ...restData } = this.model;
    if(id) {
      this.dietGeneratorService.updatePersonalInfo(id, {...restData, totalCaloricDemand}).subscribe();
    }
  }

  assignCardsAmounts(weight: number) {
    this.cards[0].amount = Math.floor(this.basalMetabolism);
    this.cards[1].amount = Math.floor(this.totalMetabolism);
    this.cards[2].amount = Math.floor(this.totalCaloricDemand);
    this.cards[3].amount = weight * 0.02;
  }

  calculate() {
    const gender = this.model.gender;
    const age = this.model.age;
    const weight = this.model.weight;
    const height = this.model.height;
    const goal = this.model.goal;
    const activity = this.model.activity;
    if(gender && age && weight && height && goal && activity) {
      this.basalMetabolism = gender === 'male'
      ? this.maleHarrisBenedict(weight, height, age)
      : this.femaleHarrisBenedict(weight, height, age);

      this.totalMetabolism = this.basalMetabolism * activity;

      this.totalCaloricDemand = this.caloricDemand(goal, this.totalMetabolism);
      this.macrosGoal(weight, gender, goal);
      this.createChart();
      this.assignCardsAmounts(weight);
      this.displayCards = true;
    }
  }

  maleHarrisBenedict(weight: number, height: number, age: number): number {
    return 66.473 + (13.752 * weight) + (5.003 * height) - (6.775 * age);
  }

  femaleHarrisBenedict(weight: number, height: number, age: number): number {
    return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
  }

  caloricDemand(goal: string, totalMtb: number): number {
    if (goal === 'lose') {
      return totalMtb -= 0.15 * totalMtb;
    } else if (goal === 'maintain') {
      return totalMtb;
    } else {
      return totalMtb += 1.05 * totalMtb;
    }
  }

  macrosGoal(weight: number, gender: string, goal: string) {
    if(goal === 'lose') {
      const proteinDaily = Math.floor((gender === 'male' ? 2.5 : 2.2) * weight);
      const fatsDaily = Math.floor((0.2 * this.totalCaloricDemand) / 9);
      const carbsDaily = Math.floor((this.totalCaloricDemand - (proteinDaily * 4 + fatsDaily * 9)) / 4);
      this.macros = [proteinDaily, carbsDaily, fatsDaily];
    } else {
      const proteinDaily = Math.floor((gender === 'male' ? 2.2 : 1.9) * weight);
      const fatsDaily = Math.floor((0.3 * this.totalCaloricDemand) / 9);
      const carbsDaily = Math.floor((this.totalCaloricDemand - (proteinDaily * 4 + fatsDaily * 9)) / 4);
      this.macros = [proteinDaily, carbsDaily, fatsDaily];
    }
  }

  createChart() {
    const chartElement = this.caloricChart.nativeElement as HTMLCanvasElement;
    const ctx = chartElement.getContext('2d');
    const text = `${Math.floor(this.totalCaloricDemand)}`;
    const protText = `Protein: ${this.macros[0] * 4} kcal`;
    const carbsText = `Carbs: ${this.macros[1] * 4} kcal`;
    const fatsText = `Fats: ${this.macros[2] * 9} kcal`;
    if(this.chart) {
      this.chart.destroy();
    }

    const centerText = {
      id: 'center-text',
      afterDatasetsDraw(chart: Chart, args: any, pluginOptions: any) {
        const { ctx, data } = chart;
        ctx.save();
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'bold 36px orbitron';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f8f9fe'
        ctx.fillText(text, x, y - 25);
        ctx.font = '12px orbitron';
        ctx.fillText(protText, x, y + 20);
        ctx.fillText(carbsText, x, y + 35);
        ctx.fillText(fatsText, x, y + 50);
      }
    }
    if(ctx) {

      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [
            {
              data: this.macros,
              backgroundColor: ['blue', 'green', 'red'],
            }
          ]
        },
        options: {
          cutout: '75%',
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context: any, ) {
              return context.formattedValue += ' g';
            }
          }
        },
        legend: {
          position: 'bottom',
        },
      }
        },
        plugins: [centerText]
      })
      this.chart.update();
    }
  }
}
