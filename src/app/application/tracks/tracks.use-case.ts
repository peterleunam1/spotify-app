import { inject, Injectable } from '@angular/core';
import { TracksGateWay } from '../../domain/tracks/tracks.gateway';
import { TokenGateway } from '../../domain/token/token.gateway';

@Injectable({
  providedIn: 'root'
})
export class TracksUseCase {
  private tracksGateWay = inject(TracksGateWay);
  private tokenGateWay = inject(TokenGateway);

  getTracks(albumId: string) {
    const token = this.tokenGateWay.getToken();
    return this.tracksGateWay.getTracks(albumId, token);
  }
}
