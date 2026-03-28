export interface PlaylistsModel {
  href: string;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface OnePlaylistModel {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Items;
  items: Items;
  type: string;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Items {
  href: string;
  items: ItemElement[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface ItemElement {
  added_at: Date;
  added_by: Owner;
  is_local: boolean;
  primary_color: null;
  track: TrackClass;
  item: TrackClass;
  video_thumbnail: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  name?: string;
  display_name?: string;
}

export enum OwnerType {
  Artist = 'artist',
  User = 'user'
}

export interface TrackClass {
  preview_url: null;
  available_markets: string[];
  explicit: boolean;
  type: string;
  episode: boolean;
  track: boolean;
  album: Album;
  artists: Owner[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  external_ids: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  uri: string;
  is_local: boolean;
}

export interface Album {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  uri: string;
  artists: Owner[];
  external_urls: ExternalUrls;
  total_tracks: number;
}
