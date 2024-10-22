import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
    name: 'language',
    initialState: {
        selectedLanguage: 'en'
    },
    reducers: {
        setSelectedLanguage: (state, action) => {
            state.selectedLanguage = action.payload
        }
    }
})

export default langSlice.reducer;

export const {setSelectedLanguage} = langSlice.actions;