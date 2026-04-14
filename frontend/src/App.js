import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <nav>
        <h1 className="logo">VACC</h1>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="/branches.html">Branches</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Value Adding Christian Centre</h1>
          <p>Welcome to our community of faith and growth</p>
          <button onClick={() => window.location.href = '/branches.html'}>
            Find a Branch
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
