import { SWAPI_BASE_URL } from "@/app/constants";
import { Character } from "@/app/types";
import CharacterDetail from "@/components/CharacterDetail";
import { fetchAllItems } from "@/utilities/fetchAllItems";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetch(`${SWAPI_BASE_URL}/people/${id}`);
  const character: Character = await response.json();

  // Fetch the home planet
  const homeplanetReq = await fetch(character.homeworld);
  const homeplanet = await homeplanetReq.json();
  character.homeplanet = homeplanet.name;

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

  return (
    <>
      <h1 className="text-4xl font-extrabold my-6">{character.name}</h1>
      <CharacterDetail character={character} />
    </>
  );
}
