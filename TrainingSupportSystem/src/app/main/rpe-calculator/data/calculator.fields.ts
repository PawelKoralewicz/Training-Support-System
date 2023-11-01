import { FormlyFieldConfig } from "@ngx-formly/core";
import { rpeValues } from "./rpe-values";
import { liftsOptions } from "src/app/shared/dropdown-options/lifts.options";

export const calculatorFields: FormlyFieldConfig[] = [
    {
        fieldGroup: [
          {
            key: 'weight',
            type: 'input',
            props:{
              label: 'Weight',
              required: true,
            }
          },
          {
            key: 'reps',
            type: 'input',
            props: {
              type: 'number',
              label: 'Repetitions',
              required: true
            }
          },
          {
            key: 'rpe',
            type: 'dropdown',
            props: {
              label: 'RPE',
              required: true,
              placeholder: 'Select value',
              options: rpeValues
            }
          },
          {
            key: 'lift',
            type: 'dropdown',
            defaultValue: 'squat',
            props: {
              label: 'Lift',
              placeholder: 'Select lift',
              showClear: false,
              options: liftsOptions
            }
          },
        ]
      }
]