import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_KEY, API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

    const selectedLanguage = useSelector(store => store.lang.selectedLanguage);
    const searchText = useRef(null);

    const dispatch = useDispatch(); 
    //Search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
        const json = await data.json();
        console.log(json.results, 'For each query 5 times');
        return json.results;
    }

    const handleGptSearchClick = async () => {
        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: " + searchText.current.value + ". only give me names of 10 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Maharaja, Golmaal, Koi Mil Gaya, Chaahat, Jaani Dushman, Dostana, Bodyguard"
        let gptMovies;
        try {
            const chatCompletion = await openai.chat.completions.create({
              messages: [{ role: 'user', content: gptQuery }],
              model: 'gpt-3.5-turbo',
            });
        
            // Assuming chatCompletion.choices contains the response
            const movies = chatCompletion.choices[0]?.message?.content || "No movies returned";
            console.log("API Success:", movies);
            gptMovies = movies.split(',');
            
            // You can update the UI here with the movies result
          } catch (error) {
            console.error("API call failed:", error.message);
        
            // Show a dummy response in case of failure
            const dummyMovies = "Gadar, Sholay, Don, Maharaja, Golmaal";
            console.log("Using dummy response:", dummyMovies);
            gptMovies = dummyMovies.split(',');
            // Update the UI with the dummy response
          }

        //   [Gadar, Sholay, Don, Maharaja, Golmaal, Koi Mil Gaya, Chaahat, Jaani Dushman, Dostana, Bodyguard]
        const promiseArray =  gptMovies.map(movie => searchMovieTMDB(movie.trim()))
        // [Promise, Promise, Promise, Promise, Promise]
        const tmdbResults = await Promise.all(promiseArray);

        console.log(tmdbResults, 'ALL Results');
        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
        
    }
  return (
    <div className='pt-[8%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[selectedLanguage].gptSearchPlaceholder}/>
            <button className='py-2 px-4 bg-green-400 text-white rounded-lg col-span-3 m-4' onClick={handleGptSearchClick} >{lang[selectedLanguage].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar