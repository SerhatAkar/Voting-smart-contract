import {getDefaultProvider, providers, utils} from 'ethers'
import {Contract} from '@ethersproject/contracts'
import VotingContract from '../artifacts/contracts/VotingContract.sol/VotingContract.json';
import {
    connectContractToSigner, DAppProvider,
    useContractCall,
    useContractFunction,
    useEthers,
    useSendTransaction
} from "@usedapp/core";


export const votingInterface = new utils.Interface(VotingContract.abi);
export const votingContractAddress = '0x8131dc0C5f1DBd36720f6Bd2cD71831c4691f6e3';
export const contract = new Contract(votingContractAddress, votingInterface);

export interface Vote {
    _name: string,
    _description: string,
    _endTime: number,
}

export function GetContractOwnerAddress() {
    const contractAddress = useContractCall({
        abi: votingInterface,
        address: votingContractAddress,
        method: "contractOwner",
        args: [],
    });
    return contractAddress;
}

export const CreateVote = () => {
    return useContractFunction(contract, 'createProposal')
};

export const Vote = () => {
    return useContractFunction(contract, 'vote')
}
export function EventHandler(event: string, callback: any) {
    const {library} = useEthers();
    return !!library && contract.connect(library).on(event, (callback));
}

export function GetProposals() {
    const proposals = useContractCall({
        abi: votingInterface,
        address: votingContractAddress,
        method: "getProposals",
        args: [],
    });
    return proposals;
}
