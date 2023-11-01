import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Icon } from '../../enums/icons.enum';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() model: MenuItem[] | undefined = undefined;
  @Input() home: MenuItem = {
    icon: Icon.HOME,
    routerLink: '/'
  };

}
