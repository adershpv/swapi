"use client";

import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { fetchAllItems } from "@/utilities/fetchAllItems";
import CharacterCard from "@/components/characters/CharacterCard";
import { Pagination } from "@nextui-org/react";
import { CharacterListItem, Planet } from "@/types/characters";
import { SearchBox } from "@/components/shared/SearchBox"; // Import the SearchBox component
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function Page() {
  const [planetsObject, setPlanetsObject] = useState<Record<string, Planet>>(
    {},
  );
  const [loadingPlanets, setLoadingPlanets] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search input
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500); // Debounced search query

  const {
    data: characters,
    loading: loadingCharacters,
    error,
    setPage,
    setSearchQuery: triggerSearch, // Function to set search query in the hook
    totalPages,
    currentPage,
  } = usePagination<CharacterListItem>("people");

  // Fetch planet data on component mount
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

  // Trigger search when the debounced query changes
  useEffect(() => {
    triggerSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, triggerSearch]);

  // Enrich characters with planet data
  const enrichedCharacters = characters.map((character) => ({
    ...character,
    homeplanet: planetsObject[character.homeworld] || null,
  }));

  return (
    <>
      <h1 className="text-4xl font-extrabold my-6">Characters</h1>
      <div className="mb-4">
        <SearchBox value={searchQuery} onSearchChange={setSearchQuery} />
      </div>
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
              total={totalPages}
              page={currentPage} // Bind to currentPage from the hook
              onChange={(page) => setPage(page)} // Update page in the hook
            />
          </div>
        </>
      )}
    </>
  );
}
