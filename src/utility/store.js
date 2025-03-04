import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice"
import cartSlice from "./cartSlice"
import filterSlice from "./filterSlice"
import authSlice from "./authSlice"






const store = configureStore({
    reducer : {
        // 1 and 2 way both are same
        toggleSlice : toggleSlice,
        cartSlice,
        filterSlice : filterSlice,
        authSlice: authSlice
    }
})

export default store;