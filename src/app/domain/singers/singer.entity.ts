export interface SingerResponse {
    artists: Artists;
}

export interface Artists {
    href:     string;
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
    items:    Singer[];
}

export interface Singer {
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

export interface SingleSingerModel {
    id: string;
    name: string;
    image: string;
    followers: number;
    genres: string[];
  }
  