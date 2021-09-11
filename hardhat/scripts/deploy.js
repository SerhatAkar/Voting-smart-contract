const hre = require("hardhat");
const {createBytes} = require("../../Scripts/createBytes");


async function main() {

    const names = await createBytes("SerhatAkar");
    console.log(names);
    const Voting = await hre.ethers.getContractFactory("VotingContract");
    const VotingContract = await Voting.deploy();
    await VotingContract.deployed();

    console.log("Voting contract deployed at :", VotingContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
