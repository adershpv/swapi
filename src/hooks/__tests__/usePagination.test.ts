import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { usePagination } from "../usePagination";
import { SWAPI_BASE_URL } from "@/app/constants";

global.fetch = jest.fn();

describe("usePagination", () => {
  const mockResponse = {
    results: [{ name: "Luke Skywalker" }],
    count: 20,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the initial page data on mount", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/?page=1`);
    expect(result.current.data).toEqual(mockResponse.results);
    expect(result.current.totalPages).toBe(2); // 20 results / 10 per page
  });

  it("should update the page and fetch new data when setPage is called", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setPage(2);
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(2);
    });

    expect(fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/?page=2`);
  });

  it("should handle search queries and reset the page to 1", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchQuery("Luke");
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse.results);
    });

    expect(fetch).toHaveBeenCalledWith(
      `${SWAPI_BASE_URL}/people/?page=1&search=Luke`,
    );
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(2);
  });

  it("should handle empty search query by resetting to default", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchQuery("Luke");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchQuery("");
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(1);
    });

    expect(fetch).toHaveBeenCalledWith(`${SWAPI_BASE_URL}/people/?page=1`);
  });

  it("should handle errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.error).toBe("Network error");
    });

    expect(result.current.loading).toBe(false);
  });

  it("should handle invalid responses gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch data");
    });

    expect(result.current.loading).toBe(false);
  });

  it("should handle trimming of search queries", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => usePagination("people"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setSearchQuery("   Luke   ");
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      `${SWAPI_BASE_URL}/people/?page=1&search=Luke`,
    );
  });
});
