import React from 'react'
import { Bars } from 'react-loader-spinner';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemonList }) => {
    const { details, loading, error } = usePokemonDetails(pokemonList);
    
    if (loading) {
        return (
            <div className='flex justify-center items-center h-full'>
                <Bars
                    height="80"
                    width="80"
                    color="#990E0E"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    if (error.hasError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 w-full gap-5'>
            {
                details.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))
            }
        </div>
    )
}

export default PokemonList