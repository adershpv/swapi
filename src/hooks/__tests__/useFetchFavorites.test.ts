import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useFetchFavorites } from "../useFetchFavorites";
import { getFavorites } from "@/utilities/favorites";

jest.mock("@/utilities/favorites");

describe("useFetchFavorites", () => {
  const mockFavoriteUrls = [
    "https://swapi.dev/api/people/1/",
    "https://swapi.dev/api/people/2/",
  ];

  const mockCharacters = [
    { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
    { name: "Darth Vader", url: "https://swapi.dev/api/people/2/" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Option 1: Assign undefined
    global.fetch = undefined as unknown as typeof fetch;

    // Option 2: Use delete with type assertion
    // delete (global as any).fetch;
  });

  it("should fetch favorite characters and update favorites state", async () => {
    (getFavorites as jest.Mock).mockReturnValue(mockFavoriteUrls);

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacters[0],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacters[1],
      });

    const { result } = renderHook(() => useFetchFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favorites).toEqual(mockCharacters);
    expect(result.current.error).toBeNull();
  });
});
