import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistsGateWay } from '../../domain/playlists/playlists.gateway';
import { PlaylistsModel } from '../../domain/playlists/playlists.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService implements PlaylistsGateWay {
  private httpClient = inject(HttpClient);

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getPlaylists(token: string): Observable<PlaylistsModel> {
    return this.httpClient.get<PlaylistsModel>(`${BASE_URL}/me/playlists`, {
      headers: this.getHeaders(token)
    });
  }
}
