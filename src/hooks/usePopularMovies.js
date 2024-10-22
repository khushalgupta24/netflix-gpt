import { useDispatch, useSelector } from "react-redux";
import {addPopularMovies} from "../utils/movieSlice";
import { API_OPTIONS, API_KEY } from "../utils/constants";
import { useEffect } from "react";

const usePopularMovies = () => {

  const popuplarMovies = useSelector(store => store.movie.popuplarMovies);
    const dispatch = useDispatch()
  useEffect(()=>{
    !popuplarMovies && getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`, API_OPTIONS);
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  }
}

export default usePopularMovies