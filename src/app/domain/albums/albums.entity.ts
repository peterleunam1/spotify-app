export interface AlbumsModel {
    href:     string;
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
    items:    Item[];
}

export interface Item {
    album_type:             AlbumTypeEnum;
    total_tracks:           number;
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: ReleaseDatePrecision;
    type:                   AlbumTypeEnum;
    uri:                    string;
    artists:                Artist[];
    album_group:            AlbumGroup;
}

export enum AlbumGroup {
    Album = "album",
    AppearsOn = "appears_on",
    Single = "single",
}

export enum AlbumTypeEnum {
    Album = "album",
    Compilation = "compilation",
    Single = "single",
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          ArtistType;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface AlbumInfo {
    id: string;
    name: string;
    coverImage: string;
    releaseYear: number;
    artistName: string;
}