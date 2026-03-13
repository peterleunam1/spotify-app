import { inject, Injectable } from '@angular/core';
import { SingerGateway } from '../../domain/singers/singer.gateway';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SingerResponse } from '../../domain/singers/singer.entity';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class SingersService implements SingerGateway {
  private httpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAnArtist(name: string): Observable<SingerResponse> {
    const params = new HttpParams()
      .set('q', name)
      .set('type', 'artist,album,audiobook,track')
      .set('limit', '10'); // Limitar resultados

    return this.httpClient.get<SingerResponse>(`${BASE_URL}/search`, {
      headers: this.getHeaders(),
      params
    });
  }
}
