import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { dietCalculatorFormModel } from './data/diet-calculator-form.model';
import { IDietCalculator } from './data/diet-calculator.interface';
import { Chart } from 'chart.js';
import { dietCalculatorBreadcrumb } from './data/diet-calculator.breadcrumb';

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
  macros: number[] = [];
  chart: any;
  breadcrumbModel = dietCalculatorBreadcrumb;

  constructor() { }

  ngOnInit(): void {
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
      console.log(this.chartData.datasets);
      this.createChart();
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
    const text = `${Math.floor(this.totalCaloricDemand)} kcal`;
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
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
        ctx.font = '12px sans-serif';
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
      responsive: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context: any, ) {
              return context.formattedValue += ' g';
            }
          }
        },
        legend: {
          position: 'right',
        },
      }
        },
        plugins: [centerText]
      })
      this.chart.update();
    }
  }

  chartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: this.macros.map(mac => mac),
        backgroundColor: ['blue', 'green', 'red'],
      }
    ],
  }

  chartOptions = {
    cutout: '75%',
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any, ) {
            context.formattedValue += ' g';
          }
        }
      },
      legend: {
        position: 'right',
      }
    }
  }
}
