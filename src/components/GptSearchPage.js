import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG } from '../utils/constants';


const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
            <img src={BG}
            alt='background'/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
    </div>
  )
}

export default GptSearch