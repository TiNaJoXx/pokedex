import React from 'react'
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import PokemonCard from './PokemonCard';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';

const PokemonList = ({ pokemonList }) => {
    const { details, loading, error } = usePokemonDetails(pokemonList);
    
    if (loading) {
        return (
            <div className='grid grid-cols-1 lg:grid-cols-3 w-full gap-5'>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    if (error.hasError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 w-full gap-5 pb-2'>
            {
                details.map((pokemon, index) => (
                    <Link to={`/pokemon/${pokemon.id}`} >
                        <PokemonCard key={index} pokemon={pokemon} />
                    </Link>
                ))
            }
        </div>
    )
}

export default PokemonList