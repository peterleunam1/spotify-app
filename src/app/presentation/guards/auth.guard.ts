import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SPOTIFY_APP_TOKEN } from '../constants/cookies.storage';
import { TokenUseCase } from '../../application/token/token.use-case';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenUseCase = inject(TokenUseCase);
  const token = tokenUseCase.getToken();
  if (token) {
    return true;
  }
  return router.parseUrl('/sign-in');
};
