import { Observable } from 'rxjs';
import { TracksModel } from './tracks.entity';

export abstract class TracksGateWay {
  abstract getTracks(albumId: string, token: string): Observable<TracksModel>;
}
