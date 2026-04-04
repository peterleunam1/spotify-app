import { ArtistItem } from '../../domain/artist/artist.entity';
import { GENRE_MAP } from '../constants/genres-storage';

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .trim();
}

function normalizeGenre(genre: string): string {
  const key = normalizeString(genre);

  const sortedKeys = Object.keys(GENRE_MAP).sort((a, b) => b.length - a.length);

  for (const mapKey of sortedKeys) {
    if (key.includes(normalizeString(mapKey))) {
      return GENRE_MAP[mapKey];
    }
  }

  return 'Other';
}
export const getTopGenres = (artists: ArtistItem[]) => {
  const genreCount: Record<string, number> = {};

  artists.forEach(artist => {
    artist.genres.forEach(rawGenre => {
      console.log('function', rawGenre);
      const genre = normalizeGenre(rawGenre);
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  return Object.entries(genreCount)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};
