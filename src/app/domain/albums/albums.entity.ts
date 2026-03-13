export interface AlbumsModel {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Item[];
}

export interface Item {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  type: string;
  uri: string;
  artists: Artist[];
  album_group: AlbumGroup;
}

export enum AlbumGroup {
  Album = 'album',
  AppearsOn = 'appears_on',
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
  Day = 'day'
}

export interface AlbumInfo {
  id: string;
  name: string;
  coverImage: string;
  releaseYear: number;
  artistName: string;
}

export interface AlbumModel {
    album_type:             string;
    total_tracks:           number;
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: string;
    restrictions:           Restrictions;
    type:                   string;
    uri:                    string;
    artists:                Artist[];
    tracks:                 Tracks;
    copyrights:             Copyright[];
    external_ids:           ExternalIDS;
    genres:                 string[];
    label:                  string;
    popularity:             number;
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:         string;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Copyright {
    text: string;
    type: string;
}

export interface ExternalIDS {
    isrc: string;
    ean:  string;
    upc:  string;
}

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export interface Restrictions {
    reason: string;
}

export interface Tracks {
    href:     string;
    limit:    number;
    next:     string;
    offset:   number;
    previous: string;
    total:    number;
    items:    Item[];
}

export interface Item {
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    is_playable:       boolean;
    linked_from:       Artist;
    restrictions:      Restrictions;
    name:              string;
    preview_url:       string;
    track_number:      number;
    type:              string;
    uri:               string;
    is_local:          boolean;
}

