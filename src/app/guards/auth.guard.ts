import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('token-app') || '';
  const router = inject(Router);

  if (user) {
    return true;
  }
  return router.parseUrl('/sign-in');
};
