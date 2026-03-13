import { inject, Injectable } from '@angular/core';
import { TokenGateway } from '../../domain/token/token.gateway';
import { SPOTIFY_APP_TOKEN } from '../../presentation/constants/cookies-storage.constant';
import { Router } from '@angular/router';
import { PRIVATE_ROUTES } from '../../presentation/constants/routes-storage.constant';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface SpotifyTokenModel {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface StoredToken {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenGateway {
  private router = inject(Router);
  private httpClient = inject(HttpClient);

  private redirectUri = environment.REDIRECT_URI;

  async getToken(): Promise<string> {
    const stored = localStorage.getItem(SPOTIFY_APP_TOKEN);

    if (!stored) return '';

    const token: StoredToken = JSON.parse(stored);

    const now = Date.now();
    const buffer = 60000;

    if (now < token.expires_at - buffer) {
      return token.access_token;
    } else {
      const refreshed = await this.refreshToken(token);
      return refreshed.access_token;
    }
  }

  saveToken(): void {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return;

    const body = new URLSearchParams({
      client_id: environment.CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectUri,
      client_secret: environment.CLIENT_SECRET
    });

    this.httpClient
      .post<SpotifyTokenModel>(
        'https://accounts.spotify.com/api/token',
        body.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .subscribe(response => {
        const storedToken: StoredToken = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_at: Date.now() + response.expires_in * 1000
        };

        localStorage.setItem(SPOTIFY_APP_TOKEN, JSON.stringify(storedToken));

        this.router.navigate([PRIVATE_ROUTES.DASHBOARD]);
      });
  }

  async refreshToken(token: StoredToken): Promise<StoredToken> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
      client_id: environment.CLIENT_ID,
      client_secret: environment.CLIENT_SECRET
    });

    const response = await firstValueFrom(
      this.httpClient.post<SpotifyTokenModel>(
        'https://accounts.spotify.com/api/token',
        body.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
    );

    const newToken: StoredToken = {
      access_token: response.access_token,
      refresh_token: response.refresh_token ?? token.refresh_token,
      expires_at: Date.now() + response.expires_in * 1000
    };

    localStorage.setItem(SPOTIFY_APP_TOKEN, JSON.stringify(newToken));

    return newToken;
  }
  removeToken(): void {
    localStorage.removeItem(SPOTIFY_APP_TOKEN);
  }

  updateToken(token: string): void {
    localStorage.setItem(SPOTIFY_APP_TOKEN, token);
  }
}
