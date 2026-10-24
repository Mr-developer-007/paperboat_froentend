import { configureStore } from "@reduxjs/toolkit";
import year  from "./yearSlice"
import state from "./stateSlice"
import exam from "./examSlice"

const store = configureStore({
    reducer:{
year,state,exam
    }
})

export default store