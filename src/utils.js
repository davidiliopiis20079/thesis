import Web3 from 'web3';
import Dex from './Dex.json';
import ERC20Abi from './ERC20Abi.json';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

const getContracts = async web3 => {
  // const networkId = await web3.eth.net.getId(); // Get the network ID
  // const deployedNetwork = Dex.networks[networkId]; // Get the deployed network information for Dex
  const deployedAddress = "0xA5831c1e35fCdC237955D1E46AAccA1Cc1712756";
  const dex = new web3.eth.Contract(
    Dex.abi,
    deployedAddress,
  ); // Create a contract instance for Dex
  const tokens = await dex.methods.getTokens().call(); // Call the getTokens method to get the list of tokens
  const tokenContracts = tokens.reduce((acc, token) => ({
    ...acc,
    [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract(
      ERC20Abi,
      token.tokenAddress
    )
  }), {}); // Create contract instances for each token and map them by ticker
  return { dex, ...tokenContracts }; // Return the Dex contract and token contracts
}

export { getWeb3, getContracts };
