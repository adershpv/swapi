import { useEffect, useState } from "react";
import { CharacterListItemType } from "@/types/characters";
import { getFavorites } from "@/utilities/favorites";

export function useFetchFavorites() {
  const [favorites, setFavorites] = useState<CharacterListItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      setLoading(true);
      try {
        const favoriteUrls = getFavorites();
        const favoriteCharacters: CharacterListItemType[] = [];

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

  return { favorites, setFavorites, loading, error };
}
