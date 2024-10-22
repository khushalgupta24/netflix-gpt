import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movie)
  return (
    movies && (
    <div className=' bg-black'>
      <div className='-mt-56 relative z-1 pl-6'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Upcoming"} movies={movies.upcomingMovies}/>
      </div>
    </div>)
  )
}

export default SecondaryContainer