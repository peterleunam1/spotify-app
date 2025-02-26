import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumsModel } from '../../domain/albums/albums.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private httpClient = inject(HttpClient);
  
  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

    getAlbums(artistId: string, token: string): Observable<AlbumsModel> {
      return this.httpClient.get<AlbumsModel>(`${BASE_URL}/artists/${artistId}/albums`, {
        headers: this.getHeaders(token)
      });
    }

}
