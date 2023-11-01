import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({});
  model = {rememberMe: undefined};
  options: FormlyFormOptions = {};
  remember: boolean | undefined = false;
  canSubmit = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}


  ngOnInit(): void {
      this.validation();
  }

  submit() {
    this.remember = this.model.rememberMe;
    delete this.model.rememberMe;

    this.authService.login(this.model).subscribe((res: any) => {
      
      if(this.remember) {
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('userId', res.user.id);
      } else {
        sessionStorage.setItem('jwt', res.jwt);
        sessionStorage.setItem('userId', res.user.id);
      }

      this.router.navigate(['']);
    });
  }

  validation() {
    this.form.valueChanges.subscribe(() => {
      this.canSubmit = this.form.valid ? true : false;
    })
  }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'identifier',
          type: 'input',
          props:{
            label: 'Username or email',
            required: true,
          }
        },
        {
          key: 'password',
          type: 'input',
          props: {
            type: 'password',
            label: 'password',
            password: true,
            required: true
          }
        },
        {
          key: 'rememberMe',
          type: 'checkbox',
          props: {
            label: 'Stay logged'
          }
        }
      ]
    }
  ]
}

