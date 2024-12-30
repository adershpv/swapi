import { useEffect, useState } from "react";
import { fetchAllItems } from "@/utilities/fetchAllItems";
import { PlanetType } from "@/types/characters";

export function useFetchPlanets() {
  const [planetsObject, setPlanetsObject] = useState<
    Record<string, PlanetType>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return { planetsObject, loading, error };
}
