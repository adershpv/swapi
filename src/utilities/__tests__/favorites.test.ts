import {
  getFavorites,
  isFavorite,
  addFavorite,
  removeFavorite,
} from "../favorites";

const FAVORITES_KEY = "favorites";

describe("Favorites Utilities", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getFavorites", () => {
    it("should return an empty array if localStorage is empty", () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const favorites = getFavorites();

      expect(favorites).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith(FAVORITES_KEY);
    });

    it("should return the parsed favorites from localStorage", () => {
      const mockFavorites = ["https://swapi.dev/api/people/1/"];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      const favorites = getFavorites();

      expect(favorites).toEqual(mockFavorites);
      expect(localStorage.getItem).toHaveBeenCalledWith(FAVORITES_KEY);
    });
  });

  describe("isFavorite", () => {
    it("should return true if the URL is in the favorites list", () => {
      const mockFavorites = ["https://swapi.dev/api/people/1/"];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      const result = isFavorite("https://swapi.dev/api/people/1/");

      expect(result).toBe(true);
    });

    it("should return false if the URL is not in the favorites list", () => {
      const mockFavorites = ["https://swapi.dev/api/people/1/"];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      const result = isFavorite("https://swapi.dev/api/people/2/");

      expect(result).toBe(false);
    });
  });

  describe("addFavorite", () => {
    it("should add a new URL to the favorites list", () => {
      const mockFavorites = ["https://swapi.dev/api/people/1/"];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      addFavorite("https://swapi.dev/api/people/2/");

      expect(localStorage.setItem).toHaveBeenCalledWith(
        FAVORITES_KEY,
        JSON.stringify([
          "https://swapi.dev/api/people/1/",
          "https://swapi.dev/api/people/2/",
        ]),
      );
    });

    it("should not add a URL that is already in the favorites list", () => {
      const mockFavorites = ["https://swapi.dev/api/people/1/"];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      addFavorite("https://swapi.dev/api/people/1/");

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe("removeFavorite", () => {
    it("should remove a URL from the favorites list", () => {
      const mockFavorites = [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
      ];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      removeFavorite("https://swapi.dev/api/people/1/");

      expect(localStorage.setItem).toHaveBeenCalledWith(
        FAVORITES_KEY,
        JSON.stringify(["https://swapi.dev/api/people/2/"]),
      );
    });

    it("should do nothing if the URL is not in the favorites list", () => {
      const mockFavorites = ["https://swapi.dev/api/people/1/"];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites),
      );

      removeFavorite("https://swapi.dev/api/people/2/");

      expect(localStorage.setItem).toHaveBeenCalledWith(
        FAVORITES_KEY,
        JSON.stringify(mockFavorites),
      );
    });
  });
});
