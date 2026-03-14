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