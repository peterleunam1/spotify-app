import {
  Singer,
  SingleSingerModel
} from '../../../../domain/singers/singer.entity';
import { Mapper } from '../../../interfaces/mapper';

export class SingersMapper implements Mapper<Singer, SingleSingerModel> {
  mapTo(param: Singer): SingleSingerModel {
    const { id, name, images, followers, genres } = param;
    return {
      id,
      name,
      image: images[0] ? images[0].url : '/assets/images/default-singer.png',
      followers: followers.total,
      genres
    };
  }
}
