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
export const votingContractAddress = '0x15cC43468aDe20ebD74e1fa5e1EE006aA007E9c9';
export const contract = new Contract(votingContractAddress, votingInterface);

export interface Vote {
    _name: string,
    _description: string,
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
