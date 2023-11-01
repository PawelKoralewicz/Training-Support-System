import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const jwt = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');

  if (jwt) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
