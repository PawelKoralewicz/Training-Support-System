import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from '../auth.service';
import { genderOptions } from 'src/app/shared/dropdown-options/gender.options';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};

  canSubmit = false;

  constructor(private authService: AuthService) {}


  ngOnInit(): void {
      this.validation();
  }

  submit() {
    this.authService.register(this.model).subscribe();
  }

  validation() {
    this.form.valueChanges.subscribe(() => {
      this.canSubmit = this.form.valid ? true : false;
    })
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First name',
        required: true
      }
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last name',
        required: true
      }
    },
    {
      key: 'gender',
      type: 'radios',
      props: {
        label: 'Gender',
        required: true,
        options: genderOptions
      }
    },
    {
      key: 'username',
      type: 'input',
      props: {
        label: 'Username',
        required: true
      }
    },
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'E-mail Address',
        type: 'email',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Password',
        type: 'password',
        password: true,
        required: true
      }
    },
  ];
}

