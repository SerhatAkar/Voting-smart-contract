import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import  VotingContract from '../artifacts/contracts/VotingContract.sol/VotingContract.json';
import {useContractCall, useContractFunction, useSendTransaction} from "@usedapp/core";


const votingInterface = new utils.Interface(VotingContract.abi);
const votingContractAddress = '0x6b817AB86198CA5631a61c8060B723CDBF040a3E';
const contract = new Contract(votingContractAddress, votingInterface);

export interface Vote{
    name: string,
    description: string,
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

export function CreateVote(voteProposal : Vote){
    const { state, send } = useContractFunction(contract, 'vote')
    return send(voteProposal);
}