import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-button',
  templateUrl: './formly-button.component.html',
  styleUrls: ['./formly-button.component.scss']
})
export class FormlyButtonComponent extends FieldType<FieldTypeConfig> {

}
