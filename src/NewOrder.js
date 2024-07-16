import React, { useState } from 'react';

// Define the order types
const TYPE = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET'
};

// Define the order sides
const SIDE = {
  BUY: 0,
  SELL: 1
};

function NewOrder({ createMarketOrder, createLimitOrder }) {
  // State to track the order details
  const [order, setOrder] = useState({
    type: TYPE.LIMIT,
    side: SIDE.BUY,
    amount: '',
    price: ''
  });

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (order.type === TYPE.MARKET) {
      createMarketOrder(order.amount, order.side); // Call the market order function if type is MARKET
    } else {
      createLimitOrder(order.amount, order.price, order.side); // Call the limit order function if type is LIMIT
    }
  }

  return (
    <div id="orders" className="card">
      <h2 className="card-title">New Order</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        
        {/* Order Type Selection */}
        <div className="form-group row">
          <label htmlFor="type" className="col-sm-4 col-form-label">Type</label>
          <div className="col-sm-8">
            <div id="type" className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn btn-secondary ${order.type === TYPE.LIMIT ? 'active' : ''}`}
                onClick={() => setOrder(order => ({ ...order, type: TYPE.LIMIT}))}
              >Limit</button>
              <button 
                type="button" 
                className={`btn btn-secondary ${order.type === TYPE.MARKET ? 'active' : ''}`}
                onClick={() => setOrder(order => ({ ...order, type: TYPE.MARKET}))}
              >Market</button>
            </div>
          </div>
        </div>
        
        {/* Order Side Selection */}
        <div className="form-group row">
          <label htmlFor="side" className="col-sm-4 col-form-label">Side</label>
          <div className="col-sm-8">
            <div id="side" className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn btn-secondary ${order.side === SIDE.BUY ? 'active' : ''}`}
                onClick={() => setOrder(order => ({ ...order, side: SIDE.BUY}))}
              >Buy</button>
              <button 
                type="button" 
                className={`btn btn-secondary ${order.side === SIDE.SELL ? 'active' : ''}`}
                onClick={() => setOrder(order => ({ ...order, side: SIDE.SELL}))}
              >Sell</button>
            </div>
          </div>
        </div>
        
        {/* Order Amount Input */}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="order-amount">Amount</label>
          <div className="col-sm-8">
            <input 
              type="text" 
              className="form-control" 
              id="order-amount" 
              onChange={({ target: { value }}) => setOrder(order => ({ ...order, amount: value}))}
            />
          </div>
        </div>
        
        {/* Conditionally Render Order Price Input */}
        {order.type === TYPE.MARKET ? null :
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="order-price">Price</label>
            <div className="col-sm-8">
              <input 
                type="text" 
                className="form-control" 
                id="order-price" 
                onChange={({ target: { value }}) => setOrder(order => ({ ...order, price: value}))}
              />
            </div>
          </div>
        }
        
        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewOrder;
