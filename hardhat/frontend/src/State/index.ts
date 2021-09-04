import {configureStore} from '@reduxjs/toolkit'
import appStateReducer from './reducer'
import {updateVersion} from "./action";
import {userAccountSlice} from "./slices/userAccountSlice";

export default configureStore({
    reducer: {
        accountSlice: userAccountSlice.reducer,
    }
})


