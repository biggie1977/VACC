const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    data: {
      organization: 'Value Adding Christian Centre',
      year: 2026,
      mission: 'Building faith and community'
    }
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required'
    });
  }

  // Here you would typically save to a database
  res.json({
    success: true,
    message: 'Message received successfully',
    data: { name, email, receivedAt: new Date().toISOString() }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 Backend server running on http://localhost:${PORT}`);
  console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
});
