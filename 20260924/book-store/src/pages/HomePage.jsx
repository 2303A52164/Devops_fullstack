import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="page-header" style={{ marginTop: '4rem' }}>
      <h1>Welcome to Readify Store</h1>
      <p>Your one-stop destination for the best programming books.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/books" className="btn btn-primary">
          <BookOpen size={20} /> Browse Books
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
