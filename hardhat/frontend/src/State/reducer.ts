import { Web3Provider } from '@ethersproject/providers'
import {createReducer} from "@reduxjs/toolkit";
import {updateWeb3Provider} from "./action";

export interface AppState {
    readonly web3provider: Web3Provider
}

const initialState: AppState = {
    web3provider: {} as any
}

export default createReducer<AppState>(initialState, builder =>{
    builder.addCase(updateWeb3Provider, (state, action) => {
        state.web3provider = action.payload.web3ProviderUpdate
    })
})