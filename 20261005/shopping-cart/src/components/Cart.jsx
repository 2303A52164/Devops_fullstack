import React from 'react';
import CartItem from './CartItem';

function Cart({ cartItems, onUpdateQuantity, onRemove }) {
  if (cartItems.length === 0) {
    return <p className="empty-cart-message">Your cart is empty.</p>;
  }

  return (
    <div className="cart-items">
      {cartItems.map(item => (
        <CartItem 
          key={item.id}
          item={item}
          quantity={item.quantity}
          price={item.price}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default Cart;
