import {
  CurrentlyPlayingModel,
  CurrentlyPlayingTrackModel
} from '../../domain/player/player.entity';

export class CurrentlyPlayingMapper {
  static toModel(
    data: CurrentlyPlayingTrackModel | null
  ): CurrentlyPlayingModel | null {
    if (!data || !data.item) {
      return null;
    }

    const track = data.item;

    return {
      id: track.id,
      title: track.name,
      artists: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      albumImage: track.album.images?.[0]?.url ?? '',
      durationMs: track.duration_ms,
      progressMs: data.progress_ms ?? 0,
      isPlaying: data.is_playing ?? false,
      spotifyUrl: track.external_urls.spotify,
      deviceName: data.device?.name ?? 'Unknown device',
      deviceType: data.device?.type ?? '',
      shuffle: data.shuffle_state ?? false,
      repeat: data.repeat_state ?? 'off'
    };
  }
}
