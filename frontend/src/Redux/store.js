import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import blogSlice from "./Slices/blogSlice";

const store = configureStore({
    reducer : {
        user : UserSlice,
        blog : blogSlice
    }
})

export default store