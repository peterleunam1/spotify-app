import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, expand, map, Observable, reduce } from 'rxjs';
import { TracksGateWay } from '../../domain/tracks/tracks.gateway';
import {
  AudioFeaturesModel,
  MeTrarcksModel,
  SingleTrackModel,
  TracksModel
} from '../../domain/tracks/tracks.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class TracksService implements TracksGateWay {
  private httpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getTracks(albumId: string): Observable<TracksModel> {
    return this.httpClient.get<TracksModel>(
      `${BASE_URL}/albums/${albumId}/tracks`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getMyTracks(): Observable<MeTrarcksModel['items']> {
    const limit = 50;

    return this.httpClient
      .get<MeTrarcksModel>(`${BASE_URL}/me/tracks?limit=${limit}&offset=0`, {
        headers: this.getHeaders()
      })
      .pipe(
        expand(response => {
          const nextOffset = response.offset + limit;

          if (nextOffset >= response.total) {
            return EMPTY;
          }

          return this.httpClient.get<MeTrarcksModel>(
            `${BASE_URL}/me/tracks?limit=${limit}&offset=${nextOffset}`,
            { headers: this.getHeaders() }
          );
        }),
        map(response => response.items),
        reduce(
          (all, items) => [...all, ...items],
          [] as MeTrarcksModel['items']
        )
      );
  }

  singleTrack(trackId: string): Observable<SingleTrackModel> {
    return this.httpClient.get<SingleTrackModel>(
      `${BASE_URL}/tracks/${trackId}`,
      { headers: this.getHeaders() }
    );
  }

  getAudioFeatures(ids: string[]): Observable<AudioFeaturesModel> {
    const idsParam = ids.join(',');
    return this.httpClient.get<AudioFeaturesModel>(
      `${BASE_URL}/audio-features?ids=${idsParam}`,
      { headers: this.getHeaders() }
    );
  }
}
