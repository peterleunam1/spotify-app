import { inject, Injectable } from '@angular/core';
import { AlbumsGateWay } from '../../domain/albums/albums.gateway';
import { TokenGateway } from '../../domain/token/token.gateway';
@Injectable({
  providedIn: 'root'
})
export class AlbumsUseCase {
  private albumGateWay = inject(AlbumsGateWay);
  private tokenGateWay = inject(TokenGateway);
  getAlbums(singerId: string) {
    return this.albumGateWay.getAlbums(singerId, this.tokenGateWay.getToken());
  }
}
