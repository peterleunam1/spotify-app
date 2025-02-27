import { inject, Injectable } from '@angular/core';
import { TokenGateway } from '../../domain/token/token.gateway';

@Injectable({
  providedIn: 'root'
})
export class TokenUseCase {
  private tokenGateway = inject(TokenGateway);

  getToken(): string {
    return this.tokenGateway.getToken();
  }

  saveToken(): void {
    this.tokenGateway.saveToken();
  }

  removeToken(): void {
    this.tokenGateway.removeToken();
  }
}
