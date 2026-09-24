import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <div className="page-header">
        <h1>About Readify Store</h1>
        <p>Your trusted source for knowledge</p>
      </div>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ marginBottom: '2rem' }}>
          At Readify Store, we believe that knowledge should be accessible to everyone. 
          We are dedicated to providing the best programming and technology books to help 
          developers grow in their careers and build amazing software.
        </p>
        
        <h2 style={{ marginBottom: '1rem' }}>Why Choose Us?</h2>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Curated selection of the best tech books</li>
          <li>Competitive pricing</li>
          <li>Fast and reliable delivery</li>
          <li>Excellent customer support</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
