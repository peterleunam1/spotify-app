export interface ProfileModel {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: userImage[];
  product: string;
  type: string;
  uri: string;
}

export interface userImage {
  height: number;
  url: string;
  width: number;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface TopItemsModel {
    items:    Item[];
    total:    number;
    limit:    number;
    offset:   number;
    href:     string;
    next:     string;
    previous: null;
}

export interface Item {
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
    height: number;
    url:    string;
    width:  number;
}

export interface GetTopItemsParams {
  item: 'artists' | 'tracks';
  timeRange: 'short_term' | 'medium_term' | 'long_term';
}

