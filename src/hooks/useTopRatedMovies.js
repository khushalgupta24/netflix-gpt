import { useDispatch } from "react-redux";
import {addTopRatedMovies} from "../utils/movieSlice";
import { API_OPTIONS, API_KEY } from "../utils/constants";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    getTopRatedMovies();
  }, []);

  const getTopRatedMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`, API_OPTIONS);
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  }
}

export default useTopRatedMovies