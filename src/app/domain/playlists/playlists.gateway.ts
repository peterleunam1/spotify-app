import { Observable } from 'rxjs';
import { OnePlaylistModel, PlaylistsModel } from './playlists.entity';

export abstract class PlaylistsGateWay {
  abstract getPlaylists(): Observable<PlaylistsModel>;
  abstract getOnePlaylist(playlistId: string): Observable<OnePlaylistModel>;
}
