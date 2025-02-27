import { inject, Injectable } from '@angular/core';
import { PlaylistsGateWay } from '../../domain/playlists/playlists.gateway';
import { TokenGateway } from '../../domain/token/token.gateway';
import { catchError } from 'rxjs';
import { PlaylistsError } from '../../domain/playlists/playlists.errors';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsUseCase {
  private playlistsGateWay = inject(PlaylistsGateWay);
  private tokenGateWay = inject(TokenGateway);

  getPlaylists() {
    const token = this.tokenGateWay.getToken();
    return this.playlistsGateWay.getPlaylists(token).pipe(
      catchError(error => {
        throw new PlaylistsError(
          'A technical error occurred, please try again later',
          error.status
        );
      })
    );
  }
}
