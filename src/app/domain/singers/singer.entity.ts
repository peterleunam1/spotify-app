export interface SingerResponse {
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
  audiobooks: Albums;
}

export interface Albums {
  href: string;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
  items: AlbumElement[];
}

export interface AlbumElement {
  album_type: AlbumTypeEnum;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  type: AlbumTypeEnum;
  uri: string;
  artists: Artist[];
  is_playable?: boolean;
}

export enum AlbumTypeEnum {
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

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = 'artist'
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Month = 'month',
  Year = 'year'
}

export interface Artists {
  href: string;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
  items: ArtistsItem[];
}

export interface ArtistsItem {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: ArtistType;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: TracksItem[];
}

export interface TracksItem {
  album: AlbumElement;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: PurpleType;
  uri: string;
  is_local: boolean;
}

export interface ExternalIDS {
  isrc: string;
}

export enum PurpleType {
  Track = 'track'
}

export interface SingleSingerModel {
  id: string;
  name: string;
  image: string;
  followers?: number;
  genres?: string[];
  type?: 'artist' | 'album' | 'playlist' | 'track' | 'audiobook';
  artistNamefromAlbum?: string;
  singerNameFromTrack?: string;
}
