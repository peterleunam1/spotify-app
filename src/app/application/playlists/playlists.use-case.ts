import { inject, Injectable } from '@angular/core';
import { PlaylistsGateWay } from '../../domain/playlists/playlists.gateway';
import { catchError } from 'rxjs';
import { PlaylistsError } from '../../domain/playlists/playlists.errors';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsUseCase {
  private playlistsGateWay = inject(PlaylistsGateWay);

  getPlaylists() {
    return this.playlistsGateWay.getPlaylists().pipe(
      catchError(error => {
        throw new PlaylistsError(
          'A technical error occurred, please try again later',
          error.status
        );
      })
    );
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
