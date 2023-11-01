import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const mainGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const jwt = sessionStorage.getItem('jwt') || localStorage.getItem('jwt');

  if (jwt) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
