import { inject, Injectable } from '@angular/core';
import { TokenGateway } from '../../domain/token/token.gateway';
import { SPOTIFY_APP_TOKEN } from '../../presentation/constants/cookies-storage.constant';
import { Router } from '@angular/router';
import { PRIVATE_ROUTES } from '../../presentation/constants/routes-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenGateway {
  private accessToken: string | null = null;
  private router = inject(Router);

  getToken(): string {
    return localStorage.getItem(SPOTIFY_APP_TOKEN) || '';
  }

  saveToken(): void {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    this.accessToken = params.get('access_token');
    if (this.accessToken) {
      localStorage.setItem(SPOTIFY_APP_TOKEN, this.accessToken);
      this.router.navigate([PRIVATE_ROUTES.DASHBOARD]);
    }
  }

  removeToken(): void {
    localStorage.removeItem(SPOTIFY_APP_TOKEN);
  }

  updateToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
