import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_KEY, API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const movieTrailer = useSelector(store => store.movie.trailerVideo)
    
    useEffect(()=>{
        !movieTrailer && getMovieVideos();
    },[])

    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`, API_OPTIONS);
        const json = await data.json();

        const filterData = json.results.filter(video => video.type === 'Trailer');
        const trailer = filterData.length === 0 ? json.results[0] : filterData[0];
        dispatch(addTrailerVideo(trailer));
    }
}

export default useMovieTrailer;