import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { muscleOptionsUpper, strengthOptionsUpper, strengthOptionsLegs } from 'src/app/shared/dropdown-options/training-priority.options';
import { WorkoutPlanAdvancement } from 'src/app/shared/enums/workout-plan-advancement.enum';
import { TrainingPlannerService } from '../training-planner.service';
import { IWorkoutPlanGlobal } from '../data/interfaces/workout-plans-server';
import { IPlanGeneratorForm } from './data/plan-genreator-form.interface';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-plan-genrator',
  templateUrl: './plan-genrator.component.html',
  styleUrls: ['./plan-genrator.component.scss']
})
export class PlanGenratorComponent {
  form = new FormGroup({});
  model: IPlanGeneratorForm = {};
  options: FormlyFormOptions = {};
  plans: IWorkoutPlanGlobal[] = [];
  didGenerateExact = true;
  activeStep: string = "FORM";

  constructor(private trainingPlannerService: TrainingPlannerService){ }

  getPreferences() {
    let preferences = {};
    Object.entries(this.model).forEach(([key, value]) => {
      const preference = `filters[${key}][$eq]`
      preferences = Object.assign(preferences, {[preference]: value});
    });
    return preferences;
  }

  getPlans() {
    this.didGenerateExact = true;
    let filters: any = this.getPreferences();
    const repeat = new Subject<void>();

    interval(100).pipe(
      takeUntil(repeat),
      switchMap(() => this.trainingPlannerService.generatePlans(filters))
    ).subscribe(
      {
        next: (res) => {
          if(res.data.length) {
            this.plans = res.data.map(plan => plan.attributes);
            repeat.next();
            repeat.complete();
          } else {
            this.didGenerateExact = false;
            const lastKey = Object.keys(filters).pop();
            if(lastKey) {
              delete filters[lastKey];
            }
          }
        },
        complete: () => {
          this.activeStep = "CHOOSER"
        }
      }
      )
  }

  nextStep() {
    this.getPlans();
  }

  prevStep() {
    this.activeStep = "FORM";
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'mainGoal',
      type: 'radios',
      props: {
        label: 'Main goal',
        required: true,
        options: [
          { label: 'Muscle build', value: 'muscle' },
          { label: 'Strength', value: 'strength' },
        ]
      }
    },
    {
      key: 'focus',
      type: 'radios',
      props: {
        label: 'I want to focus on:',
        options: [
          { label: 'Upper body', value: 'upper' },
          { label: 'Legs', value: 'legs' },
        ]
      },
      expressions: {
        hide: () => this.model.mainGoal ? false : true
      }
    },
    {
      key: 'priority',
      type: 'radios',
      props: {
        label: 'Priority'
      },
      expressions: {
        hide: () => {
          if(this.model.focus) {
            if(this.model.mainGoal !== 'muscle') {
              return false;
            } else {
              if(this.model.focus !== 'legs') {
                return false;
              } else {
                return true;
              }
            }
          } else {
            return true;
          }
        },
        'props.options': () => {
          const focus = this.model.focus;
          const goal = this.model.mainGoal;

          if (goal === 'muscle') {
            if (focus === 'upper') {
              return muscleOptionsUpper;
            } else {
              return null;
            }
          } else {
            if (focus === 'upper') {
              return strengthOptionsUpper;
            } else {
              return strengthOptionsLegs;
            }
          }
        }
      }
    },
    {
      key: 'advancement',
      type: 'radios',
      props: {
        label: 'Advancement',
        required: true,
        name: 'advancement',
        options: [
          { label: 'Beginner', value: WorkoutPlanAdvancement.BEGINNER },
          { label: 'Intermediate', value: WorkoutPlanAdvancement.INTERMEDIATE },
          { label: 'Advanced', value: WorkoutPlanAdvancement.ADVANCED },
        ]
      },
    },
  ];

}
