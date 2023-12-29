import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { muscleOptionsLegs, muscleOptionsUpper, strengthOptionsLegs, strengthOptionsUpper } from 'src/app/shared/dropdown-options/training-priority.options';
import { workoutAdvancmentOptions } from 'src/app/shared/dropdown-options/workout-advancment.options';
import { workoutFocusOptions } from 'src/app/shared/dropdown-options/workout-focus.options';
import { workoutGoalOptions } from 'src/app/shared/dropdown-options/workout-goal.options';
import { TrainingPriority } from 'src/app/shared/enums/training-priority.enum';
import { WorkoutFocus } from 'src/app/shared/enums/workout-focus.enum';
import { WorkoutMainGoal } from 'src/app/shared/enums/workout-goal.enum';
import { WorkoutPlanAdvancement } from 'src/app/shared/enums/workout-plan-advancement.enum';

@Component({
  selector: 'app-plan-saver-form',
  templateUrl: './plan-saver-form.component.html',
  styleUrls: ['./plan-saver-form.component.scss']
})
export class PlanSaverFormComponent implements OnInit {
  form = new FormGroup({});
  model: {
    planName?: string,
    advancement?: WorkoutPlanAdvancement,
    mainGoal?: WorkoutMainGoal,
    focus?: WorkoutFocus,
    priority?: TrainingPriority
  } = {};
  options: FormlyFormOptions = {};
  buttonDisabled = true;

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.canSubmit();
  }

  canSubmit() {
    this.form.valueChanges.subscribe(() => {
      this.buttonDisabled = !this.form.valid;
    }) 
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'planName',
      type: 'input',
      props: {
        label: 'Plan name',
        required: true,
      }
    },
    {
      key: 'advancement',
      type: 'radios',
      props: {
        label: 'Advancement',
        required: true,
        options: workoutAdvancmentOptions
      }
    },
    {
      key: 'mainGoal',
      type: 'radios',
      props: {
        label: 'Main training goal',
        required: true,
        options: workoutGoalOptions
      }
    },
    {
      key: 'focus',
      type: 'radios',
      props: {
        label: 'Main training goal',
        required: true,
        options: workoutFocusOptions
      }
    },
    {
      key: 'priority',
      type: 'radios',
      props: {
        label: 'Priority',
        required: true,
      },
      expressions: {
        'props.options': () => {


          const focus = this.model.focus;
          const goal = this.model.mainGoal;

          if (goal === 'muscle') {
            if (focus === 'upper') {
              return muscleOptionsUpper;
            } else {
              return muscleOptionsLegs;
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
      type: 'button',
      props: {
        label: 'Save',
        command: () => this.ref?.close(this.model),
      },
      expressions: {
        'props.disabled': () => this.buttonDisabled
      }
    }
  ]

}
