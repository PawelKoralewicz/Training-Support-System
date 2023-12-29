import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBurger, faDumbbell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'src/app/shared/enums/icons.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  sidebarOpened = false;

  sidebarElements = [
    {
      icon: Icon.HOME,
      label: 'Home',
      routerLink: 'home',
    },
    {
      icon: Icon.CALCULATOR,
      label: 'RPE Calculator',
      routerLink: 'rpe-calculator',
    },
    {
      icon: Icon.CHART,
      label: 'My progress',
      routerLink: 'progress-tracker'
    },
    {
      faIcon: faDumbbell,
      label: 'My training',
      routerLink: 'training'
    },
    {
      faIcon: faBurger,
      label: 'My diet',
      routerLink: 'dieting'
    },
    {
      faIcon: faRightFromBracket,
      label: 'Sign out',
      command: () => {
        this.signOut();
      }
    }
  ];

  constructor(private router: Router) { }

  signOut() {
    localStorage.getItem('jwt') ? localStorage.removeItem('jwt') : sessionStorage.removeItem('jwt');
    localStorage.getItem('userId') ? localStorage.removeItem('userId') : sessionStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

}
