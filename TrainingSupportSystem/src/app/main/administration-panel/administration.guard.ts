import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/shared/enums/permissions.enum';

export const administrationGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const role = authService.role;
  
  if(role === Role.ADMIN) {
    return true;
  }

  return false;
};
