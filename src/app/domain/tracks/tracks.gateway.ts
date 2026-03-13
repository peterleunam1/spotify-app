import { Observable } from 'rxjs';
import { AudioFeaturesModel, MeTrarcksModel, SingleTrackModel, TracksModel } from './tracks.entity';

export abstract class TracksGateWay {
  abstract getTracks(albumId: string): Observable<TracksModel>;
  abstract getMyTracks(): Observable<MeTrarcksModel['items']>;
  abstract singleTrack(trackId: string): Observable<SingleTrackModel>;
  abstract getAudioFeatures(ids: string[]): Observable<AudioFeaturesModel>;
}
