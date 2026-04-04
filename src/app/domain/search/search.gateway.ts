import { Observable } from 'rxjs';
import { SingerResponse } from './search.entity';

export abstract class SearchGateway {
  abstract getAnArtist(name: string): Observable<SingerResponse>;
}
