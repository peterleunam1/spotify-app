import {
  HttpEventType,
  HttpInterceptorFn,
  HttpStatusCode
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenGateway } from '../../../domain/token/token.gateway';
import { Router } from '@angular/router';
import { PUBLIC_ROUTES } from '../../../presentation/constants/routes-storage.constant';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenGateway = inject(TokenGateway);
  const router = inject(Router);

  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        if (event.status === HttpStatusCode.Unauthorized) {
          tokenGateway.removeToken();
          router.navigate([PUBLIC_ROUTES.SIGN_IN]);
        }
      }
    })
  );
};
