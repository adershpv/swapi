import { SWAPI_BASE_URL } from "@/app/constants";
import { Character } from "@/app/types";
import CharacterDetail from "@/components/CharacterDetail";
import { fetchAllItems } from "@/utilities/fetchAllItems";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const response = await fetch(`${SWAPI_BASE_URL}/people/${id}`);
  const character: Character = await response.json();

  const homeplanetReq = await fetch(character.homeworld);
  const homeplanet = await homeplanetReq.json();
  character.homeplanet = homeplanet.name;

  const films = await fetchAllItems("films");
  const ships = await fetchAllItems("starships");

  character.movies = films.filter((film) =>
    film.characters.includes(character.url),
  );

  character.ships = ships.filter((ship) => ship.pilots.includes(character.url));

  return (
    <>
      <h1 className="text-4xl font-extrabold my-6">{character.name}</h1>
      <CharacterDetail character={character} />
    </>
  );
}
