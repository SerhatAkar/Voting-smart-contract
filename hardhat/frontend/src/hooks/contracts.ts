import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import  VotingContract from '../artifacts/contracts/VotingContract.sol/VotingContract.json';
import {useContractCall, useContractFunction, useSendTransaction} from "@usedapp/core";


const votingInterface = new utils.Interface(VotingContract.abi);
const votingContractAddress = '0x9c515A1f6A168896eF40876Be232A1305a83cFc2';
const contract = new Contract(votingContractAddress, votingInterface);

export interface Vote{
    _name: string,
    _description: string,
}
export function GetContractOwnerAddress(){
  const contractAddress = useContractCall({
      abi: votingInterface,
      address: votingContractAddress,
      method: "contractOwner",
      args: [],
  });
  return contractAddress;
}
export function useContractMethod(methodName: string) {
    const {state, send} = useContractFunction(contract, methodName, {});
    return {state, send};
}

export const  CreateVote = () => {
  return useContractFunction(contract, 'createProposal')
};