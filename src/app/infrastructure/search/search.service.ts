import { inject, Injectable } from '@angular/core';
import { SearchGateway } from '../../domain/search/search.gateway';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SingerResponse } from '../../domain/search/search.entity';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements SearchGateway {
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
      .set('limit', '10');

    return this.httpClient.get<SingerResponse>(`${BASE_URL}/search`, {
      headers: this.getHeaders(),
      params
    });
  }
}
