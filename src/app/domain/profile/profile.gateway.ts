import { Observable } from 'rxjs';
import { GetTopItemsParams, ProfileModel } from './profile.entity';
import { TopTracksModel } from '../tracks/tracks.entity';
import { TopArtistsModel } from '../artist/artist.entity';

export abstract class ProfileGateWay {
  abstract getProfile(): Observable<ProfileModel>;
  abstract getTopItems(props: GetTopItemsParams): Observable<TopArtistsModel | TopTracksModel>;
}
