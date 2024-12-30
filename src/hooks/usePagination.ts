import { SWAPI_BASE_URL } from "@/app/constants";
import { useState, useEffect } from "react";

export const usePagination = <T>(resource: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPageData = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${SWAPI_BASE_URL}/${resource}/?page=${page}`,
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
    fetchPageData(currentPage);
  }, [currentPage]);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    loading,
    error,
    setPage,
    totalPages,
    currentPage,
  };
};
