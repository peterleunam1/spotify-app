import { inject, Injectable } from '@angular/core';
import { PlaylistsGateWay } from '../../domain/playlists/playlists.gateway';
import { catchError } from 'rxjs';
import { PlaylistsError } from '../../domain/playlists/playlists.errors';
import { BaseUseCase } from '../base/base.use-case';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsUseCase extends BaseUseCase {
  private playlistsGateWay = inject(PlaylistsGateWay);

  getPlaylists() {
    return this.execute(this.playlistsGateWay.getPlaylists());
  }
  getOnePlaylist(playlistId: string) {
    return this.playlistsGateWay.getOnePlaylist(playlistId).pipe(
      catchError(error => {
        throw new PlaylistsError(
          'A technical error occurred, please try again later',
          error.status
        );
      })
    );
  }
}
