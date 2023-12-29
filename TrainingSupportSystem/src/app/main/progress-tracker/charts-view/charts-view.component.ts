import { Component } from '@angular/core';
import { IChartsExercisesData } from '../data/charts-exercises-data.interface';
import { ChartsCustomizatorService } from '../../rpe-calculator/charts-customizator/charts-customizator.service';
import { rpeValues } from '../../rpe-calculator/data/rpe-values';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.scss']
})
export class ChartsViewComponent {
  exercises: IChartsExercisesData[] = [];
  defaultRpeChart: number[][] = [];
  rpeValues = rpeValues;
  xAxis: string[] = [];
  bodyWeights: { weekNumber: number, bodyWeight?: number }[] = [];
  data: any;
  volumeData: any;
  options: any;
  tabViewIndex = 0;

  rpeCharts =
    {
      "squat": {
        rpeChart: []
      },
      "bench": {
        rpeChart: []
      },
      "deadlift": {
        rpeChart: []
      }
    }

    chartsData: any[] = [];

  constructor(
    private chartsCustomizatorService: ChartsCustomizatorService,
    private filterService: FilterService
    ) {
    this.initialize();
  }

  initialize() {
    if (history.state.data) this.exercises = history.state.data;
    this.chartsCustomizatorService.customize(this.defaultRpeChart, 4, 7);
    this.chartsCustomizatorService.getCharts().subscribe({
      next: (res) => {
        if (res.rpeCharts) {
          this.rpeCharts['squat'].rpeChart = res.rpeCharts.squatTable ?? this.defaultRpeChart;
          this.rpeCharts['bench'].rpeChart = res.rpeCharts.benchTable ?? this.defaultRpeChart;
          this.rpeCharts['deadlift'].rpeChart = res.rpeCharts.deadliftTable ?? this.defaultRpeChart;
        }
      },
      complete: () => {
        this.getBodyWeights();
        this.setXAxis();
        this.exercises.forEach(ex => this.getEstimatedMaxes(ex));
        this.setChartData(this.tabViewIndex);
      }
    })
  }

  getBodyWeights() {
    this.exercises.forEach(exercise => {
      exercise.weeks.forEach((week, wi) => {
        if (!this.bodyWeights[wi]) {
          this.bodyWeights.push({ weekNumber: week.weekNumber, bodyWeight: week.bodyWeight });
        } else {
          if (!this.bodyWeights[wi].bodyWeight) this.bodyWeights[wi].bodyWeight = week.bodyWeight;
        }
      }
      )
    })
  }

  getEstimatedMaxes(exercise: IChartsExercisesData) {
    const estimatedMaxes: { weekNumber: number, esOneRm?: number }[] = [];
    const table = this.getWhichRpeTableToUse(exercise.exerciseName);

    exercise.weeks.forEach(week => {
      const weekEstimatedMaxes: number[] = [];
      week.days.forEach(day => {
        day.sets.forEach(set => {
          if(set.weight && set.reps && set.rpe) {
            const esm = this.calculateOneRepMax(table, set.weight, set.reps, set.rpe);
            weekEstimatedMaxes.push(esm);
          }
        })
      })
      const esOneRm = Math.max(...weekEstimatedMaxes);

      estimatedMaxes.push({weekNumber: week.weekNumber, esOneRm: esOneRm >= 0 ? esOneRm : undefined });
    });

    this.chartsData.push({
      exerciseName: exercise.exerciseName,
      estimatedMaxes
    });
  }

  getVolumeData(exercise: IChartsExercisesData) {
    const volumeData: number[] = [];
    exercise.weeks.forEach(week => {
      let volume = 0;
      week.days.forEach(day => {
        if(day.exerciseVolume) {
          volume += day.exerciseVolume;
        } else {
          volume += this.calculateVolume(day);
        }
      })
      volumeData.push(volume);
    })

    return volumeData;
  }

  calculateVolume(day: any) {
    let volume = 0;
    day.sets.forEach((set: any) => {
      if(set.weight && set.reps) volume += set.reps * set.weight;
    })

    return volume;
  }

  getWhichRpeTableToUse(exerciseName: string) {
    if(this.filterContains(exerciseName, "bench")) return this.rpeCharts['bench'].rpeChart;
    if(this.filterContains(exerciseName, "squat")) return this.rpeCharts['squat'].rpeChart
    if(this.filterContains(exerciseName, "deadlift")) return this.rpeCharts['deadlift'].rpeChart;
    return this.defaultRpeChart;
  }

  filterContains(first: string, second: string) {
    return this.filterService.filters['contains'](first, second);
  }

  calculateOneRepMax(table: number[][], weight: number, reps: number, rpe: number) {
    const rpeIndex = this.rpeValues.findIndex(el => el.label === rpe);
    const percentage = table[rpeIndex][reps - 1];
    const oneRm = weight / percentage;
    return oneRm;
  }

  setXAxis() {
    this.exercises[0].weeks.forEach(week => this.xAxis.push(`Week ${week.weekNumber}`))
  }
  
  setChartData(index: number) {
    const liftData: number[] = [];
    this.chartsData[index].estimatedMaxes.forEach((el: any) => liftData.push(el.esOneRm));
    const volumeData = this.getVolumeData(this.exercises[index]);

    this.data = {
      labels: this.xAxis,
      datasets: [
        {
          type: 'line',
          label: 'Estimated 1RM',
          borderColor: 'black',
          tension: 0.4,
          data: liftData
        },
        {
          type: 'bar',
          label: 'Body weight',
          backgroundColor: 'red',
          data: this.bodyWeights
        }
      ]
    }

    this.volumeData = {
      labels: this.xAxis,
      datasets: [
        {
          type: 'bar',
          label: 'Weekly volume',
          backgroundColor: 'green',
          data: volumeData
        }
      ]
    }

    this.options = {
      responsive: true,
    }
  }

}
