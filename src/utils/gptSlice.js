import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSlice",
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
        toggleGPTSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovieResult: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        }
    }
})

export const {toggleGPTSearchView, addGptMovieResult} = gptSlice.actions;
export default gptSlice.reducer;
