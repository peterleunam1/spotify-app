import { Observable } from 'rxjs';
import { OneArtistModel } from './artist.entity';

export abstract class ArtistGateWay {
  abstract getArtist(singerId: string): Observable<OneArtistModel>;
}
