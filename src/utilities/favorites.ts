const FAVORITES_KEY = "favorites";

/**
 * Get the list of favorite character URLs from localStorage.
 * @returns {string[]} An array of favorite character URLs.
 */
export const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
};

/**
 * Check if a character URL is in the favorites list.
 * @param url - The character URL to check.
 * @returns {boolean} True if the character is a favorite, false otherwise.
 */
export const isFavorite = (url: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(url);
};

/**
 * Add a character URL to the favorites list in localStorage.
 * @param url - The character URL to add.
 */
export const addFavorite = (url: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(url)) {
    favorites.push(url);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

/**
 * Remove a character URL from the favorites list in localStorage.
 * @param url - The character URL to remove.
 */
export const removeFavorite = (url: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav !== url);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};
