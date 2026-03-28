import { ArtistItem } from '../../domain/artist/artist.entity';
import { GENRE_MAP } from '../constants/genres-storage';

function normalizeGenre(genre: string): string {
  const key = genre.toLowerCase();

  for (const mapKey in GENRE_MAP) {
    if (key.includes(mapKey)) {
      return GENRE_MAP[mapKey];
    }
  }

  return 'Other';
}
export const getTopGenres = (artists: ArtistItem[]) => {
  const genreCount: Record<string, number> = {};

  artists.forEach(artist => {
    artist.genres.forEach(rawGenre => {
      const genre = normalizeGenre(rawGenre);

      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  return Object.entries(genreCount)
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};
