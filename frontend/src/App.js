import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend API
    fetch('http://localhost:5000/api/health')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <nav>
        <h1 className="logo">VACC</h1>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Value Adding Christian Centre</h1>
          <p>Welcome to our community of faith and growth</p>
          <button onClick={() => alert('Welcome to VACC!')}>
            Get Started
          </button>
        </div>
      </section>

      <section className="status">
        <h2>Backend Status</h2>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <div className="status-box">
            <p>Status: {data.status}</p>
            <p>Message: {data.message}</p>
          </div>
        ) : (
          <p>Unable to connect to backend</p>
        )}
      </section>

      <footer>
        <p>&copy; 2026 Value Adding Christian Centre. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
