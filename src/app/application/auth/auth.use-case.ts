import { inject, Injectable } from '@angular/core';
import { AuthGateway } from '../../domain/auth/auth.gateway';

@Injectable({
  providedIn: 'root'
})
export class AuthUseCase {
  private authGateway = inject(AuthGateway);
  login() {
    const response = this.authGateway.login();
    return response;
  }
}
