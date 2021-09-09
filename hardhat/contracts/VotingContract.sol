// SPDX-License-Identifier: GPL-3.0
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity >=0.7.0 <0.9.0;

// Use onlyOwner for chairperson

contract VotingContract is Ownable {

    address public contractOwner;

    Proposal[] public proposals;

    struct Voter {

        bool dailyVote;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        //        string id;
        address ProposalOwner;
        string name;
        string description;
        uint voteCount;
        uint endTime;
        //        uint endTime; // set the end time by the chairperson
    }

    uint proposalsLength;

    mapping(address => Voter) public voter;
    mapping(Voter => proposals[]) public voterToProposals;


    // Check 3 conditions . TODO => improve dailyVote
    modifier canVote(Proposal _proposal, address _voterAddress) {
        require(checkIfVoterHasVoted(_voterAddress));
        require(voter[_voterAddress].dailyVote <= 2);
        require(_proposal.endTime > now);
        _;
    }

    function getProposalLeftTime(Proposal _proposal) external view returns(uint timeLeft) {
        return proposals[_proposal].endTime;
    }
    // Check if the voter has already voted for a specific proposal.
    function checkIfVoterHasVoted(address _voter) internal returns (bool result) {
        Voter storage voter = voters[_voter];
        for (uint i; i < voterToProposals[voter].length; i++) {
            if (voterToProposals[voter].Proposal[i] == _proposal) {
                return !result;
            }
        }
    }

    // Define the owner of the smart-contract.
    constructor(bytes32[] memory proposalNames){
        contractOwner = msg.sender;
        voters[contractOwner].weight = 1;
    }

    event ProposalCreated(Proposal _proposal);

    function createProposal(string memory _name, string memory _description, uint endTime, address _chairperson) external {
        Proposal newProposal = new Proposal(_chairperson, _name, _description, 0, endTime);
        proposals.push(newProposal);
        emit ProposalCreated(newProposal);
    }

    function vote(uint proposal) public canVote(msg.sender){
        Voter storage sender = voters[msg.sender];
        voterToProposals[sender].push(proposal);
        //emit users information (vote list).
        proposals[proposal].voteCount += 1;
        sender.vote--;
    }

}
