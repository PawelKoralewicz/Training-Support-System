import { FormlyFieldConfig } from "@ngx-formly/core";

export const chartsCustomFields: FormlyFieldConfig[] = [
    {
        fieldGroup: [
            {
                template: '<div class="group-title">Squat</div>'
            },
            {
                key: 'squatFirst',
                type: 'input',
                props: {
                    type: 'number',
                    label: 'Reps at 85% of 1 rep max',
                }
            },
            {
                key: 'squatSecond',
                type: 'input',
                props: {
                    type: 'number',
                    label: 'Reps at 70% of 1 rep max',
                }
            },
        ],
    },
    {
        fieldGroup: [
            {
                template: '<div class="group-title">Bench press</div>'
            },
            {
                key: 'benchFirst',
                type: 'input',
                props: {
                    type: 'number',
                    label: 'Reps at 85% of 1 rep max',
                }
            },
            {
                key: 'benchSecond',
                type: 'input',
                props: {
                    type: 'number',
                    label: 'Reps at 70% of 1 rep max',
                }
            },
        ]
    },
    {
        fieldGroup: [
            {
                template: '<div class="group-title">Deadlift</div>'
            },
            {
                key: 'deadliftFirst',
                type: 'input',
                props: {
                    type: 'number',
                    label: 'Reps at 85% of 1 rep max',
                }
            },
            {
                key: 'deadliftSecond',
                type: 'input',
                props: {
                    type: 'number',
                    label: 'Reps at 70% of 1 rep max',
                }
            },
        ]
    }
]