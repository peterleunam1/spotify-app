export interface RecentlyPlayed {
  items: Item[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Cursors {
  after: string;
  before: string;
}

export interface Item {
  track: Track;
  played_at: Date;
  context: Context | null;
}

export interface Context {
  type: ContextType;
  external_urls: ExternalUrls;
  href: string;
  uri: URI;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ContextType {
  Album = 'album',
  Playlist = 'playlist'
}

export enum URI {
  SpotifyAlbum097EYvf9NKjFnv4XA9S2OV = 'spotify:album:097eYvf9NKjFnv4xA9s2oV',
  SpotifyAlbum6DEjYFkNZh67HP7R9PSZvv = 'spotify:album:6DEjYFkNZh67HP7R9PSZvv',
  SpotifyPlaylist0QQTINv2WP0LParNu1PRVG = 'spotify:playlist:0QQTiNv2WP0LParNu1pRVg'
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_type: AlbumType;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: ContextType;
  uri: string;
}

export enum AlbumType {
  Album = 'album',
  Compilation = 'compilation',
  Single = 'single'
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export enum ArtistType {
  Artist = 'artist'
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Year = 'year'
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = 'track'
}

export interface RecentlyPlayedTrackModel {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  albumImage: string;
  durationMs: number;
  duration: string;
  playedAt: Date;
  playedAgo: string;
  spotifyUrl: string;
}

export interface CurrentlyPlayingTrackModel {
    device:                 Device;
    repeat_state:           string;
    shuffle_state:          boolean;
    context:                Context;
    timestamp:              number;
    progress_ms:            number;
    is_playing:             boolean;
    item:                   Item;
    currently_playing_type: string;
    actions:                Actions;
}

export interface Actions {
    interrupting_playback:   boolean;
    pausing:                 boolean;
    resuming:                boolean;
    seeking:                 boolean;
    skipping_next:           boolean;
    skipping_prev:           boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle:        boolean;
    toggling_repeat_track:   boolean;
    transferring_playback:   boolean;
}

export interface Context {
    type:          ContextType;
    href:          string;
    external_urls: ExternalUrls;
    uri:           URI;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Device {
    id:                 string;
    is_active:          boolean;
    is_private_session: boolean;
    is_restricted:      boolean;
    name:               string;
    type:               string;
    volume_percent:     number;
    supports_volume:    boolean;
}

export interface Item {
    album:             Album;
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    is_playable:       boolean;
    linked_from:       string;
    restrictions:      Restrictions;
    name:              string;
    popularity:        number;
    preview_url:       string;
    track_number:      number;
    type:              string;
    uri:               string;
    is_local:          boolean;
}

export interface Album {
    album_type:             AlbumType;
    total_tracks:           number;
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    restrictions:           Restrictions;
    type:                   ContextType;
    uri:                    string;
    artists:                Artist[];
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          ArtistType;
    uri:           string;
}

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export interface Restrictions {
    reason: string;
}

export interface ExternalIDS {
    isrc: string;
    ean:  string;
    upc:  string;
}

export interface CurrentlyPlayingModel {
  id: string;
  title: string;
  artists: string;
  album: string;
  albumImage: string;
  durationMs: number;
  progressMs: number;
  isPlaying: boolean;
  spotifyUrl: string;
  deviceName: string;
  deviceType: string;
  shuffle: boolean;
  repeat: string;
}

export interface ListeningHeatmapCellModel {
  day: number
  hour: number
  count: number
}
