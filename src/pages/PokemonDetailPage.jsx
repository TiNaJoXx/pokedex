import React from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import BusinessCard from '../components/BusinessCard';
import InfoCard from '../components/InfoCard';

const PokemonDetailPage = () => {
    let { pokemonId } = useParams();
    const { response, error, loading } = useAxios({ 
        method: 'GET',
        url: `/pokemon/${pokemonId}`
    });

    if (loading) {
        return 'Cargando...';
    }

    if (error.hasError) {
        return 'Error...';
    }

    return (
        <div className='flex gap-4 h-full flex-col lg:flex-row'>
            <BusinessCard response={response} />
            <InfoCard response={response} />
        </div>
    );
};

export default PokemonDetailPage;