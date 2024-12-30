import { Character } from "@/types/characters";

export const SWAPI_BASE_URL = "https://swapi.py4e.com/api";

export const EDITABLE_PROPERTIES = ["height", "gender"];

export const DISPLAY_PROPERTIES: Array<keyof Character> = [
  "name",
  "height",
  "gender",
  "mass",
  "hair_color",
  "skin_color",
  "eye_color",
  "birth_year",
  "home_planet",
  "movies",
  "ships",
];
