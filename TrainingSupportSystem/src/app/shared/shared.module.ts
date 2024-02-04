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
import { FormlyButtonComponent } from './components/formly/formly-button/formly-button.component';
import { InputNumberComponent } from './components/formly/input-number/input-number.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { ContextMenuModule } from 'primeng/contextmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { MultiselectComponent } from './components/formly/multiselect/multiselect.component';
import { TooltipModule } from 'primeng/tooltip';
import { PTableArrowDisableDirective } from './directives/ptable-arrow-disable.directive';

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
    NumberRoundingPipe,
    FormlyButtonComponent,
    InputNumberComponent,
    MultiselectComponent,
    PTableArrowDisableDirective
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
    ChartModule,
    InputNumberModule,
    KeyFilterModule,
    DynamicDialogModule,
    MultiSelectModule,
    FormlyModule,    
    AutoCompleteModule,
    TooltipModule
  ], 
  exports: [
    TooltipModule,
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    RadioButtonModule,
    InputTextModule,
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
    ChartModule,
    FormsModule,
    PaginatorModule,
    ContextMenuModule,
    KeyFilterModule,
    AutoCompleteModule,
    PTableArrowDisableDirective
  ]
})
export class SharedModule { }
