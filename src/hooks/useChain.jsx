import { useState, useEffect } from 'react';
import axios from 'axios';

export const useChain = (chainUrls) => {
    const [chain, setChain] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const results = await Promise.all(
                    chainUrls.map(url => axios.get(url))
                );
                setChain(results.map(result => result.data));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (chainUrls.length > 0) {
            fetchAbilities();
        }
    }, [chainUrls]);

    return { chain, loading, error };
};
