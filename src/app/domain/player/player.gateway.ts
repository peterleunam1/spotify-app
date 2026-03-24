import { Observable } from 'rxjs';
import { CurrentlyPlayingTrackModel, RecentlyPlayed } from './player.entity';

export abstract class PlayerGateway {
  abstract getRecentlyPlayed(): Observable<RecentlyPlayed>;
  abstract getCurrentlyPlayingTrack(): Observable<CurrentlyPlayingTrackModel>;
}
