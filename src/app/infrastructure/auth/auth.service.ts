import { Injectable } from '@angular/core';
import { AuthGateway } from '../../domain/auth/auth.gateway';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthGateway {
  private scopes = 'user-read-private user-read-email';
  private redirectUri = 'http://localhost:4200/callback';

  login(): void {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${
      environment.CLIENT_ID
    }&response_type=token&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}&scope=${encodeURIComponent(this.scopes)}`;
    window.location.href = authUrl;
  }

  logout(): void {
    throw new Error('Method not implemented.');
  }
}
