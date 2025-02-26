import { inject, Injectable } from '@angular/core';
import { PlaylistsGateWay } from '../../domain/playlists/playlists.gateway';
import { TokenGateway } from '../../domain/token/token.gateway';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsUseCase {
  private playlistsGateWay = inject(PlaylistsGateWay);
  private tokenGateWay = inject(TokenGateway);

  getPlaylists() {
    const token = this.tokenGateWay.getToken();
    return this.playlistsGateWay.getPlaylists(token);
  }
}
