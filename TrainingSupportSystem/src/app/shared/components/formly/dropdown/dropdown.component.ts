import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends FieldType<FieldTypeConfig> {

  getOptions() {
    if (this.to.options instanceof Observable) {
      this.to.options.subscribe(res => {
        return res as any[]
      })
    }
    
    return this.to.options as any[];
  }

}
