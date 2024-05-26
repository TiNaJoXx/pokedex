import React, { useState } from 'react'
import { useAxios } from '../hooks/useAxios';
import { StatIcon } from '../assets/icons/Icon';

const InfoCard = ({ response }) => {
    const { response: decrip, error, loading } = useAxios({ 
        method: 'GET',
        url: `/pokemon-species/${response?.id}`
    });

    return (
        <div className='bg-white/[.8] rounded-lg shadow-xl h-full flex-grow basis-0 py-5 px-8'>
            <div className='text-sm'>
                <p className='text-base pb-3'>Description</p>
                <p className='px-4'>
                    {
                        decrip?.flavor_text_entries.filter(text => (
                            text.language.name === 'en'
                        ))[0].flavor_text
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
            </div>
        </div>
    )
}

export default InfoCard