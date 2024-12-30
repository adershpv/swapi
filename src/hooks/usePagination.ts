import { SWAPI_BASE_URL } from "@/app/constants";
import { useState, useEffect } from "react";

export const usePagination = <T>(resource: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState<string | null>(null); // Track the search query

  const fetchPageData = async (page: number, searchQuery: string | null) => {
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
  };

  useEffect(() => {
    fetchPageData(currentPage, search);
  }, [currentPage, search]);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const setSearchQuery = (query: string) => {
    if (query.trim() === "") {
      setSearch(null); // Reset search to default
      setCurrentPage(1); // Reset to first page
    } else if (query !== search) {
      setSearch(query);
      setCurrentPage(1); // Reset to first page for a new search query
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
