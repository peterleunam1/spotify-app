export interface OneArtistModel {
    external_urls: ExternalUrls;
    followers:     Followers;
    genres:        string[];
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    popularity:    number;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href:  null;
    total: number;
}

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export interface TopArtistsModel {
  items: ArtistItem[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: null;
}

export interface ArtistItem {
  id: string;
  name: string;
  images: Image[];
  followers: Followers;
  genres: string[];
  popularity: number;
  type: string;
  uri: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}