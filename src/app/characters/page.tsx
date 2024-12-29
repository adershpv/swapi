import { fetchAllItems } from "@/utilities/fetchAllItems";
import { SWAPI_BASE_URL } from "../constants";
import { CharacterListItem } from "../types";
import CharacterCard from "@/components/CharacterCard";

export default async function Page() {
  const peopleReq = await fetch(`${SWAPI_BASE_URL}/people?page=1&limit=100`);
  const { results: characters } = await peopleReq.json();

  const planets = await fetchAllItems("planets");
  const planetsObject = {};
  planets.forEach((planet) => {
    planetsObject[planet.url] = planet;
  });

  return (
    <>
      <h1 className="text-4xl font-extrabold my-6">Characters</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {characters.map((character: CharacterListItem) => {
          character.homeplanet = planetsObject[character.homeworld];
          return <CharacterCard key={character.url} character={character} />;
        })}
      </div>
    </>
  );
}
