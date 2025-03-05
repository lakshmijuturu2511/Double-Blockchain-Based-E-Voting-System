import { ethers } from "hardhat";

describe("Voting System", function () {
  it("Should allow voting in Voting1 and update Voting2", async function () {
    const Voting2 = await ethers.getContractFactory("Voting2");
    const Voting1 = await ethers.getContractFactory("Voting1");

    const voting2 = await Voting2.deploy(["Alice", "Bob"]);
    await voting2.deployed();

    const voting1 = await Voting1.deploy(["Alice", "Bob"], voting2.address);
    await voting1.deployed();

    await voting1.vote(0);  // Vote for Alice

    const candidatesVoting1 = await voting1.getCandidates();
    const candidatesVoting2 = await voting2.getVotes();

    expect(candidatesVoting1[0].voteCount).toBe(1);
    expect(candidatesVoting2[0].voteCount).toBe(1);
  });

  it("Should prevent double voting in Voting1", async function () {
    const Voting2 = await ethers.getContractFactory("Voting2");
    const Voting1 = await ethers.getContractFactory("Voting1");

    const voting2 = await Voting2.deploy(["Alice", "Bob"]);
    await voting2.deployed();

    const voting1 = await Voting1.deploy(["Alice", "Bob"], voting2.address);
    await voting1.deployed();

    await voting1.vote(0);  // Vote for Alice

    // Check for reversion when trying to vote again
    await expect(voting1.vote(0)).rejects.toThrow("You have already voted");
  });

  it("Should revert for invalid candidate index", async function () {
    const Voting2 = await ethers.getContractFactory("Voting2");
    const Voting1 = await ethers.getContractFactory("Voting1");

    const voting2 = await Voting2.deploy(["Alice", "Bob"]);
    await voting2.deployed();

    const voting1 = await Voting1.deploy(["Alice", "Bob"], voting2.address);
    await voting1.deployed();

    // Check for invalid candidate index
    await expect(voting1.vote(999)).rejects.toThrow("Invalid candidate index");
  });
});
