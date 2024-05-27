import React, { useState, useEffect } from 'react'
import { TypeIcons } from '../assets/icons/Icon';
import { useAbilityDetails } from '../hooks/useAbilityDetails';
import { RotatingLines } from 'react-loader-spinner';

const BusinessCard = ({ response }) => {
    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState(0);

    const handleAbilityClick = (event) => {
        setSelectedAbility(event)
    }
    
    useEffect(() => {
        if (response && response.abilities) {
            setAbilities(response.abilities.map(ability => ability.ability.url));
        }
    }, [response]);

    const { abilities: detail, error, loading } = useAbilityDetails(abilities);

    return (
        <div className='bg-white/[.8] rounded-lg shadow-xl flex flex-col gap-2 items-center w-full pb-3 lg:h-full lg:w-1/3 lg:pb-0'>
            <div className='w-full py-5 flex flex-row justify-center items-center gap-10 lg:flex-col lg:gap-0'>
                <img 
                    src={response.sprites.other["official-artwork"].front_default} 
                    alt={response.name}
                    className='drop-shadow-lg w-24 lg:w-44'
                />
                <div>
                    <p className='text-xs text-center'>#{response.id}</p>
                    <p className='text-lg capitalize text-center'>{response.name}</p>
                </div>
            </div>
            <div className='flex w-full px-4 text-sm'>
                <div className=' flex-grow basis-0'>
                    <p className='text-left'>Types:</p>
                </div>
                <div>
                    {response.types.map((type, index) => (
                        <div key={index} className='flex justify-start items-center gap-2'>
                            <div className='w-4'>{TypeIcons[type.type.name]}</div>
                            <div>{type.type.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex w-full px-4 text-sm'>
                <div className=' flex-grow basis-0'>
                    <p className='text-left'>Base experience:</p>
                </div>
                <div>{response.base_experience} pts</div>
            </div>
            <div className='flex w-full px-4 text-sm'>
                <div className=' flex-grow basis-0'>
                    <p className='text-left'>Weight:</p>
                </div>
                <div>{response.weight / 10} kg</div>
            </div>
            <div className='flex w-full px-4 text-sm'>
                <div className=' flex-grow basis-0'>
                    <p className='text-left'>Height:</p>
                </div>
                <div>{response.height / 10} m</div>
            </div>
            <div className='w-full px-4 text-sm'>
                <div className=' flex-grow basis-0'>
                    <p className='text-left'>Abilities:</p>
                </div>
                <div className='flex gap-2 text-xs justify-end'>
                    {response.abilities.map((ability, index) => (
                        <div 
                            key={index} 
                            className={`cursor-pointer ${selectedAbility === index ? 'border-b-2 border-[#990E0E]' : ''}`}
                            onClick={() => handleAbilityClick(index)}
                        >
                            {ability.ability.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className='px-4'>
                {
                    loading ? (
                        <RotatingLines
                            visible={true}
                            height="30"
                            width="30"
                            strokeWidth="3"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    ) :
                    error ? ( 'Error...') 
                    : (
                        <p className='text-xs text-wrap'>
                            {
                                detail[selectedAbility].flavor_text_entries.filter(text => (
                                    text.version_group.name === 'scarlet-violet' && text.language.name === 'en'
                                ))[0]?.flavor_text
                            }
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default BusinessCard