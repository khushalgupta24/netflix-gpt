import { useDispatch } from "react-redux";
import {addUpcomingMovies} from "../utils/movieSlice";
import { API_OPTIONS, API_KEY } from "../utils/constants";
import { useEffect } from "react";

const useUpcomingMovies = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    getUpcomingMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`, API_OPTIONS);
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  }
}

export default useUpcomingMovies;