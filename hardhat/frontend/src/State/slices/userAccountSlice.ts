import {createSlice} from "@reduxjs/toolkit";

export const userAccountSlice = createSlice({
    name:"userAccountSlice",
    initialState:{
        blockchainID : "",
        signedIn :false,
        userAccount: [],
    },
    reducers:{
        signIn: (state, action) => {
            state.signedIn = true;
            state.userAccount = action.payload
        },
        signOut: (state) => {
            state.signedIn = false;
            state.userAccount = [];
        }
    },
})

export const {signIn, signOut} = userAccountSlice.actions;

export default userAccountSlice.reducer;