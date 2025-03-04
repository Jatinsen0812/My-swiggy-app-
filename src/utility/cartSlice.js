import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";




const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
        resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
    },
    reducers:{
        addToCart: (state, action) => {
             // console.log();
             const  {info, resInfo} = action.payload
             // setCartData((prev) => [...prev , info])
             state.cartItems = [...state.cartItems , info]
             state.resInfo = resInfo
             localStorage.setItem("cartData" , JSON.stringify(state.cartItems))
             localStorage.setItem("resInfo" , JSON.stringify(resInfo));

        },

        deleteItem: (state, action) => {
            state.cartItems = action.payload
            localStorage.setItem("cartData" , JSON.stringify(action.payload));
        },

        clearCartItem: (state) => {
            state.cartItems = [];
            state.resInfo = []
            localStorage.removeItem("cartData");
            localStorage.removeItem("resInfo");

        }
    }
})


export const {addToCart, deleteItem, clearCartItem} = cartSlice.actions;
export default cartSlice.reducer;