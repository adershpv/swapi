import Link from "next/link";
import { SWAPI_BASE_URL } from "../constants";
import { CharacterListItem } from "../types";

export default async function Page() {
  const response = await fetch(`${SWAPI_BASE_URL}/people?page=1&limit=100`);
  const { results: characters } = await response.json();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Star Wars Characters</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {characters.map((character: CharacterListItem) => (
          <li
            key={character.uid}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <Link href={`/characters/${character.uid}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
