import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileGateWay } from '../../domain/profile/profile.gateway';
import { ProfileModel } from '../../domain/profile/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements ProfileGateWay {
  private httpClient = inject(HttpClient);

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getProfile(token: string): Observable<ProfileModel> {
    return this.httpClient.get<ProfileModel>(
      `https://api.spotify.com/v1/me`,
      {
        headers: this.getHeaders(token)
      }
    );
  }
}
