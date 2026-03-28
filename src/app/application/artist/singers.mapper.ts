import {
  ArtistsItem as Singer,
  SingleSingerModel,
  AlbumElement,
  TracksItem
} from '../../domain/singers/singer.entity';
import { Mapper } from '../../presentation/interfaces/mapper';

export class SingersMapper implements Mapper<Singer, SingleSingerModel> {
  mapTo(param: Singer): SingleSingerModel {
    const { id, name, images, followers, genres } = param;
    return {
      id,
      name,
      image: images[0] ? images[0].url : '/assets/images/default-singer.png',
      followers: followers.total,
      genres,
      type: 'artist'
    };
  }
}

export class TracksMapper implements Mapper<TracksItem, SingleSingerModel> {
  mapTo(param: TracksItem): SingleSingerModel {
    const { id, name, album } = param;
    return {
      id,
      name,
      image: album.images[0].url
        ? album.images[0].url
        : '/assets/images/default-singer.png',
      type: 'track',
      singerNameFromTrack: album.artists[0].name
    };
  }
}

export class AlbumsMapper implements Mapper<AlbumElement, SingleSingerModel> {
  mapTo(param: AlbumElement): SingleSingerModel {
    const { id, name, images, artists } = param;
    return {
      id,
      name,
      image: images[0].url
        ? images[0].url
        : '/assets/images/default-singer.png',
      type: 'album',
      artistNamefromAlbum: artists[0].name
    };
  }
}

export class AudiobooksMapper implements Mapper<AlbumElement, SingleSingerModel> {
  mapTo(param: AlbumElement): SingleSingerModel {
    const { id, name, images, artists } = param;
    return {
      id,
      name,
      image: images[0].url
        ? images[0].url
        : '/assets/images/default-singer.png',
      type: 'audiobook',
      artistNamefromAlbum: artists[0].name
    };
  }
}
