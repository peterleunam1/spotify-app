import { inject, Injectable } from '@angular/core';
import { PlayerGateway } from '../../domain/player/player.gateway';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecentlyPlayed } from '../../domain/player/player.entity';
import { BASE_URL } from '../../presentation/constants/base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements PlayerGateway {
  private httpClient = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getRecentlyPlayed(): Observable<RecentlyPlayed> {
    return this.httpClient.get<RecentlyPlayed>(
      `${BASE_URL}/me/player/recently-played?limit=6`,
      {
        headers: this.getHeaders()
      }
    );
  }
}
