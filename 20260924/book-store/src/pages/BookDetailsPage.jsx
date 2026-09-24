import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { books } from '../data/books';

const BookDetailsPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Component mounted / id changed
    console.log(`[BookDetails] Mounting or id changed to: ${id}`);
    setLoading(true);
    setError(false);

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const foundBook = books.find(b => b.id === id);
      if (foundBook) {
        setBook(foundBook);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 800);

    // Cleanup function
    return () => {
      console.log(`[BookDetails] Cleaning up for id: ${id}`);
      clearTimeout(timer);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading book details...</h2>
        <p>Please wait while we fetch the information.</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="not-found">
        <h1>Book Not Found</h1>
        <p>Sorry, the book with ID '{id}' does not exist.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginTop: '2rem' }}>
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Go Back
      </button>

      <div className="book-details-container">
        <div className="book-details-info">
          <h1>{book.title}</h1>
          <span className="author-tag">By {book.author}</span>
          <p className="description">{book.description}</p>
          <span className="price-tag">${book.price.toFixed(2)}</span>
          
          <div className="actions">
            <button 
              onClick={() => {
                addToCart(book);
                alert(`${book.title} added to cart!`);
              }} 
              className="btn btn-primary"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
