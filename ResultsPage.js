import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddressVoting2 = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";
const Voting2Abi = 
[
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidateNames",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "candidateIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newVoteCount",
        "type": "uint256"
      }
    ],
    "name": "NewVote",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_caller",
        "type": "address"
      }
    ],
    "name": "authorizeCaller",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "authorizedCallers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting2.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "increaseVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_caller",
        "type": "address"
      }
    ],
    "name": "removeAuthorization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
    ;

function ResultsPage() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractVoting2 = new ethers.Contract(
        contractAddressVoting2,
        Voting2Abi,
        signer
      );
      console.log(await contractVoting2.functions);

      const candidatesData = await contractVoting2.getVotes();
      const formattedCandidates = candidatesData.map(candidate => ({
        name: candidate.name,
        voteCount: candidate.voteCount.toString() // Convert BigNumber to string
      }));
      setCandidates(formattedCandidates);
    };

    init();
  }, []);

  return (
    <div className="results-container">
      <h1>Voting Results</h1>
      {candidates.map((candidate, index) => (
        <div key={index} className="candidate">
          <h3>{candidate.name}</h3>
          <p>Votes: {candidate.voteCount}</p>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;
