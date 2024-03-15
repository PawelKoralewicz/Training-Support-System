import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const jwt = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');

  if (jwt) {
    authService.getRole().subscribe((res) => authService.role = res.role.name);
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
