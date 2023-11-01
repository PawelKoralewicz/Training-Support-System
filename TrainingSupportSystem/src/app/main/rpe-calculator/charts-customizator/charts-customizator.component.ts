import { Component, OnInit } from '@angular/core';
import { breadcrumbItems } from './charts-customizator-breadcrumb';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { chartsCustomFields } from './charts-customizator.fields';
import { ToastService } from 'src/app/shared/services/toast.service';
import { rpeValues } from '../data/rpe-values';
import { ChartsCustomizatorService } from './charts-customizator.service';
import { ICharts } from './data/charts.interface';

@Component({
  selector: 'app-charts-customizator',
  templateUrl: './charts-customizator.component.html',
  styleUrls: ['./charts-customizator.component.scss']
})
export class ChartsCustomizatorComponent implements OnInit {
  breadcrumbItems = breadcrumbItems;
  squatTable: number[][] = [];
  benchTable: number[][] = [];
  deadliftTable: number[][] = [];
  displayedTable: number[][] = [];
  columns: number[] = [];
  rows: number[] = rpeValues.map(val => val.label);
  tabViewActiveIndex: number = 0;
  form = new FormGroup({});
  model: Partial<ICharts> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = chartsCustomFields;
  tabViewPanels = [
    {
      header: 'Squat',
      tableData: this.squatTable,
    },
    {
      header: 'Bench press',
      tableData: this.benchTable,
    },
    {
      header: 'Deadlift',
      tableData: this.deadliftTable,
    }
  ]

  constructor(
    private toastService: ToastService,
    private chartsCustomizatorService: ChartsCustomizatorService,
    ) { }
    
    ngOnInit(): void {
      this.addColumnsHeaders();
      this.getCharts();
  }

  getCharts() {
    this.chartsCustomizatorService.getCharts().subscribe(res => {
      const charts = res.rpeCharts;
      this.model = {
        id: charts.id, 
        benchFirst: charts.benchFirst, 
        benchSecond: charts.benchSecond,
        squatFirst: charts.squatFirst,
        squatSecond: charts.squatSecond,
        deadliftFirst: charts.deadliftFirst,
        deadliftSecond: charts.deadliftSecond
      };
      
      charts.squatTable 
      ? this.squatTable = charts.squatTable 
      : this.chartsCustomizatorService.customize(this.squatTable, 4, 8);

      charts.benchTable 
      ? this.benchTable = charts.benchTable 
      : this.chartsCustomizatorService.customize(this.benchTable, 4, 8);

      charts.deadliftTable 
      ? this.deadliftTable = charts.deadliftTable 
      : this.chartsCustomizatorService.customize(this.deadliftTable, 4, 8);
    });
  }

  getDataToDisplay() {
    if(this.tabViewActiveIndex === 0) {
      this.displayedTable = this.squatTable;
    } else if(this.tabViewActiveIndex === 1) {
      this.displayedTable = this.benchTable;
    } else {
      this.displayedTable = this.deadliftTable;
    }
  }

  addColumnsHeaders() {
    for (let i = 1; i <= 15; i++) {
      this.columns.push(i);
    }
  }

  customizeErrorMessage(lift: string) {
    return `You have to fill both fields of "${lift}" section to customize its chart.'`;
  }

  customizeSuccessMessage(lift: string) {
    return `Successfully customized ${lift}'s RPE chart.`;
  }

  saveCharts() {
    const chartId = this.model.id;
    const model = { 
      ...this.model, 
      squatTable: this.squatTable, 
      benchTable: this.benchTable, 
      deadliftTable: this.deadliftTable, 
      user: localStorage.getItem('userId') 
    };

    chartId 
    ? this.chartsCustomizatorService.editCharts(chartId, model).subscribe()
    : this.chartsCustomizatorService.postCharts(model).subscribe();
  }

  calculate() {
    const sqFirst = this.model.squatFirst;
    const sqSecond = this.model.squatSecond;
    const bpFirst = this.model.benchFirst;
    const bpSecond = this.model.benchSecond;
    const dlFirst = this.model.deadliftFirst;
    const dlSecond = this.model.deadliftSecond;
    
    if(Object.keys(this.model).length) {

      if(sqFirst && sqSecond) {
        this.chartsCustomizatorService.customize(this.squatTable, sqFirst, sqSecond);
        this.toastService.toastSuccess(this.customizeSuccessMessage('squat'));
      } else if (sqFirst && !sqSecond || !sqFirst && sqSecond) {
        this.toastService.toastError(this.customizeErrorMessage('Squat'));
      }
  
      if(bpFirst && bpSecond) {
        this.chartsCustomizatorService.customize(this.benchTable, bpFirst, bpSecond);
        this.toastService.toastSuccess(this.customizeSuccessMessage('bench press'));
      } else if (bpFirst && !bpSecond || !bpFirst && bpSecond) {
        this.toastService.toastError(this.customizeErrorMessage('Bench press'));
      }
  
      if(dlFirst && dlSecond) {
        this.chartsCustomizatorService.customize(this.deadliftTable, dlFirst, dlSecond);
        this.toastService.toastSuccess(this.customizeSuccessMessage('deadlift'));
      } else if (dlFirst && !dlSecond || !dlFirst && dlSecond) {
        this.toastService.toastError(this.customizeErrorMessage('Deadlift'));
      }
    } else {
      this.toastService.toastError('You have to fill any section to customize the chart.')
    }
  }
}
