"use client";

import { usePagination } from "@/hooks/usePagination";
import { useFetchPlanets } from "@/hooks/useFetchPlanets";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { Pagination } from "@nextui-org/react";
import { CharacterListItemType } from "@/types/characters";
import { SearchBox } from "@/components/shared/SearchBox";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Spinner } from "@/components/shared/Spinner";
import { useEffect, useState } from "react";

export default function Page() {
  const { planetsObject, loading: loadingPlanets } = useFetchPlanets();
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search input
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500); // Debounced search query

  const {
    data: characters,
    loading: loadingCharacters,
    error,
    setPage,
    setSearchQuery: triggerSearch,
    totalPages,
    currentPage,
  } = usePagination<CharacterListItemType>("people");

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
      {(loadingCharacters || loadingPlanets) && <Spinner />}
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
              page={currentPage}
              onChange={(page) => setPage(page)} // Update page in the hook
            />
          </div>
        </>
      )}
    </>
  );
}
