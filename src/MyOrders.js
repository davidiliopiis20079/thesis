import React, { Fragment } from 'react';
import Moment from 'react-moment';

// Functional component MyOrders receiving 'orders' as props
function MyOrders({orders}) {
  
  // Function renderList to render a table of orders
  const renderList = (orders, side, className) => {
    return (
      // Fragment used to wrap multiple elements without adding extra nodes to the DOM
      <Fragment>
        {/* Table element with Bootstrap classes */}
        <table className={`table table-striped mb-0 order-list ${className}`}>
          <thead>
            {/* Table row for the title of the order list */}
            <tr className="table-title order-list-title">
              {/* Column spanning 3 cells with the side (Buy or Sell) */}
              <th colSpan='3'>{side}</th>
            </tr>
            {/* Table row for column headers */}
            <tr>
              <th>Amount/Filled</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through orders array to render each order */}
            {orders.map((order) => (
              <tr key={order.id}>
                {/* Displaying amount/filled, price, and date of each order */}
                <td>{Number(order.amount)}/{Number(order.filled)}</td>
                <td>{Number(order.price)}</td>
                <td>
                  {/* Using Moment component to display relative time from order date */}
                  <Moment fromNow>{parseInt(order.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }

  return (
    <div id="order-list" className="card">
      {/* Title for the card */}
      <h2 className="card-title">My orders</h2>
      <div className="row">
        <div className="col-sm-6">
          {/* Rendering buy orders using renderList function */}
          {renderList(orders.buy, 'Buy', 'order-list-buy')}
        </div>
        <div className="col-sm-6">
          {/* Rendering sell orders using renderList function */}
          {renderList(orders.sell, 'Sell', 'order-list-sell')}
        </div>
      </div>
    </div>
  );
}

// Exporting MyOrders component as default
export default MyOrders;
