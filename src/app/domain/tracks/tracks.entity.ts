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
  type: ItemType;
  uri: string;
  is_local: boolean;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  name: Name;
  type: ArtistType;
  uri: URI;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ID {
  The0C8ZW7EzQVs4URX5AX7Kqx = '0C8ZW7ezQVs4URX5aX7Kqx',
  The0FA0VVWsXO9YnASrzqfmYu = '0fA0VVWsXO9YnASrzqfmYu',
  The4IVAbR2W4JJNJDDRFP3E83 = '4IVAbR2w4JJNJDDRFP3E83'
}

export enum Name {
  KidCudi = 'Kid Cudi',
  SelenaGomez = 'Selena Gomez',
  The6Lack = '6LACK'
}

export enum ArtistType {
  Artist = 'artist'
}

export enum URI {
  SpotifyArtist0C8ZW7EzQVs4URX5AX7Kqx = 'spotify:artist:0C8ZW7ezQVs4URX5aX7Kqx',
  SpotifyArtist0FA0VVWsXO9YnASrzqfmYu = 'spotify:artist:0fA0VVWsXO9YnASrzqfmYu',
  SpotifyArtist4IVAbR2W4JJNJDDRFP3E83 = 'spotify:artist:4IVAbR2w4JJNJDDRFP3E83'
}

export enum ItemType {
  Track = 'track'
}

export interface SingleSongModel {
  name: string;
  duration: number;
  link: string;
}
