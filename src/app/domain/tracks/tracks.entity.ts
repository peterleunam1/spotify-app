export interface TracksModel {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}


export interface SingleSongModel {
  id: string;
  name: string;
  duration: number;
  albumName?: string;
  albumImage?: string;
  link: string;
}

export interface MeTrarcksModel {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Item[];
}

export interface Item {
  added_at: Date;
  track: Track;
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
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Album {
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
  is_playable: boolean;
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
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Year = 'year'
}

export interface ExternalIDS {
  isrc: string;
}

export type LikedTrackItem = MeTrarcksModel['items'][number];

export interface TrackUIModel {
  id: string
  title: string
  duration?: number
  albumName: string
  albumImage: string
  artists: string
  link: string
  timeAgo?: string
}

export interface SingleTrackModel {
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
    is_local:          boolean;
    name:              string;
    popularity:        number;
    preview_url:       null;
    track_number:      number;
    type:              string;
    uri:               string;
}

export interface Album {
    album_type:             AlbumTypeEnum;
    artists:                Artist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumTypeEnum;
    uri:                    string;
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Image {
    url:    string;
    width:  number;
    height: number;
}

export interface ExternalIDS {
    isrc: string;
}

export interface TopTracksModel {
  items: TrackItem[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: null;
}

export interface TrackItem {
  id: string;
  name: string;
  explicit?: boolean;
  duration_ms: number;
  popularity: number;
  uri: string;
  type: string;

  artists: Artist[];
  album: Album;
}

export interface Artist {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface AudioFeaturesModel {
    audio_features: AudioFeature[];
}

export interface AudioFeature {
    acousticness:     number;
    analysis_url:     string;
    danceability:     number;
    duration_ms:      number;
    energy:           number;
    id:               string;
    instrumentalness: number;
    key:              number;
    liveness:         number;
    loudness:         number;
    mode:             number;
    speechiness:      number;
    tempo:            number;
    time_signature:   number;
    track_href:       string;
    type:             string;
    uri:              string;
    valence:          number;
}

export interface MusicDNA {
  energy: number
  mainstream: number
  freshness: number
  intensity: number
  explicitness: number
  variety: number
}

export interface MusicPersonality {
  type: string;
  description: string;
  emoji: string;
}
