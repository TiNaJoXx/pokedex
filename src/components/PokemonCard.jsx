import React from 'react'
import { TypeIcons } from '../assets/icons/Icon'

const PokemonCard = ({ pokemon }) =>{
  return (
    <div className='flex bg-white/[.8] rounded shadow-xl px-3 gap-4 cursor-pointer'>
        <div className='w-24 flex items-center'>
            <img 
                src={pokemon.sprites?.other["official-artwork"].front_default} 
                alt={pokemon.name}
                className='drop-shadow-lg'
            />
        </div>
        <div className='flex flex-col justify-center flex-grow basis-0 text-center gap-2'>
            <p className='text-xs text-left'>#{pokemon.id}</p>
            <p className='text-base text-left capitalize'>{pokemon.name}</p>
            <div className='flex gap-2'>
                {
                    pokemon.types.map((type, index) => (
                        <div key={index} className='w-4'>
                            { TypeIcons[type.type.name] }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default PokemonCard