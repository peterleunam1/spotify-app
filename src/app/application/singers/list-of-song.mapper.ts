import { Item } from '../../domain/albums/albums.entity';
import { TrackUIModel } from '../../domain/tracks/tracks.entity';
import { Mapper } from '../../presentation/interfaces/mapper';

export class AlbumTrackMapper implements Mapper<Item[], TrackUIModel[]> {
  mapTo(tracks: Item[]): TrackUIModel[] {
    if (!tracks?.length) return [];

    return tracks.map(track => ({
      id: track.id,
      title: track.name,
      duration: track.duration_ms,
      albumName: '',
      albumImage: '', 
      artists: track.artists.map(a => a.name).join(', '),
      link: track.external_urls?.spotify ?? ''
    }));
  }
}
