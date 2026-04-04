import { SingleSingerModel } from '../../domain/search/search.entity';

export function mergeSearchResults(
  artists: SingleSingerModel[],
  albums: SingleSingerModel[],
  tracks: SingleSingerModel[]
): SingleSingerModel[] {
  const merged: SingleSingerModel[] = [];

  const maxLength = Math.max(artists.length, albums.length, tracks.length);

  for (let i = 0; i < maxLength; i++) {
    if (artists[i]) merged.push(artists[i]);
    if (tracks[i]) merged.push(tracks[i]);
    if (albums[i]) merged.push(albums[i]);
  }

  return merged;
}
