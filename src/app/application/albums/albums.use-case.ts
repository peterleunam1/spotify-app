import { inject, Injectable } from '@angular/core';
import { AlbumsGateWay } from '../../domain/albums/albums.gateway';
@Injectable({
  providedIn: 'root'
})
export class AlbumsUseCase {
  private albumGateWay = inject(AlbumsGateWay);
  getAlbums(singerId: string) {
    return this.albumGateWay.getAlbums(singerId);
  }
  
  getOneAlbum(albumId: string) {
    return this.albumGateWay.getOneAlbum(albumId);
  }
}
