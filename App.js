import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import VotingPage from "./components/VotingPage";
import ResultsPage from "./components/ResultsPage";
import './App.css';
// Import ABI files
import Voting1Abi from "./abis/Voting1_abi.json";
import Voting2Abi from "./abis/Voting2_abi.json";

// Define contract addresses (ensure they are correct)
const contractAddressVoting1 = "0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D"; 
const contractAddressVoting2 = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f"; 

function App() {
  const [account, setAccount] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Login Page */}
          <Route 
            path="/" 
            element={<LoginPage setAccount={setAccount} />} 
          />

          {/* Voting Page */}
          <Route 
            path="/vote" 
            element={
              account ? (  // Check if account is connected
                <VotingPage 
                  account={account} 
                  Voting1Abi={Voting1Abi} 
                  Voting2Abi={Voting2Abi} 
                  contractAddressVoting1={contractAddressVoting1} 
                  contractAddressVoting2={contractAddressVoting2} 
                />
              ) : (
                <p>Please connect MetaMask to access the voting page.</p>
              )
            } 
          />

          {/* Results Page */}
          <Route 
            path="/results" 
            element={<ResultsPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
