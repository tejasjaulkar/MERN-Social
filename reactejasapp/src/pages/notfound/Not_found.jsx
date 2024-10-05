import React from 'react';
import './notfound.css';

const Not_found = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-header">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
        </div>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/login" className="not-found-button">
          Return to Login
        </a>
      </div>
    </div>
  );
};

export default Not_found;