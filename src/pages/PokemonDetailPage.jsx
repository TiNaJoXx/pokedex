import React from 'react'
import { useParams } from 'react-router-dom';

const PokemonDetailPage = () => {
    let { pokemonId } = useParams();
    
    return (
        <div>PokemonDetailPage</div>
    )
}

export default PokemonDetailPage