import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IChartsDaysData, IChartsExercisesData } from '../data/charts-exercises-data.interface';
import { ISet } from 'src/app/shared/interfaces/workout-plan.interface';
import { rpeValues } from '../../rpe-calculator/data/rpe-values';

@Component({
  selector: 'app-exercise-data-update',
  templateUrl: './exercise-data-update.component.html',
  styleUrls: ['./exercise-data-update.component.scss']
})
export class ExerciseDataUpdateComponent {
  exerciseData?: IChartsExercisesData;
  displayedWeek = 0;
  columns = [ 
    { header: 'Day', field: 'dayNumber' },
    { header: 'Sets', field: 'setNumber' },
    { header: 'Weight', field: 'weight' },
    { header: 'Reps', field: 'reps' },
    { header: 'RPE', field: 'rpe' },
    { header: 'Volume', field: 'volume' }
  ];
  rpeValues = rpeValues;

  constructor(
    public dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef
    ) { 
    this.exerciseData = dialogConfig.data
  }

  getExerciseVolume(day: IChartsDaysData) {
    let volume = 0;

    day.sets.forEach((set) => {
      volume += (set.weight ? set.weight : 0) * (set.reps ? set.reps : 0);
    })

    day.exerciseVolume = volume;
    return volume;
  }

  onPageChange(event: any) {
    this.displayedWeek = event.page;
  }

  saveData() {
    this.ref.close(this.exerciseData);
  }

}
