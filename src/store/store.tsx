import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import scoreReducer from "./reducer/scoreReducer";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        score:scoreReducer
    }
})