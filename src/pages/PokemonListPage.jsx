import React, { useState } from 'react'
import { useAxios } from '../hooks/useAxios';
import { Bars } from 'react-loader-spinner';
import Searcher from '../components/Searcher';
import MG from '../components/MG';
import PokemonList from '../components/PokemonList';

const PokemonListPage = () => {
    const { response, error, loading } = useAxios({ 
        method: 'GET',
        url: '/pokemon?limit=151' 
    });
    const [searchText, setSearchText] = useState("");
    const onSearchTextChange = ((e) => {
        setSearchText(e.target.value.toLowerCase());
    });

    if (loading) {
        return (
          <div className='flex justify-center items-center h-full w-full'>
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
        <div className='h-full'>
            <div className='pb-5 flex justify-end gap-3'>
                <Searcher searchText={searchText} onSearchTextChange={onSearchTextChange} />
                <MG />
            </div>
            <PokemonList pokemonList={
                response.results.filter(item =>
                    item.name.toLowerCase().includes(searchText)
                )}
            />
        </div>
    )
}

export default PokemonListPage