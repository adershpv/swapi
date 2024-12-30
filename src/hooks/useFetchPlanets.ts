import { useEffect, useState } from "react";
import { fetchAllItems } from "@/utilities/fetchAllItems";
import { PlanetType } from "@/types/characters";

export function useFetchPlanets() {
  const [planetsObject, setPlanetsObject] = useState<
    Record<string, PlanetType>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      try {
        const planets = await fetchAllItems<PlanetType>("planets");
        const planetsMap = planets.reduce<Record<string, PlanetType>>(
          (acc, planet) => {
            acc[planet.url] = planet;
            return acc;
          },
          {},
        );
        setPlanetsObject(planetsMap);
      } catch (err) {
        console.error("Error fetching planets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return { planetsObject, loading };
}
