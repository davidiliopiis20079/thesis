import React, { useState, useEffect } from "react";
import { getWeb3, getContracts } from './utils.js';
import App from './App.js';

function LoadingContainer() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const contracts = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();

      setWeb3(web3);
      setContracts(contracts);
      setAccounts(accounts);

      // Set up the event listener for account changes
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      } else {
        console.error('MetaMask is not installed.');
      }
    }

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        window.location.reload();
      } else {
        console.log('Please connect to MetaMask.');
      }
    };

    init();

    // Cleanup the event listener on component unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to check if web3, contracts, and accounts are ready
  const isReady = () => {
    return (
      typeof web3 !== 'undefined' 
      && typeof contracts !== 'undefined'
      && accounts.length > 0
    );
  }

  // If not ready, display loading message
  if (!isReady()) {
    return <div>Loading...</div>;
  }

  // If ready, render the main App component with props
  return (
    <App
      web3={web3}
      accounts={accounts}
      contracts={contracts}
    />
  );
}

export default LoadingContainer;
