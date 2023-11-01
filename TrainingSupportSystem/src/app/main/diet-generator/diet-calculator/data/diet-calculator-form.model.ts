import { FormlyFieldConfig } from "@ngx-formly/core";
import { genderOptions } from "src/app/shared/dropdown-options/gender.options";
import { physicalActivityRate } from "./physical-activity.options";

export const dietCalculatorFormModel: FormlyFieldConfig[] = [
    {
        fieldGroup: [
            {
                key: 'gender',
                type: 'radios',
                props: {
                    label: 'Gender',
                    options: genderOptions,
                    required: true
                }
            },
            {
                key: 'age',
                type: 'input',
                props: {
                    label: 'Age',
                    type: 'number',
                    required: true
                }
            },
        ]
    },
    {
        fieldGroup: [
            {
                key: 'height',
                type: 'input',
                props: {
                    label: 'Height in cm',
                    type: 'number',
                    required: true
                }
            },
            {
                key: 'weight',
                type: 'input',
                props: {
                    label: 'Weight in kg',
                    type: 'number',
                    required: true
                }
            },
        ]
    },
    {
        fieldGroup: [
            {
                key: 'activity',
                type: 'dropdown',
                props: {
                    label: 'Activity rate',
                    options: physicalActivityRate,
                    required: true
                }
            },
            {
                key: 'goal',
                type: 'dropdown',
                props: {
                    label: 'Goal',
                    required: true,
                    options: [
                        { label: 'Lose body weight', value: 'lose' },
                        { label: 'Maintain body weight', value: 'maintain' },
                        { label: 'Increase body weight', value: 'gain' },
                    ]
                }
            }
        ]
    }
]