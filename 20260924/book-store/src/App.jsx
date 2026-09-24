import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ShoppingCart, BookOpen, Home, Info, AlertTriangle } from 'lucide-react';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== bookId));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <div className="logo">
            <BookOpen size={24} />
            <span>Readify Store</span>
          </div>
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <Home size={18} /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/books" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <BookOpen size={18} /> Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <Info size={18} /> About
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active cart-link' : 'cart-link')}>
                  <ShoppingCart size={18} /> Cart
                  {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailsPage addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2026 Readify Store. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
