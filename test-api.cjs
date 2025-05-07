const http = require('http');

// Function to make a simple HTTP GET request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    console.log(`Making request to: ${url}`);
    
    const req = http.get(url, (res) => {
      let data = '';
      
      // A chunk of data has been received
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      // The whole response has been received
      res.on('end', () => {
        console.log(`Response status: ${res.statusCode}`);
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            data: parsedData
          });
        } catch (e) {
          console.error('Error parsing JSON:', e);
          resolve({
            statusCode: res.statusCode,
            data: data
          });
        }
      });
    });
    
    // Handle errors
    req.on('error', (error) => {
      console.error(`Error making request: ${error.message}`);
      reject(error);
    });
    
    // Set timeout
    req.setTimeout(5000, () => {
      req.abort();
      reject(new Error('Request timed out'));
    });
  });
}

// Test the backend API
async function testBackendAPI() {
  console.log('Testing backend API...');
  console.log('======================');
  
  try {
    // Test health endpoint
    console.log('\nTesting health endpoint:');
    const healthResult = await makeRequest('http://localhost:5000/api/health');
    console.log('Health endpoint result:', healthResult);
    
    // Test expenses endpoint
    console.log('\nTesting expenses endpoint:');
    const expensesResult = await makeRequest('http://localhost:5000/api/expenses');
    console.log('Expenses endpoint result:', expensesResult);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('\nTest failed:', error.message);
  }
}

// Run the tests
testBackendAPI();
