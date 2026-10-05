import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAdd }) {
  if (products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          name={product.name}
          price={product.price}
          category={product.category}
          onAdd={() => onAdd(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;
