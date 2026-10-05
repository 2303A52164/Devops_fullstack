import React from 'react';

function Summary({ totalItems, totalPrice, discount, finalPrice, isFreeDelivery }) {
  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>₹{totalPrice.toLocaleString()}</span>
      </div>
      {discount > 0 && (
        <div className="summary-row discount">
          <span>Discount (10%):</span>
          <span>-₹{discount.toLocaleString()}</span>
        </div>
      )}
      <div className="summary-row total">
        <span>Total Amount:</span>
        <span>₹{finalPrice.toLocaleString()}</span>
      </div>
      {isFreeDelivery && (
        <div className="free-delivery-badge">
          🎉 Free Delivery Applied!
        </div>
      )}
    </div>
  );
}

export default Summary;
