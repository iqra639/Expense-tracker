console.log('Testing backend server...');
console.log('Current directory:', __dirname);
console.log('Node version:', process.version);
console.log('Environment variables:', process.env.NODE_ENV);

try {
  // Try to load required modules
  const express = require('express');
  console.log('Express loaded successfully');
  
  const cors = require('cors');
  console.log('CORS loaded successfully');
  
  const dotenv = require('dotenv');
  console.log('Dotenv loaded successfully');
  
  // Try to load environment variables
  dotenv.config();
  console.log('Environment variables loaded');
  console.log('PORT:', process.env.PORT);
  
  // Create a simple server
  const app = express();
  console.log('Express app created');
  
  // Add a simple route
  app.get('/test', (req, res) => {
    res.json({ message: 'Test server is working' });
  });
  
  // Start the server
  const PORT = 3000;
  const server = app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
  });
  
  // Close the server after 5 seconds
  setTimeout(() => {
    server.close(() => {
      console.log('Test server closed');
    });
  }, 5000);
} catch (error) {
  console.error('Error in test script:', error);
}
