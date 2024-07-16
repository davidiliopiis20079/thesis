// Importing necessary modules from React and 'react-moment' library
import React, { Fragment } from 'react';
import Moment from 'react-moment';

// Functional component AllTrades which takes trades as a prop
function AllTrades({ trades }) {
  // Log the trades data to the console for debugging
  console.log(trades);

  // Helper function to render the list of trades in a table format
  const renderList = (trades, className) => {
    return (
      // Fragment to group multiple elements without adding extra nodes to the DOM
      <Fragment>
        {/* Table with classes for styling and an additional class passed as a parameter */}
        <table className={`table table-striped trade-list mb-0 ${className}`}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through trades and create a row for each trade */}
            {trades.map((trade) => (
              // Each row has a unique key based on tradeId
              <tr key={Number(trade.tradeId)}>
                {/* Display trade amount */}
                <td>{Number(trade.amount)}</td>
                {/* Display trade price */}
                <td>{Number(trade.price)}</td>
                {/* Display trade date formatted with Moment */}
                <td>
                  <Moment fromNow>{parseInt(trade.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  };

  // Return the main component structure
  return (
    <div className="card">
      <h2 className="card-title">All trades</h2>
      <div className="row">
        <div className="col-sm-12">
          {/* Call renderList function to display the trades table */}
          {renderList(trades, 'trade-list')}
        </div>
      </div>
    </div>
  );
}

// Export the AllTrades component as the default export
export default AllTrades;
