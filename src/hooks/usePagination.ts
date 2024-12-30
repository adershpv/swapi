import { SWAPI_BASE_URL } from "@/app/constants";
import { useState, useEffect, useCallback } from "react";

export const usePagination = <T>(resource: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState<string | null>(null);

  const fetchPageData = useCallback(
    async (page: number, searchQuery: string | null) => {
      try {
        setLoading(true);

        // Construct query string
        const params = new URLSearchParams({ page: page.toString() });
        if (searchQuery) params.append("search", searchQuery);

        const response = await fetch(
          `${SWAPI_BASE_URL}/${resource}/?${params.toString()}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.results); // `results` contains the data for the current page
        setTotalPages(Math.ceil(result.count / 10)); // Calculate total pages based on `count` and page size
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [resource],
  );

  useEffect(() => {
    fetchPageData(currentPage, search);
  }, [currentPage, search, fetchPageData]);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const setSearchQuery = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      if (search !== null) {
        setSearch(null); // Reset search to default
        setCurrentPage(1); // Reset to the first page
      }
    } else if (trimmedQuery !== search) {
      setSearch(trimmedQuery);
      setCurrentPage(1); // Reset to the first page for a new search query
    }
  };

  return {
    data,
    loading,
    error,
    setPage,
    setSearchQuery,
    totalPages,
    currentPage,
  };
};
