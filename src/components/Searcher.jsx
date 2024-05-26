import React, { useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Searcher = ({ searchText, onSearchTextChange }) => {
    const [inputVisible, setInputVisible] = useState(false);

    const toggleInputVisibility = () => {
        setInputVisible(!inputVisible);
    };

    return (
        <div className="relative flex gap-2">
            <div className='w-10 h-10 rounded-full shadow flex justify-center items-center cursor-pointer bg-white' onClick={toggleInputVisibility}>
                { !inputVisible ? <MagnifyingGlassIcon className='w-5' />
                    : <XMarkIcon className='w-5' />
                }
            </div>
            {inputVisible && (
                <input 
                    type='text' 
                    value={searchText} 
                    onChange={onSearchTextChange} 
                    className="shadow px-3 py-1 rounded" 
                    placeholder='Buscar pokémon...' 
                />
            )}
        </div>
    );
}

export default Searcher