import React, { useState, useEffect } from 'react'
import { useAxios } from '../hooks/useAxios';
import { StatIcon } from '../assets/icons/Icon';
import { RotatingLines } from 'react-loader-spinner';
import { useChain } from '../hooks/useChain'
import { usePokemonDetails } from '../hooks/usePokemonDetails';

const InfoCard = ({ response }) => {
    const [chainUrl, setChainUrl] = useState([]);
    const [evolvesTo, setEvolvesTo] = useState([]);

    const { response: decrip, error, loading } = useAxios({ 
        method: 'GET',
        url: `/pokemon-species/${response?.id}`
    });

    useEffect(() => {
        if (decrip && decrip.evolution_chain) {
            setChainUrl([decrip.evolution_chain.url]);
        }
    }, [decrip]);

    const { chain, error: errorChain, loading: loadingChain } = useChain(chainUrl);

    useEffect(() => {
        if (chain.length > 0 && chain[0].chain) {
            const evoLine1 = chain[0].chain
            var line = [{'url': '/pokemon/' + evoLine1.species.name}]
            if (evoLine1.evolves_to.length > 0) {
                const evoLine2 = evoLine1.evolves_to[0]
                line = [...line, {'url': '/pokemon/' + evoLine2.species.name}]
                if (evoLine2.evolves_to.length > 0) {
                    const evoLine3 = evoLine2.evolves_to[0]
                    line = [...line, {'url': '/pokemon/' + evoLine3.species.name}]
                }
            }
            setEvolvesTo(line);
        }
    }, [chain]);

    const { details, error: errorDetail, loading: loadingDetail } = usePokemonDetails(evolvesTo);

    return (
        <div className='bg-white/[.8] rounded-lg shadow-xl h-full flex-grow basis-0 py-5 px-8'>
            <div className='text-sm'>
                <p className='text-base pb-3'>Description</p>
                <p className='px-4'>
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
                        ) : error.hasError ? (
                            'Error...'
                        ) : (
                            decrip?.flavor_text_entries.filter(text => (
                                text.language.name === 'en'
                            ))[0].flavor_text
                        )
                    }
                </p>
            </div>
            <div className='my-6'>
                <p className='text-base pb-3'>Stats</p>
                <div className='grid grid-cols-3 gap-2 lg:gap-0 lg:flex lg:justify-between lg:items-center px-4'>
                    { 
                        response?.stats.map((stat, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <div className='w-5 h-5'>
                                    { StatIcon[stat.stat.name] }
                                </div>
                                { stat.base_stat }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='my-6'>
                <p className='text-base pb-3'>Sound</p>
                <audio controls src={response?.cries.legacy} className='w-full'></audio>
            </div>
            <div className='my-6'>
                <p className='text-base pb-3'>Evolution</p>
                <div className='flex justify-center items-center gap-2 lg:gap-20'>
                    {
                        loadingChain || loadingDetail ? ( 
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
                        errorChain || errorDetail.hasError ? ('Error... ') : 
                        details.map((pkm, index) => (
                            <div key={index} className='relative w-20 h-20 lg:w-28 lg:h-28 bg-gray-200 rounded-full flex justify-center items-center'>
                                <img 
                                    src={pkm.sprites.other["official-artwork"].front_default} 
                                    alt={pkm.name}
                                    className='drop-shadow-lg'
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default InfoCard