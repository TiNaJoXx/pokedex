import React from 'react'
import './App.css'
import {
  Routes,
  Route
} from 'react-router-dom'
import PokemonListPage from './pages/PokemonListPage'
import PokemonDetailPage from './pages/PokemonDetailPage'

function App() {
  return (
    <div className='flex justify-start lg:justify-center items-center h-none lg:h-screen flex-col lg:flex-row py-2'>
      <div className='flex items-center justify-start lg:justify-center lg:items-start w-11/12 lg:h-[36rem] h-12 lg:w-16 bg-[#C51010] rounded-tr-full rounded-tl-full lg:rounded-tr-none lg:rounded-tl-full lg:rounded-bl-full'>
        <div className='relative w-8 lg:w-12 h-8 lg:h-12 bg-white ml-10 lg:ml-0 mt-0 lg:mt-10 rounded-full'>
          <div className='absolute top-1 bottom-1 right-1 left-1 bg-[#13E8E8] rounded-full'>
            <div className='relative w-full h-full animate-oval p-1'>
              <div className='w-2 h-2 lg:w-3 lg:h-3 bg-[#ffffff80] rounded-full rotate-45'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-11/12 lg:h-[36rem] h-2 lg:w-2 lg:w-2 bg-[#4C0505]'>
      </div>
      <div className='h-[36rem] w-11/12 lg:w-8/12 bg-[#990E0E] flex justify-center items-center relative'>
        <div className='bg-[#353030] rounded-2xl w-auto absolute top-5 bottom-5 right-5 left-5'>
          <div className='w-full h-full relative'>
            <div className='absolute top-1 bottom-1 right-1 left-1 bg-white rounded-2xl screen overflow-auto p-4 scroll-smooth' style={{scrollbarWidth: 'none'}}>
              <Routes>
                <Route path="/" element={<PokemonListPage />} />
                <Route path="pokemon/:pokemonId" element={<PokemonDetailPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <div className='h-2 lg:h-[36rem] w-11/12 lg:w-2 bg-[#4C0505]'>
      </div>
      <div className='w-11/12 lg:h-[36rem] h-12 lg:w-16 bg-[#C51010] rounded-br-full rounded-bl-full lg:rounded-bl-none lg:rounded-tr-full lg:rounded-br-full'>
      </div>
    </div>
  )
}

export default App
