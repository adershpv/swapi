import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useFetchPlanets } from "../useFetchPlanets";
import { fetchAllItems } from "@/utilities/fetchAllItems";
import { PlanetType } from "@/types/characters";

jest.mock("@/utilities/fetchAllItems");

describe("useFetchPlanets", () => {
  const mockPlanets: PlanetType[] = [
    { name: "Tatooine", url: "https://swapi.dev/api/planets/1/" },
    { name: "Alderaan", url: "https://swapi.dev/api/planets/2/" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initially set loading to true", () => {
    (fetchAllItems as jest.Mock).mockResolvedValueOnce(mockPlanets);

    const { result } = renderHook(() => useFetchPlanets());

    expect(result.current.loading).toBe(true);
  });

  it("should fetch planets and set planetsObject correctly", async () => {
    (fetchAllItems as jest.Mock).mockResolvedValueOnce(mockPlanets);

    const { result } = renderHook(() => useFetchPlanets());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.planetsObject).toEqual({
      "https://swapi.dev/api/planets/1/": {
        name: "Tatooine",
        url: "https://swapi.dev/api/planets/1/",
      },
      "https://swapi.dev/api/planets/2/": {
        name: "Alderaan",
        url: "https://swapi.dev/api/planets/2/",
      },
    });
  });

  it("should handle errors gracefully", async () => {
    const error = new Error("Failed to fetch planets");
    (fetchAllItems as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useFetchPlanets());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.planetsObject).toEqual({});
    expect(result.current.loading).toBe(false);
  });
});
