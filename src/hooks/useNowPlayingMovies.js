import { useDispatch, useSelector } from "react-redux";
import {addNowPlayingMovies} from "../utils/movieSlice";
import { API_OPTIONS, API_KEY } from "../utils/constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const nowPlayingMovies = useSelector(store => store.movie.nowPlayingMovies);
  useEffect(()=>{
    !nowPlayingMovies &&
    getNowPlayingMovies();
  }, []);

  const getNowPlayingMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`, API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }
}

export default useNowPlayingMovies