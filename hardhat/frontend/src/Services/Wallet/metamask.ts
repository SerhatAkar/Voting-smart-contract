import Web3 from "web3";
import ethereum, { EthereumProvider } from "./ethereum";
import * as session from "../Session/session";
declare const window: any;
const mmweb3 = new Web3(ethereum as EthereumProvider);

export const getWeb3 = (): Web3 => {
    if (!isInstalled()) throw new Error("Metamask not installed");
    return mmweb3;
};

export const isInstalled = (): boolean => {
    return Boolean(ethereum?.isMetaMask);
};

export const getWalletAddress = async (): Promise<any> => {
    const response = await ethereum?.request({ method: "eth_requestAccounts" });
    if (!response) throw new Error("Metamask not installed");
    return response.result ? response.result[0] : response[0];
};
export  const  disconnect = async() => {
    await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
            {
                eth_accounts: {}
            }
        ]
    }
    );
};