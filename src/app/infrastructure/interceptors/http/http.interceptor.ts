import {
  HttpInterceptorFn,
  HttpStatusCode,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenGateway } from '../../../domain/token/token.gateway';
import { Router } from '@angular/router';
import { PUBLIC_ROUTES } from '../../../presentation/constants/routes-storage.constant';
import { from, switchMap, catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenGateway = inject(TokenGateway);
  const router = inject(Router);

 if (req.url.startsWith('https://accounts.spotify.com')) {
  return next(req);
}

  return from(tokenGateway.getToken()).pipe(
    switchMap(token => {
      let clonedRequest = req;

      if (token) {
        clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next(clonedRequest);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        tokenGateway.removeToken();
        router.navigate([PUBLIC_ROUTES.SIGN_IN]);
      }

      return throwError(() => error);
    })
  );
};