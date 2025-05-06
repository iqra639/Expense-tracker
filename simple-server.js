const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port to use
const PORT = 8000;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);
  
  // Serve the simple HTML file for all requests
  const filePath = path.join(__dirname, 'simple-app.html');
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(500);
      res.end('Error loading the file');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
});

// Start the server
console.log(`Starting simple server on port ${PORT}...`);
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
