import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const jwt = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');

  if (jwt) {
    authService.getPermissions().subscribe((res) => authService.permissions = res.permissions);
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
