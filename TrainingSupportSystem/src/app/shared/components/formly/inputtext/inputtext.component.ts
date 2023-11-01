import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss']
})
export class InputtextComponent extends FieldType<FieldTypeConfig> {

  showPassword: boolean = false;

  clearInput() {
    this.formControl.setValue(null);
  }

  passwordVisibilityToggle() {
    this.showPassword = !this.showPassword;
    this.to.type = this.showPassword ? 'text' : 'password';
  }
}