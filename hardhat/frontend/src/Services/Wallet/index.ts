import * as metamask from "./metamask";

const metamaskWallet = {
    icon:
        "https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png",
    login: async () => {
        if (!metamask.isInstalled()) throw new Error("Metamask not installed");
        return metamask.getWalletAddress();
    },
    logout: () => {
        return metamask.disconnect();
    },
    reload: () => {
        return;
    },
    getAddress: async () => {
        return metamask.getWalletAddress();
    },
    getWeb3: () => {
        return metamask.getWeb3();
    },
};

export default metamaskWallet;
