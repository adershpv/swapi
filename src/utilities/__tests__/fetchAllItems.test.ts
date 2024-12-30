import { fetchAllItems } from "../fetchAllItems";
import { SWAPI_BASE_URL } from "@/app/constants";

describe("fetchAllItems", () => {
  const mockEntity = "planets";
  const mockResponsePage1 = {
    results: [{ name: "Tatooine" }, { name: "Alderaan" }],
    next: `${SWAPI_BASE_URL}/${mockEntity}/?page=2`,
  };
  const mockResponsePage2 = {
    results: [{ name: "Dagobah" }, { name: "Hoth" }],
    next: null,
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all items across multiple pages", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponsePage1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponsePage2,
      });

    const items = await fetchAllItems<{ name: string }>(mockEntity);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/${mockEntity}/`);
    expect(fetch).toHaveBeenCalledWith(mockResponsePage1.next);
    expect(items).toEqual([
      { name: "Tatooine" },
      { name: "Alderaan" },
      { name: "Dagobah" },
      { name: "Hoth" },
    ]);
  });

  it("should handle a single page response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ name: "Endor" }],
        next: null,
      }),
    });

    const items = await fetchAllItems<{ name: string }>(mockEntity);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/${mockEntity}/`);
    expect(items).toEqual([{ name: "Endor" }]);
  });

  it("should handle empty results gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [],
        next: null,
      }),
    });

    const items = await fetchAllItems<{ name: string }>(mockEntity);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/${mockEntity}/`);
    expect(items).toEqual([]);
  });
});
