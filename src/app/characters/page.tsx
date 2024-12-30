"use client";

import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { fetchAllItems } from "@/utilities/fetchAllItems";
import CharacterCard from "@/components/CharacterCard";
import { CharacterListItem, Planet } from "../types";
import { Pagination } from "@nextui-org/react";

export default function Page() {
  const [planetsObject, setPlanetsObject] = useState<Record<string, Planet>>(
    {},
  );
  const [loadingPlanets, setLoadingPlanets] = useState(true);

  const {
    data: characters,
    loading: loadingCharacters,
    error,
    setPage,
    totalPages,
    currentPage,
  } = usePagination<CharacterListItem>("people");

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoadingPlanets(true);
      try {
        const planets = await fetchAllItems<Planet>("planets");
        const planetsMap = planets.reduce<Record<string, Planet>>(
          (acc, planet) => {
            acc[planet.url] = planet;
            return acc;
          },
          {},
        );
        setPlanetsObject(planetsMap);
      } catch (err) {
        console.error("Error fetching planets:", err);
      } finally {
        setLoadingPlanets(false);
      }
    };

    fetchPlanets();
  }, []);

  const enrichedCharacters = characters.map((character) => ({
    ...character,
    homeplanet: planetsObject[character.homeworld] || null, // Provide a fallback for missing planets
  }));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold my-6">Characters</h1>
      {(loadingCharacters || loadingPlanets) && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loadingCharacters && !loadingPlanets && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {enrichedCharacters.map((character) => (
              <CharacterCard key={character.url} character={character} />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Pagination
              showControls
              initialPage={1}
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
