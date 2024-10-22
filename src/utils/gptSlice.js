import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSlice",
    initialState: {
        showGptSearch: false,
    },
    reducers: {
        toggleGPTSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch
        }
    }
})

export const {toggleGPTSearchView} = gptSlice.actions;
export default gptSlice.reducer;
