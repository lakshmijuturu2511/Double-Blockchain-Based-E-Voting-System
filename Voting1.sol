// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IVoting2 {
    function increaseVote(uint256 _candidateIndex) external;
}
contract Voting1 {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public voters; // Stores if an address has voted
    mapping(address => uint256) public voterVote; // Maps voter address to candidate index (used 'voterVote' here)
    Candidate[] public candidates;

    address public owner;
    IVoting2 public voting2Instance;
    event VoteCast(address indexed voter, uint256 indexed candidateIndex);
     event CandidateVoted(address indexed voter, uint256 indexed candidateIndex);
    constructor(string[] memory _candidateNames,address _voting2Address) {
        owner = msg.sender;
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate(_candidateNames[i], 0));
        }
         voting2Instance = IVoting2(_voting2Address); // Initialize Voting2 contract address
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender], "You have Already voted");
        _;
    }

    modifier validCandidate(uint256 _candidateIndex) {
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        _;
    }

    function vote(uint256 _candidateIndex) public hasNotVoted validCandidate(_candidateIndex) {
        voters[msg.sender] = true;
        voterVote[msg.sender] = _candidateIndex; // Store the candidate index the user voted for in 'voterVote'
        candidates[_candidateIndex].voteCount++; // Increment the vote count for the chosen candidate
        // Call Voting2's increaseVote after successfully voting in Voting1
        voting2Instance.increaseVote(_candidateIndex);
        emit VoteCast(msg.sender, _candidateIndex);
        emit CandidateVoted(msg.sender, _candidateIndex); 
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Owner-only function to add new candidates (example)
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name, 0));
    }
}    