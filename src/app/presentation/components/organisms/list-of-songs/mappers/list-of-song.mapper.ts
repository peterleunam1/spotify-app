import { SingleSongModel, TracksModel } from '../../../../../domain/tracks/tracks.entity';
import { Mapper } from '../../../../interfaces/mapper';


export class ListOfSongMapper implements Mapper<TracksModel, SingleSongModel[]> {
    mapTo(param: TracksModel): SingleSongModel[] {
      if (!param || !param.items) return []; // Manejo de caso donde no haya canciones
  
      return param.items.map(track => ({
        name: track.name,
        duration: track.duration_ms, // Correcto según TracksModel
        link: track.external_urls?.spotify ?? '' // Evita errores si no tiene URL
      }));
    }
  }