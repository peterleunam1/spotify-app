import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileGateWay } from '../../domain/profile/profile.gateway';
import { GetTopItemsParams, ProfileModel, TopItemsModel } from '../../domain/profile/profile.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';
import { TopTracksModel } from '../../domain/tracks/tracks.entity';
import { TopArtistsModel } from '../../domain/artist/artist.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements ProfileGateWay {
  private httpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getProfile(): Observable<ProfileModel> {
    return this.httpClient.get<ProfileModel>(`${BASE_URL}/me`, {
      headers: this.getHeaders()
    });
  }

 getTopItems(
  props: GetTopItemsParams
): Observable<TopArtistsModel | TopTracksModel> {

  const { item, timeRange } = props;

  return this.httpClient.get<TopArtistsModel | TopTracksModel>(
    `${BASE_URL}/me/top/${item}?time_range=${timeRange}&limit=50`,
    {
      headers: this.getHeaders()
    }
  );
}
}
