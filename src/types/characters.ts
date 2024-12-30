export interface PlanetType {
  uid: string;
  name: string;
  url: string;
}

export interface CharacterListItemType {
  name: string;
  url: string;
  homeworld: string;
  gender?: string;
  homeplanet?: PlanetType;
  [key: string]: any;
}

export interface CharacterType {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;

  // Extended properties
  home_planet?: string;
  movies?: { title: string; url: string }[];
  ships?: { name: string; url: string }[];
}
