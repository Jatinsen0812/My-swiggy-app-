import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const toggleSlice = createSlice({
    name: "toggleSlice",
    initialState: {
        searchBarToggle : false,
        loginToggle : false,
        isDifRes : false,
        similarResDish : {
            isSimilarResDishes : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : ""
        }
    },
    reducers: {
        toggleSearchBar : (state, action) => {
            state.searchBarToggle = !state.searchBarToggle

        },

        toggleLogin: (state, action) => {
            state.loginToggle = !state.loginToggle
        },

        toggleIsDifRes: (state, action) => {
            state.isDifRes = !state.isDifRes
        },


        setSimilarResDish: (state, action) => {
            state.similarResDish = action.payload
        },

        resetSimilarResDish: (state, action) => {
            state.similarResDish = {
                isSimilarResDishes : false,
                city : "",
                resLocation : "",
                resId : "",
                itemId : ""
            }
        },

        

    }

})


export const {toggleSearchBar, toggleLogin, toggleIsDifRes, resetSimilarResDish, setSimilarResDish} = toggleSlice.actions
export default toggleSlice.reducer