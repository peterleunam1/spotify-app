import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumModel, AlbumsModel } from '../../domain/albums/albums.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private httpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAlbums(artistId: string): Observable<AlbumsModel> {
    return this.httpClient.get<AlbumsModel>(
      `${BASE_URL}/artists/${artistId}/albums`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getOneAlbum(albumId: string): Observable<AlbumModel> {
    return this.httpClient.get<AlbumModel>(
      `${BASE_URL}/albums/${albumId}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}
