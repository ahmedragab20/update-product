export interface Artist {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Album {
  name: string;
  artist: ArtistClass;
  tracks: Track[];
}

export interface ArtistClass {
  name: string;
  founded: number;
  members: string[];
}

export interface Track {
  name: string;
  duration: number;
}