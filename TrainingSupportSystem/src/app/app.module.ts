import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputtextComponent } from './shared/components/formly/inputtext/inputtext.component';
import { PasswordComponent } from './shared/components/formly/password/password.component';
import { RadioComponent } from './shared/components/formly/radio/radio.component';
import { CheckboxComponent } from './shared/components/formly/checkbox/checkbox.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownComponent } from './shared/components/formly/dropdown/dropdown.component';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './shared/services/toast.service';
import { FormlyButtonComponent } from './shared/components/formly/formly-button/formly-button.component';
import { InputNumberComponent } from './shared/components/formly/input-number/input-number.component';
import { MultiselectComponent } from './shared/components/formly/multiselect/multiselect.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ButtonModule,
        SpeedDialModule,
        HttpClientModule,
        ToastModule,
        ReactiveFormsModule,
        FormlyPrimeNGModule,
        FormlyModule.forRoot({
            types: [
                { name: 'input', component: InputtextComponent },
                { name: 'password', component: PasswordComponent },
                { name: 'radios', component: RadioComponent },
                { name: 'checkbox', component: CheckboxComponent },
                { name: 'dropdown', component: DropdownComponent },
                { name: 'button', component: FormlyButtonComponent },
                { name: 'number', component: InputNumberComponent },
                { name: 'multiselect', component: MultiselectComponent },
            ]
        }),
    ],
    providers: [
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true,
            deps: [MessageService, AuthService, Router, ToastService]
        }
    ]
})
export class AppModule { }
