export interface SearchResult {
  resp: Resp;
}
interface Resp {
  data?: DataEntity[] | null;
  headers?: null[] | null;
  status: number;
}
export interface DataEntity {
  id: string;
  name: string;
  type: string;
  link: string;
  extra: Extra;
}
interface Extra {
  date: string;
  artists?: ArtistsEntityOrVenue[] | null;
  venue: ArtistsEntityOrVenue;
  city: City;
}
interface ArtistsEntityOrVenue {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
}
interface City {
  id: number;
  name: string;
  country: Country;
  thumbnail: Thumbnail;
  link: string;
}
interface Country {
  code: string;
  name: string;
}
interface Thumbnail {
  id: string;
  url: string;
}
