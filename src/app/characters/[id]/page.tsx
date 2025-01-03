import { SWAPI_BASE_URL } from "@/app/constants";
import { CharacterDetail } from "@/components/characters/CharacterDetail";
import { CharacterType } from "@/types/characters";
import { fetchAllItems } from "@/utilities/fetchAllItems";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const response = await fetch(`${SWAPI_BASE_URL}/people/${id}`);
  const character: CharacterType = await response.json();

  // Fetch the home planet
  const homeplanetReq = await fetch(character.homeworld);
  const homeplanet = await homeplanetReq.json();
  character.home_planet = homeplanet.name;

  // Fetch all films and starships
  const films = await fetchAllItems<{
    title: string;
    url: string;
    characters: string[];
  }>("films");
  const ships = await fetchAllItems<{
    name: string;
    url: string;
    pilots: string[];
  }>("starships");

  // Filter movies and ships relevant to the character
  character.movies = films
    .filter((film) => film.characters.includes(character.url))
    .map((film) => ({ title: film.title, url: film.url }));

  character.ships = ships
    .filter((ship) => ship.pilots.includes(character.url))
    .map((ship) => ({ name: ship.name, url: ship.url }));

  return <CharacterDetail character={character} />;
}
