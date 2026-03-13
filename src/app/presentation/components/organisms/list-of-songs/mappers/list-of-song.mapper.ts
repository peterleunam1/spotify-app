// import { Item } from '../../../../../domain/albums/albums.entity'
// import { TrackUIModel } from '../../../../../domain/tracks/track-ui.model'
// import { Mapper } from '../../../../interfaces/mapper'

import { Item } from '../../../../../domain/albums/albums.entity';
import { TrackUIModel } from '../../../../../domain/tracks/tracks.entity';
import { Mapper } from '../../../../interfaces/mapper';

export class AlbumTrackMapper implements Mapper<Item[], TrackUIModel[]> {
  mapTo(tracks: Item[]): TrackUIModel[] {
    if (!tracks?.length) return [];

    return tracks.map(track => ({
      id: track.id,
      title: track.name,
      duration: track.duration_ms,
      albumName: '', // en álbum no hace falta repetir
      albumImage: '', // se puede omitir si la lista está dentro del álbum
      artists: track.artists.map(a => a.name).join(', '),
      link: track.external_urls?.spotify ?? ''
    }));
  }
}
