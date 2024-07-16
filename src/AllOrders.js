// Importing necessary modules from React and 'react-moment' library
import React, { Fragment } from 'react';
import Moment from 'react-moment';

// Functional component AllOrders which takes orders as a prop
function AllOrders({ orders }) {

  console.log('Orders:', orders);

  // Helper function to render the list of orders in a table format
  const renderList = (orders, side, className) => {
    return (
      // Fragment to group multiple elements without adding extra nodes to the DOM
      <Fragment>
        {/* Table with classes for styling and an additional class passed as a parameter */}
        <table className={`table table-striped mb-0 order-list ${className}`}>
          <thead>
            <tr className="table-title order-list-title">
              {/* Header displaying the order side (Buy or Sell) */}
              <th colSpan='3'>{side}</th>
            </tr>
            <tr>
              <th>Amount</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through orders and create a row for each order */}
            {orders.map((order) => (
              // Each row has a unique key based on order.id
              <tr key={order.id}>
                {/* Display remaining amount (total amount - filled amount) */}
                <td>{Number(order.amount) - Number(order.filled)}</td>
                {/* Display order price */}
                <td>{Number(order.price)}</td>
                {/* Display order date formatted with Moment */}
                <td>
                  <Moment fromNow>{parseInt(order.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }

  // Return the main component structure
  return (
    <div className="card">
      <h2 className="card-title">All orders</h2>
      <div className="row">
        <div className="col-sm-6">
          {/* Call renderList function to display the buy orders table */}
          {renderList(orders.buy, 'Buy', 'order-list-buy')}
        </div>
        <div className="col-sm-6">
          {/* Call renderList function to display the sell orders table */}
          {renderList(orders.sell, 'Sell', 'order-list-sell')}
        </div>
      </div>
    </div>
  );
}

// Export the AllOrders component as the default export
export default AllOrders;
