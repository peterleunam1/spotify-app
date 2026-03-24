import { RecentlyPlayedTrackModel } from '../../domain/player/player.entity';

export function buildListeningHeatmap(
  tracks: RecentlyPlayedTrackModel[]
): number[][] {
  const matrix = Array.from({ length: 24 }, () => Array(7).fill(0));

  tracks.forEach(track => {
    const date = new Date(track.playedAt);

    const day = date.getDay();
    const hour = date.getHours();

    matrix[hour][day] += 1;
  });

  return matrix;
}
