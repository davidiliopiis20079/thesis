import React from 'react'; 
import Dropdown from './Dropdown.js';
import AccountProvider from './AccountProvider.js';

function Header({user, tokens, contracts, selectToken}) {
  return (
    <header id="header" className="card">
      <div className="row">
        {/* Column for Dropdown component */}
        <div className="col-sm-3">
          <Dropdown 
            className="ml-3"
            items={tokens.map((token) => ({
              label: token.ticker,
              value: token
            }))} 
            activeItem={{
              label: user.selectedToken.ticker,
              value: user.selectedToken
            }}
            onSelect={selectToken}
          />
        </div>
        {/* Column for AccountProvider component */}
        <div className="col-sm-5">
          <AccountProvider />
        </div>
        {/* Column for header title */}
        <div className="col-sm">
          <h1 className="header-title">
            Dex - <span className="contract-address">Contract address: <span className="address">{contracts.dex.options.address}</span></span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
