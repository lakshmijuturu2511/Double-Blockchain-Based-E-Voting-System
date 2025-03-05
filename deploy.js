const { ethers } = require("hardhat");
require("dotenv").config();

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  try {
    // Deploy Voting2 contract first
    const Voting2 = await ethers.getContractFactory("Voting2");
    const voting2 = await Voting2.deploy(["Akshaya", "Lakshmi", "Girish", "Nikhil"]);
    await voting2.deployed();
    console.log("Voting2 Contract Address:", voting2.address);

    // Deploy Voting1 contract second
    const Voting1 = await ethers.getContractFactory("Voting1");
    const voting1 = await Voting1.deploy(["Akshaya", "Lakshmi", "Girish", "Nikhil"],voting2.address);
    await voting1.deployed();
    console.log("Voting1 Contract Address:", voting1.address);

    // Authorize Voting1 to call increaseVote in Voting2
    console.log("Authorizing Voting1 to call increaseVote in Voting2...");
    const tx = await voting2.authorizeCaller(voting1.address); 
    await tx.wait();
    console.log(`Voting1 contract (${voting1.address}) authorized to call increaseVote in Voting2`);

    // Optionally, you can also print the current authorized callers
    const isAuthorized = await voting2.authorizedCallers(voting1.address);
    console.log(`Is Voting1 authorized? ${isAuthorized}`);

  } catch (error) {
    console.error("Error during contract deployment:", error);
    process.exit(1);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });