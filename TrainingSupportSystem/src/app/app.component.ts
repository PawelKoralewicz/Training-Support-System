import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TrainingSupportSystem';

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      props: {
        label: 'Radio',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'password',
      props: {
        label: 'Password',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        toggleMask: true,
      }
    },
    {
      key: 'jakisRadio',
      type: 'radios',
      props: {
        label: 'Password',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        toggleMask: true,
        options: [
          {value: 1, label: 'jakis label'}
        ]
      }
    },
    {
      key: 'checkboxes',
      type: 'checkboxes',
      props: {
        label: 'Password',
        placeholder: 'Placeholder',
        description: 'Description',
        required: false,
        toggleMask: true,
        options: [
          { value: 'tak', label: 'checkbox' }
        ]
      }
    },
  ];

  constructor(private primeConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }

  submitForm() {
    console.log(this.form.value);
  }
}
