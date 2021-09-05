import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as session from '../../Services/Session/session';

interface UserState {
    id?: string,
    displayId?: string,
}

const initialState: UserState = {
    id: session.hasSession() ? session.loadSession()?.id : undefined,
    displayId: session.hasSession() ? session.loadSession()?.id : undefined,
}
export const userAccountSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<UserState>) => ({
            ...state,
            ...action.payload,
        }),
        logOut: (_state) => ({
            ...initialState
        }),
        setDisplayId: (state, action: PayloadAction<UserState>) => ({
            ...state,
            displayId: action.payload.toString(),
        }),
    },
})

export const {signIn, logOut, setDisplayId} = userAccountSlice.actions;

export default userAccountSlice.reducer;