import { inject, Injectable } from '@angular/core';
import { SingerGateway } from '../../domain/singers/singer.gateway';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SingerResponse } from '../../domain/singers/singer.entity';
import { Observable } from 'rxjs';
import { SPOTIFY_APP_TOKEN } from '../../presentation/constants/cookies.storage';

@Injectable({
  providedIn: 'root'
})
export class SingersService implements SingerGateway {
  private httpClient = inject(HttpClient);

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

   getAnArtist(name: string, token: string): Observable<SingerResponse> {
    const params = new HttpParams()
    .set('q', name)
    .set('type', 'artist')
    .set('limit', '10'); // Limitar resultados

    return this.httpClient.get<SingerResponse>('https://api.spotify.com/v1/search', { headers: this.getHeaders(token) , params });
  }
}
