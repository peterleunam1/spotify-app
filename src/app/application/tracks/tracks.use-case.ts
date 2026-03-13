import { inject, Injectable } from '@angular/core';
import { TracksGateWay } from '../../domain/tracks/tracks.gateway';

@Injectable({
  providedIn: 'root'
})
export class TracksUseCase {
  private tracksGateWay = inject(TracksGateWay);

  getTracks(albumId: string) {
    return this.tracksGateWay.getTracks(albumId);
  }

  getMyTracks() {
    return this.tracksGateWay.getMyTracks();
  }

  singleTrack(trackId: string) {
    return this.tracksGateWay.singleTrack(trackId);
  }

  getAudioFeatures(ids: string[]) {
    return this.tracksGateWay.getAudioFeatures(ids);
  }
}
