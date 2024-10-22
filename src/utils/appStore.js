import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import langReducer from './langSlice';

const appStore =  configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gpt: gptReducer,
        lang: langReducer,
    }
});

export default appStore;