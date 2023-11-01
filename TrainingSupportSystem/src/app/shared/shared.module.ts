import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ButtonModule } from 'primeng/button';
import { ButtonLineComponent } from './components/button-line/button-line.component';
import { InputtextComponent } from './components/formly/inputtext/inputtext.component';
import { PasswordComponent } from './components/formly/password/password.component';
import { CheckboxComponent } from './components/formly/checkbox/checkbox.component';
import { RadioComponent } from './components/formly/radio/radio.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../shell/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownComponent } from './components/formly/dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { NumberRoundingPipe } from './pipes/number-rounding.pipe';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonLineComponent,
    InputtextComponent,
    PasswordComponent,
    CheckboxComponent,
    RadioComponent,
    SidebarComponent,
    DropdownComponent,
    BreadcrumbComponent,
    NumberRoundingPipe
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    RadioButtonModule,
    FormlySelectModule,
    DropdownModule,
    RouterModule,
    ReactiveFormsModule,
    CheckboxModule,
    FontAwesomeModule,
    ToastModule,
    BreadcrumbModule,
    ChartModule
  ], 
  exports: [
    ReactiveFormsModule,
    ButtonComponent,
    ButtonLineComponent,
    RouterModule,
    FormlyModule,
    SidebarComponent,
    BreadcrumbComponent,
    TabViewModule,
    TableModule,
    NumberRoundingPipe,
    ChartModule
  ]
})
export class SharedModule { }
