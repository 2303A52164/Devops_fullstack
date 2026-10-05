import { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Summary from './components/Summary';
import './App.css';

const initialProducts = [
  { id: 'P101', name: 'Laptop', category: 'Electronics', price: 60000, image: 'https://via.placeholder.com/150?text=Laptop' },
  { id: 'P102', name: 'Headphones', category: 'Electronics', price: 2000, image: 'https://via.placeholder.com/150?text=Headphones' },
  { id: 'P103', name: 'Backpack', category: 'Accessories', price: 1500, image: 'https://via.placeholder.com/150?text=Backpack' },
  { id: 'P104', name: 'Smartphone', category: 'Electronics', price: 25000, image: 'https://via.placeholder.com/150?text=Smartphone' },
  { id: 'P105', name: 'Water Bottle', category: 'Accessories', price: 500, image: 'https://via.placeholder.com/150?text=Water+Bottle' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(initialProducts.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(0, newQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = totalPrice > 5000 ? totalPrice * 0.1 : 0; // 10% discount if over 5000
  const finalPrice = totalPrice - discount;
  const isFreeDelivery = finalPrice > 2000;

  return (
    <div className="App">
      <Header title="Online Shopping Cart" />
      
      <main className="main-content">
        <section className="products-section">
          <div className="filters">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box"
            />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <ProductList products={filteredProducts} onAdd={handleAddToCart} />
        </section>

        <aside className="cart-section">
          <h2>Shopping Cart</h2>
          <Cart 
            cartItems={cart} 
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
          />
          
          {cart.length > 0 && (
            <>
              <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
              <Summary 
                totalItems={totalItems} 
                totalPrice={totalPrice} 
                discount={discount}
                finalPrice={finalPrice}
                isFreeDelivery={isFreeDelivery}
              />
            </>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;
