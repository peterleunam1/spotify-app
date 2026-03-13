import { MusicDNA, TopTracksModel } from '../../domain/tracks/tracks.entity';

export function mapTracksToMusicDNA(tracks: TopTracksModel): MusicDNA {
  const items = tracks.items;

  const avgPopularity =
    items.reduce((sum, t) => sum + t.popularity, 0) / items.length;

  const avgDuration =
    items.reduce((sum, t) => sum + t.duration_ms, 0) / items.length;

  const explicitCount = items.filter(t => t.explicit).length;

  const artists = new Set(items.flatMap(t => t.artists.map(a => a.id)));

  const currentYear = new Date().getFullYear();

  const freshness =
    items.reduce((sum, t) => {
      const year = new Date(t.album.release_date).getFullYear();
      return sum + (currentYear - year);
    }, 0) / items.length;

  return {
    energy: avgPopularity / 100,
    mainstream: avgPopularity / 100,
    freshness: 1 - freshness / 20,
    intensity: avgDuration / 300000,
    explicitness: explicitCount / items.length,
    variety: artists.size / items.length
  };
}
