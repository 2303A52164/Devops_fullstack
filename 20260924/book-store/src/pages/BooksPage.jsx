import React from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import { Info } from 'lucide-react';

const BooksPage = () => {
  return (
    <div>
      <div className="page-header">
        <h1>Our Collection</h1>
        <p>Explore our wide range of books</p>
      </div>
      
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <span className="book-author">by {book.author}</span>
            <span className="book-price">${book.price.toFixed(2)}</span>
            <div style={{ marginTop: 'auto' }}>
              <Link to={`/books/${book.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                <Info size={18} /> View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
