import { SWAPI_BASE_URL } from "@/app/constants";

export const fetchAllItems = async <T>(entity: string): Promise<T[]> => {
  let items: T[] = [];
  let nextUrl = `${SWAPI_BASE_URL}/${entity}/`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();

    items = items.concat(data.results);
    nextUrl = data.next;
  }

  return items;
};
