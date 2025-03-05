import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Contract addresses
const contractAddressVoting1 = "0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D"; // Private
const contractAddressVoting2 = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"; // Public

// Contract ABIs
const Voting1Abi = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidateNames",
        "type": "string[]"
      },
      {
        "internalType": "address",
        "name": "_voting2Address",
        "type": "address"
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
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "CandidateVoted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "VoteCast",
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
    "name": "getCandidates",
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
        "internalType": "struct Voting1.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
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
        "internalType": "uint256",
        "name": "_candidateIndex",
        "type": "uint256"
      }
    ],
    "name": "vote",
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
    "name": "voterVote",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
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
    "name": "voters",
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
    "inputs": [],
    "name": "voting2Instance",
    "outputs": [
      {
        "internalType": "contract IVoting2",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const Voting2Abi =[
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
] ;
console.log('Voting1 contract address:', contractAddressVoting1);
console.log('Voting2 contract address:', contractAddressVoting2);

function VotingPage() {
  const [candidatesVoting2, setCandidatesVoting2] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [voterAddress, setVoterAddress] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [adminAddress, setAdminAddress] = useState(""); // Store admin address to confirm with
  const [voterVote, setVoterVote] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const checkMetaMaskConnection = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts if not already available
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Connected address:", address);
      setIsMetaMaskConnected(true); // MetaMask is connected
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setIsMetaMaskConnected(false); // Connection failed
    }
  };
  useEffect(() => {
    checkMetaMaskConnection();
    const init = async () => {
        if (!isMetaMaskConnected) {
            return; // Prevent the rest of the logic if MetaMask isn't connected
          }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const currentAddress = await signer.getAddress();
      setVoterAddress(currentAddress);
      const contractVoting1 = new ethers.Contract(contractAddressVoting1, Voting1Abi, signer);
      const fetchedOwnerAddress = await contractVoting1.owner(); // Fetch the owner (admin) address
      setOwnerAddress(fetchedOwnerAddress); // Store the admin address
  
      
      // Fetch candidates from the Voting2 (Public Blockchain)
      const contractVoting2 = new ethers.Contract(
        contractAddressVoting2,
        Voting2Abi,
        signer
      );
      const candidatesDataVoting2 = await contractVoting2.getVotes();
      const formattedCandidatesVoting2 = candidatesDataVoting2.map(candidate => ({
        name: candidate.name,
        voteCount: candidate.voteCount.toString()
      }));
      setCandidatesVoting2(formattedCandidatesVoting2);
  
      // Check if the user has voted in Voting1 (Private Blockchain)
      /*const contractVoting1 = new ethers.Contract(
        contractAddressVoting1,
        Voting1Abi,
        signer
      );*/
      const hasVotedInVoting1 = await contractVoting1.voters(currentAddress); // Checks if the voter has voted
      console.log("Has voted in Voting1 (Private):", hasVotedInVoting1);
      setHasVoted(hasVotedInVoting1);
      
      // Get the owner address for admin validation
      const ownerAddress = await contractVoting1.owner();
      console.log("Admin Address:",ownerAddress); // Use the variable in your code where necessary

      if (currentAddress ===fetchedOwnerAddress) {
        setIsAdmin(true); // Mark the user as admin
      }
      // If the user has voted, get the candidate they voted for
      if (hasVotedInVoting1) {
        const candidateIndex = await contractVoting1.voterVote(currentAddress); // Assuming you have voterVotes mapping
        console.log("Voter Index: ", candidateIndex); // Log the index to check if it's valid
        if (candidateIndex >= 0) { // Check if the candidate index is valid
          const candidateData = await contractVoting1.candidates(candidateIndex);
          console.log("Voted Candidate: ", candidateData); // Log candidate data
          setVoterVote(candidateData.name);
        } else {
          setVoterVote("null");
        }
      }
      contractVoting1.on("VoteCast", (voter, candidateIndex) => {
        console.log(`Voter ${voter} has cast their vote for candidate index: ${candidateIndex}`);
      });
  
      contractVoting1.on("CandidateVoted", (voter, candidateIndex) => {
        console.log(`Voter ${voter} voted for candidate index: ${candidateIndex}`);
      });
    };
  
    init();
    
  }, [isMetaMaskConnected]);
  
  const handleVote = async (candidateIndex) => {
    if (!hasVoted) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const selectedAddress = await signer.getAddress();

      console.log("Selected Address: ", selectedAddress);
      // Initialize contract instances
      const contractVoting1 = new ethers.Contract(contractAddressVoting1, Voting1Abi, signer);
      const contractVoting2 = new ethers.Contract(contractAddressVoting2, Voting2Abi, signer);
  
      try {
        console.log("Selected Candidate Index: ", candidateIndex);
        console.log("Calling Voting1 contract...");
        const tx1 = await contractVoting1.vote(candidateIndex);
        await tx1.wait(); // Wait for the transaction to be mined
        console.log("Voted in Voting1 successfully!");
  
        console.log("Calling Voting2 contract...");
        const tx2 = await contractVoting2.increaseVote(candidateIndex);
        await tx2.wait(); // Wait for the transaction to be mined
        console.log("Vote count updated in Voting2!");
  
        // Set the voter as having voted
        setHasVoted(true);
  
      } catch (error) {
        console.error("Error during voting:", error);
        //alert("There was an error with your vote. Please try again.");
      }
    } else {
      alert("You have already voted!");
    }
  };
  
  
  
  
  const handleAdminConfirm = async () => {
    if (adminAddress && ownerAddress) { // Ensure both are initialized
      if (adminAddress.toLowerCase() === ownerAddress.toLowerCase()) {
        setVoteConfirmed(true);
      } else {
        alert("Admin address is incorrect.");
      }
    } else {
      alert("Admin address must be set before confirming.");
    }
  };
  
  
  return (
    <div className="voting-container">
      <h1>Voting Page</h1>
  
      {/* If the user hasn't voted, show the voting options */}
      {!hasVoted && (
        <>
          <h2>Please vote for your favorite candidate</h2>
          {candidatesVoting2.map((candidate, index) => (
            <div key={index} className="candidate">
              <h3>{candidate.name}</h3>
              <button onClick={() => handleVote(index)}>Vote</button>
            </div>
          ))}
        </>
      )}
  
       {/* If the user has already voted */}
       {hasVoted && !voteConfirmed && (
          <>
            <h2>You have already voted. Please confirm your admin status.</h2>
<div>
  <input
    type="text"
    placeholder="Enter your admin address"
    value={adminAddress}
    onChange={(e) => setAdminAddress(e.target.value)}
  />
  <button onClick={handleAdminConfirm}>Confirm Admin</button>
</div>
{!isAdmin && (
  <p>Only admins can view private results.</p>
)}

          </>
        )}

        {/* If the admin has confirmed, show private blockchain result */}
        {voteConfirmed && (
          <div>
            <h2>Private Blockchain Results</h2>
            {voterVote ? (
            <p>
              The person with address {voterAddress} has voted for {voterVote}.
            </p>
          ) : (
            <p>No vote found.</p> // This message will only appear if the index is invalid
          )}
        </div>
      )}
    </div>
  );
}

export default VotingPage;     