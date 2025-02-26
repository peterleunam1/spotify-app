import { Observable } from 'rxjs';
import { PlaylistsModel } from './playlists.entity';

export abstract class PlaylistsGateWay {
    abstract getPlaylists(token: string): Observable<PlaylistsModel>;
}
