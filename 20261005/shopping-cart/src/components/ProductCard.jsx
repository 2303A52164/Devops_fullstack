import React from 'react';

function ProductCard({ product, name, price, category, onAdd }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={name} className="product-image" />
      <div className="product-details">
        <h3>{name}</h3>
        <p className="category">{category}</p>
        <p className="price">₹{price.toLocaleString()}</p>
        <button className="add-to-cart-btn" onClick={onAdd}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
