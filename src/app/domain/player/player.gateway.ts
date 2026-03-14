import { Observable } from 'rxjs';
import { RecentlyPlayed } from './player.entity';

export abstract class PlayerGateway {
  abstract getRecentlyPlayed(): Observable<RecentlyPlayed>;
}
