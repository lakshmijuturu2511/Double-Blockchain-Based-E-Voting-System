import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setAccount }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          navigate("/vote");  // Redirect to /vote after account is set
        } else {
          setErrorMessage("Please connect to MetaMask");
        }
      });
    }
  }, [setAccount, navigate]);

  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      navigate("/vote");  // Redirect to /vote after connection
    } catch (error) {
      setErrorMessage("MetaMask connection failed.");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to the E-Voting System</h1>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
