import { inject, Injectable } from '@angular/core';
import { ArtistGateWay } from '../../domain/artist/artist.gateway';

@Injectable({
  providedIn: 'root'
})
export class ArtistUseCase {
  private artistGateway = inject(ArtistGateWay);
  getArtist (singerId: string) {
    return this.artistGateway.getArtist(singerId);
  }
}
