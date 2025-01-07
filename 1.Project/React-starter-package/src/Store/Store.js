import { configureStore } from "@reduxjs/toolkit";
import words from "./Slice/WordSlice.js"



const store = configureStore({
    reducer:{
          words
    }
})


export default store