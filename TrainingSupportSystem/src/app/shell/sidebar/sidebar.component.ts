import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBurger, faDumbbell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Icon } from 'src/app/shared/enums/icons.enum';
import { Role } from 'src/app/shared/enums/permissions.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  sidebarElements = [
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

  constructor(private router: Router, private authService: AuthService) {
    this.checkRole();
  }

  signOut() {
    localStorage.getItem('jwt') ? localStorage.removeItem('jwt') : sessionStorage.removeItem('jwt');
    localStorage.getItem('userId') ? localStorage.removeItem('userId') : sessionStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }

  checkRole() {
    if(this.authService.role === Role.ADMIN) {
      const signOut = this.sidebarElements.pop();
      if(signOut) {
        this.sidebarElements.push(
          {
            icon: Icon.USERS,
            label: 'Administration',
            routerLink: 'administration-panel',
          },
          signOut
        )
      }
    }
  }
}
