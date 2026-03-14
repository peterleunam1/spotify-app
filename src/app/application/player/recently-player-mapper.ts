import { Item, RecentlyPlayed, RecentlyPlayedTrackModel } from '../../domain/player/player.entity';

export class RecentlyPlayedMapper {
  static toModel(data: RecentlyPlayed): RecentlyPlayedTrackModel[] {
    return data.items.map((item) => this.mapItem(item));
  }

  private static mapItem(item: Item): RecentlyPlayedTrackModel {
    const track = item.track;

    return {
      id: track.id,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      artistId: track.artists[0]?.id ?? '',
      album: track.album.name,
      albumImage: track.album.images?.[0]?.url ?? '',
      durationMs: track.duration_ms,
      duration: this.formatDuration(track.duration_ms),
      playedAt: new Date(item.played_at),
      playedAgo: this.timeAgo(new Date(item.played_at)),
      spotifyUrl: track.external_urls.spotify
      
    };
  }

  private static formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  private static timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);

      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }
}