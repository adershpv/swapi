import { SWAPI_BASE_URL } from "../constants";

type Character = {
  uid: number;
  name: string;
  url: string;
};

export default async function Page() {
  const response = await fetch(`${SWAPI_BASE_URL}/people?page=1&limit=100`);
  const { results: characters } = await response.json();

  return (
    <ul>
      {characters.map((character: Character) => (
        <li key={character.uid}>{character.name}</li>
      ))}
    </ul>
  );
}
