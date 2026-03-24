import { inject, Injectable } from '@angular/core';
import { PlayerGateway } from '../../domain/player/player.gateway';

@Injectable({
  providedIn: 'root'
})
export class PlayerUseCase {
  private playerGateway = inject(PlayerGateway);
  getRecentlyPlayed() {
    return this.playerGateway.getRecentlyPlayed();
  }
  getCurrentlyPlayingTrack() {
    return this.playerGateway.getCurrentlyPlayingTrack();
  }
}
