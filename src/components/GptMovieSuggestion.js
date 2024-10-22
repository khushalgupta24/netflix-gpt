import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestion = () => {
    const {movieResults, movieNames} = useSelector(store => store.gpt);

    if(!movieNames) return null;
  return (
    <div className='m-4 p-4 bg-black text-white bg-opacity-60'>
    <div>{
        movieNames.map((movie,idx) => <MovieList key={movie} title={movie} movies={movieResults[idx]}  />)
    }</div>
    </div>
  )
}

export default GptMovieSuggestion