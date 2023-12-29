import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-line',
  templateUrl: './button-line.component.html',
  styleUrls: ['./button-line.component.scss']
})
export class ButtonLineComponent {
  
  @Input() label!: string;
  @Input() icon = '';
  @Input() severity = 'primary';
  @Input() disabled = false;

}
