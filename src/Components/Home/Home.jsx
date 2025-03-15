import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-overlay">
        <h1 className="home-title">Welcome to the Smart Highway Emergency Response System</h1>
        <p className="home-description">Use the navigation bar to view alerts or report incidents.</p>
      </div>
    </div>
  );
};

export default Home;