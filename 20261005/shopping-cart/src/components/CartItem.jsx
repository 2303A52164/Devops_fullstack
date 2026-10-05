import React from 'react';

function CartItem({ item, quantity, price, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="cart-item-price">₹{price.toLocaleString()}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
        </div>
        <div className="item-total">
          ₹{(price * quantity).toLocaleString()}
        </div>
        <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
