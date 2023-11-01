import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { breadcrumbItems } from './rpe-calculator-breadcrumb';
import { ChartsCustomizatorService } from './charts-customizator/charts-customizator.service';
import { ICalculator } from './data/calculator.model';
import { calculatorFields } from './data/calculator.fields';
import { Lifts } from 'src/app/shared/enums/lifts.enum';
import { rpeValues } from './data/rpe-values';

@Component({
  selector: 'app-rpe-calculator',
  templateUrl: './rpe-calculator.component.html',
  styleUrls: ['./rpe-calculator.component.scss']
})
export class RpeCalculatorComponent implements OnInit {
  form = new FormGroup({});
  model: ICalculator = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = calculatorFields;
  breadcrumbItems = breadcrumbItems;
  columns: number[] = [];
  rows: number[] = [];
  squatTable: number[][] = [];
  benchTable: number[][] = [];
  deadliftTable: number[][] = [];
  calculationResult: number[][] = [];


  constructor(
    private chartsCustomizatorService: ChartsCustomizatorService,
  ) { }

  ngOnInit(): void {
    this.getCharts();
    this.addArraysElements();
  }

  getCharts() {
    this.chartsCustomizatorService.getCharts().subscribe(res => {
      const charts = res.rpeCharts;

      charts.squatTable
        ? this.squatTable = charts.squatTable
        : this.chartsCustomizatorService.customize(this.squatTable, 4, 8);

      charts.benchTable
        ? this.benchTable = charts.benchTable
        : this.chartsCustomizatorService.customize(this.benchTable, 4, 8);

      charts.deadliftTable
        ? this.deadliftTable = charts.deadliftTable
        : this.chartsCustomizatorService.customize(this.deadliftTable, 4, 8);
    })
  }

  calculate() {
    const lift = this.model.lift;
    if (lift === Lifts.SQUAT) {
      this.calcuateWeights(this.squatTable);
    } else if (lift === Lifts.BENCH_PRESS) {
      this.calcuateWeights(this.benchTable);
    } else {
      this.calcuateWeights(this.deadliftTable);
    }
  }

  calcuateWeights(table: number[][]) {
    const weight = this.model.weight;
    const reps = this.model.reps;
    const rpe = this.model.rpe;
    if (weight && reps && rpe) {
      const percentage = table[rpe][reps - 1];
      const oneRm = weight / percentage;
      for (let i = 0; i <= 10; i++) {
        for (let j = 0; j < 15; j++) {
          this.calculationResult[i][j] = oneRm * table[i][j];
        }
      }
    }
  }

  addArraysElements() {
    for (let i = 1; i <= 15; i++) {
      this.columns.push(i);
    }

    for (let i = 0; i <= 10; i++) {
      this.calculationResult.push([]);
    }

    this.rows = rpeValues.map(val => val.label);
  }
}
