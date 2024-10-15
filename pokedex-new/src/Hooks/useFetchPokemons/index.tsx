import { useEffect, useState } from "react";
import api from "../../services/api";

interface Pokemon {
  name: string;
  url: string;
}

interface FetchPokemonsResult {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

const useFetchPokemons = (
  limit: number,
  offset: number
): FetchPokemonsResult => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(
          `/pokemon?limit=${limit}&offset=${offset}`
        );
        setPokemons(response.data.results);
      } catch (err) {
        setError("Failed to fetch pokemons");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  return { pokemons, isLoading, error };
};

export default useFetchPokemons;
