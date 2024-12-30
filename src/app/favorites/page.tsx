"use client";

import { useFetchFavorites } from "@/hooks/useFetchFavorites";
import { useFetchPlanets } from "@/hooks/useFetchPlanets";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { removeFavorite } from "@/utilities/favorites";
import { Spinner } from "@/components/shared/Spinner";

export default function Page() {
  const { planetsObject, loading: loadingPlanets } = useFetchPlanets();
  const {
    favorites,
    setFavorites,
    loading: loadingFavorites,
    error,
  } = useFetchFavorites();

  // Enrich favorites with planet data
  const enrichedFavorites = favorites.map((character) => ({
    ...character,
    homeplanet: planetsObject[character.homeworld] || null,
  }));

  const handleRemoveFavorite = (characterUrl: string) => {
    removeFavorite(characterUrl); // Update localStorage
    setFavorites((prev) => prev.filter((fav) => fav.url !== characterUrl)); // Update state
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold my-6">Favorite Characters</h1>
      {(loadingFavorites || loadingPlanets) && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      {!loadingFavorites && enrichedFavorites.length === 0 && (
        <p>No favorite characters found.</p>
      )}
      {!loadingFavorites && enrichedFavorites.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {enrichedFavorites.map((character) => (
            <CharacterCard
              key={character.url}
              character={character}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
