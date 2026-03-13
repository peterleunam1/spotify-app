import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OneArtistModel } from '../../domain/artist/artist.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
 private httpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getArtist(artistId: string): Observable<OneArtistModel> {
    return this.httpClient.get<OneArtistModel>(
      `${BASE_URL}/artists/${artistId}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}
