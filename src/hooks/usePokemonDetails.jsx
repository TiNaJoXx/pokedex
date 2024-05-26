import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2';

export const usePokemonDetails = (pokemonList) => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ hasError: false });

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const responses = await Promise.all(
                    pokemonList.map(pokemon => axios.get(pokemon.url))
                );
                setDetails(responses.map(response => response.data));
            } catch (error) {
                setError({ hasError: true, message: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [pokemonList]);

    return { details, loading, error };
};
