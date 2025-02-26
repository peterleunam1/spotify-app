import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TracksGateWay } from '../../domain/tracks/tracks.gateway';
import { TracksModel } from '../../domain/tracks/tracks.entity';

@Injectable({
  providedIn: 'root'
})
export class TracksService implements TracksGateWay {
  private httpClient = inject(HttpClient);

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getTracks(albumId: string, token: string): Observable<TracksModel> {
    return this.httpClient.get<TracksModel>(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: this.getHeaders(token)
      }
    );
  }
}
