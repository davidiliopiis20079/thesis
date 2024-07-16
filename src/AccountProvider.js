// Importing necessary modules from React and 'web3' library
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Functional component AccountProvider
const AccountProvider = () => {
  // Define a state variable to store the user's account address
  const [accountAddress, setAccountAddress] = useState('');

  // useEffect hook to run a function when the component mounts
  useEffect(() => {
    // Async function to get the user's account address
    const getAccount = async () => {
      // Check if MetaMask (or another Ethereum provider) is installed
      if (typeof window.ethereum !== 'undefined') {
        // Create a new Web3 instance using the Ethereum provider
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the user's accounts
          const accounts = await web3.eth.getAccounts();

          // Store the address in state
          setAccountAddress(accounts[0]);

          // For demonstration purposes, log the address to the console
          console.log('MetaMask Account Address:', accounts[0]);
        } catch (error) {
          // Handle errors, such as user denying account access
          console.error('User denied account access or there was an error', error);
        }
      } else {
        // Alert the user if MetaMask is not installed
        alert('MetaMask is not installed. Please install it to use this feature.');
      }
    };

    // Call the function to get the account when the component mounts
    getAccount(); // Empty dependency array means this effect runs once when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Return JSX to display the connected account address
  return (
    <div>
      <h1 className="header-title">
        Connected Trader - <span className="contract-address">address: <span className="address">{accountAddress}</span></span>
      </h1>
    </div>
  );
};

// Export the AccountProvider component as the default export
export default AccountProvider;

