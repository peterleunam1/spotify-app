import { Observable } from 'rxjs';
import { AlbumModel, AlbumsModel } from './albums.entity';

export abstract class AlbumsGateWay {
  abstract getAlbums(singerId: string): Observable<AlbumsModel>;
  abstract getOneAlbum(albumId: string): Observable<AlbumModel>; 
}
