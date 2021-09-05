import {configureStore} from '@reduxjs/toolkit'
import appStateReducer from './reducer'
import {updateVersion} from "./action";
import {userAccountSlice} from "./slices/userAccountSlice";

 const store = configureStore({
    reducer: {
        user: userAccountSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;