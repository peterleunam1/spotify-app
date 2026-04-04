import { inject, Injectable } from '@angular/core';
import { ArtistGateWay } from '../../domain/artist/artist.gateway';
import { BaseUseCase } from '../base/base.use-case';

@Injectable({
  providedIn: 'root'
})
export class ArtistUseCase extends BaseUseCase{
  private artistGateway = inject(ArtistGateWay);
  getArtist (singerId: string) {
    return this.execute(this.artistGateway.getArtist(singerId));
  }
}
