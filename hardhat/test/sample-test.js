const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Voting", function () {
    it("Should deploy the contract with valid args ", async function () {
        const Voting = await ethers.getContractFactory("VotingContract");
        const VotingContract = await Voting.deploy(["0x5300000000000000000000000000000000000000000000000000000000000000"]);
        await VotingContract.deployed();

        expect(await VotingContract.getProposals()).to.equal("0x5300000000000000000000000000000000000000000000000000000000000000");

    });
});
