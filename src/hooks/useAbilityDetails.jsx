import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAbilityDetails = (abilityUrls) => {
    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const results = await Promise.all(
                    abilityUrls.map(url => axios.get(url))
                );
                setAbilities(results.map(result => result.data));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (abilityUrls.length > 0) {
            fetchAbilities();
        }
    }, [abilityUrls]);

    return { abilities, loading, error };
};
