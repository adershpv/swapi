import { SWAPI_BASE_URL } from "@/app/constants";

// Updated fetchAllItems function to handle paginated results from the API
export const fetchAllItems = async <T>(entity: string): Promise<T[]> => {
  let items: T[] = [];
  let nextUrl = `${SWAPI_BASE_URL}/${entity}/`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();

    items = items.concat(data.results); // `results` contains the list of items
    nextUrl = data.next; // `next` is the URL for the next page of results, or null if no more pages
  }

  return items;
};
