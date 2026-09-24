import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, BookOpen } from 'lucide-react';

const CartPage = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p style={{ margin: '1rem 0 2rem' }}>Looks like you haven't added any books yet.</p>
        <Link to="/books" className="btn btn-primary">
          <BookOpen size={20} /> Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Your Shopping Cart</h1>
        <p>Review your selected books</p>
      </div>

      <div className="cart-container">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p className="book-author">By {item.author}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="btn btn-danger"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="cart-total">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
