import {
  SingleSongModel,
  TracksModel
} from '../../../../../domain/tracks/tracks.entity';
import { Mapper } from '../../../../interfaces/mapper';

export class ListOfSongMapper
  implements Mapper<TracksModel, SingleSongModel[]>
{
  mapTo(param: TracksModel): SingleSongModel[] {
    if (!param || !param.items) return [];

    return param.items.map(track => ({
      name: track.name,
      duration: track.duration_ms,
      link: track.external_urls?.spotify ?? ''
    }));
  }
}
