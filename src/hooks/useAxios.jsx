import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2';

export const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState({hasError: false});
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
      try {
        const result = await axios.request(params);
        setResponse(result.data);
      } catch( error ) {
         setError({hasError: true, message: error.message});
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []);
    
    return { response, error, loading };
};
