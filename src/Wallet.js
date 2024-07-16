import React, { useState } from 'react';


// Define the directions for transactions
const DIRECTION = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT'
};

function Wallet({ deposit, withdraw, user }) {
  
  // State to track the direction of the transaction (default is DEPOSIT)
  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  // State to track the amount to be transacted
  const [amount, setAmount] = useState(0);

  // Determine the value of dexNumber based on the type of user.balances.tokenDex
  const dexNumber =  Number(user.balances.tokenDex);

  // Convert the wallet balance to a number
  const walletNumber = Number(user.balances.tokenWallet);

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (direction === DIRECTION.DEPOSIT) {
      deposit(amount); // Call the deposit function if direction is DEPOSIT
    } else {
      withdraw(amount); // Call the withdraw function if direction is WITHDRAW
    }
  };

  return (
    <div id="wallet" className="card">
      <h2 className="card-title">Wallet</h2>
      <h3>Token balance for {user.selectedToken.ticker}</h3>
      
      {/* Display wallet balance */}
      <div className="form-group row">
        <label htmlFor="wallet" className="col-sm-4 col-form-label">Wallet</label>
        <div className="col-sm-8">
          <input 
            className="form-control" 
            id="wallet" 
            disabled 
            value={walletNumber}
          />
        </div>
      </div>
      
      {/* Display dex balance */}
      <div className="form-group row">
        <label htmlFor="contract" className="col-sm-4 col-form-label">Dex</label>
        <div className="col-sm-8">
          <input 
            className="form-control" 
            id="dex" // Changed id to "dex" for clarity
            disabled 
            value={dexNumber}
          />
        </div>
      </div>
      
      <h3>Transfer {user.selectedToken.ticker}</h3>
      
      {/* Transfer form */}
      <form id="transfer" onSubmit={onSubmit}>
        <div className="form-group row">
          <label htmlFor="direction" className="col-sm-4 col-form-label">Direction</label>
          <div className="col-sm-8">
            <div id="direction" className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn btn-secondary ${direction === DIRECTION.DEPOSIT ? 'active' : ''}`}
                onClick={() => setDirection(DIRECTION.DEPOSIT)}
              >Deposit</button>
              <button 
                type="button" 
                className={`btn btn-secondary ${direction === DIRECTION.WITHDRAW ? 'active' : ''}`}
                onClick={() => setDirection(DIRECTION.WITHDRAW)}
              >Withdraw</button>
            </div>
          </div>
        </div>
        
        {/* Input for the amount */}
        <div className="form-group row">
          <label htmlFor="amount" className="col-sm-4 col-form-label">Amount</label>
          <div className="col-sm-8">
            <div className="input-group mb-3">
              <input 
                id="amount" 
                type="text" 
                className="form-control" 
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">{user.selectedToken.ticker}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit button */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Wallet;
