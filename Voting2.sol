// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting2 {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    address public owner;

    // Mapping to store authorized callers (contracts)
    mapping(address => bool) public authorizedCallers;

    event NewVote(uint256 indexed candidateIndex, uint256 newVoteCount);

    constructor(string[] memory _candidateNames) {
        owner = msg.sender;
        // Authorize the contract deployer initially (you might remove this later)
        authorizedCallers[msg.sender] = true; 
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate(_candidateNames[i], 0));
        }
    }

    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender], "Not authorized to call this function");
        _;
    }

    function getVotes() public view returns (Candidate[] memory) {
        return candidates;
    }

    function increaseVote(uint256 _candidateIndex) public onlyAuthorized { // Add modifier here
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        candidates[_candidateIndex].voteCount++;
        emit NewVote(_candidateIndex, candidates[_candidateIndex].voteCount);
    }

    function addCandidate(string memory _name) public {
        require(msg.sender == owner, "Not authorized");
        candidates.push(Candidate(_name, 0));
    }

    // Function for the owner to authorize another contract (like Voting1)
    function authorizeCaller(address _caller) public {
        require(msg.sender == owner, "Only owner can authorize callers");
        authorizedCallers[_caller] = true;
    }

    // Function for the owner to remove authorization
    function removeAuthorization(address _caller) public {
        require(msg.sender == owner, "Only owner can remove authorization");
        authorizedCallers[_caller] = false;
    }
}   