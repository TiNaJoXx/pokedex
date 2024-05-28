import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState({hasError: false});
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false); // Use ref to track if the request has already been made

    const fetchData = async (params) => {
        try {
            const result = await axios.request(params);
            setResponse(result.data);
        } catch (error) {
            setError({hasError: true, message: error.message});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) { // Check if the request has already been made
            fetchData(axiosParams);
            hasFetched.current = true; // Mark as fetched
        }
    }, [axiosParams]); // Ensure axiosParams is included in the dependency array
    
    return { response, error, loading };
};
