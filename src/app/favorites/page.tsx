"use client";

import { useEffect, useState } from "react";
import { CharacterListItem } from "@/types/characters";
import { getFavorites, removeFavorite } from "@/utilities/favorites";
import CharacterCard from "@/components/characters/CharacterCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<CharacterListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      setLoading(true);
      try {
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

    fetchFavoriteCharacters();
  }, []);

  const handleRemoveFavorite = (characterUrl: string) => {
    removeFavorite(characterUrl); // Update localStorage
    setFavorites((prev) => prev.filter((fav) => fav.url !== characterUrl)); // Update state
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold my-6">Favorite Characters</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && favorites.length === 0 && (
        <p>No favorite characters found.</p>
      )}
      {!loading && favorites.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {favorites.map((character) => (
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
