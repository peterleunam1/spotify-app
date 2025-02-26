import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileGateWay } from '../../domain/profile/profile.gateway';
import { ProfileModel } from '../../domain/profile/profile.entity';
import { PlaylistsGateWay } from '../../domain/playlists/playlists.gateway';
import { PlaylistsModel } from '../../domain/playlists/playlists.entity';

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
    return this.httpClient.get<PlaylistsModel>(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: this.getHeaders(token)
      }
    );
  }
}