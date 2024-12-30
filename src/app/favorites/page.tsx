"use client";

import { useEffect, useState } from "react";
import { CharacterListItem, Planet } from "@/types/characters";
import { getFavorites, removeFavorite } from "@/utilities/favorites";
import CharacterCard from "@/components/characters/CharacterCard";
import { fetchAllItems } from "@/utilities/fetchAllItems";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<CharacterListItem[]>([]);
  const [planetsObject, setPlanetsObject] = useState<Record<string, Planet>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      setLoading(true);
      try {
        // Fetch all favorite URLs
        const favoriteUrls = getFavorites();
        const favoriteCharacters: CharacterListItem[] = [];

        for (const url of favoriteUrls) {
          const response = await fetch(url);
          if (!response.ok)
            throw new Error("Failed to fetch character details");
          const character = await response.json();
          favoriteCharacters.push(character);
        }

        setFavorites(favoriteCharacters);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlanets = async () => {
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
      }
    };

    fetchFavoriteCharacters();
    fetchPlanets();
  }, []);

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
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && enrichedFavorites.length === 0 && (
        <p>No favorite characters found.</p>
      )}
      {!loading && enrichedFavorites.length > 0 && (
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
