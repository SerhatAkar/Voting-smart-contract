import {createAction} from "@reduxjs/toolkit";
import {Web3Provider} from "@ethersproject/providers";


export const updateWeb3Provider = createAction< {web3ProviderUpdate: Web3Provider}>('updateWeb3Provider')
export const updateVersion = createAction<void>('global/updateVersion')