import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Test the health endpoint
async function testHealth() {
  try {
    console.log('Testing health endpoint...');
    const response = await axios.get(`${API_URL}/health`);
    console.log('Health endpoint response:', response.data);
    return true;
  } catch (error) {
    console.error('Health endpoint error:', error.message);
    return false;
  }
}

// Test the expenses endpoint
async function testExpenses() {
  try {
    console.log('Testing expenses endpoint...');
    const response = await axios.get(`${API_URL}/expenses`);
    console.log('Expenses endpoint response:', response.data);
    return true;
  } catch (error) {
    console.error('Expenses endpoint error:', error.message);
    return false;
  }
}

// Test the login endpoint
async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'Iqrazafarzafar647@gmail.com',
      password: 'password123'
    });
    console.log('Login endpoint response:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Login endpoint error:', error.message);
    return null;
  }
}

// Test the add expense endpoint
async function testAddExpense(token) {
  try {
    console.log('Testing add expense endpoint...');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(
      `${API_URL}/expenses`,
      {
        title: 'Test Expense',
        amount: -25.50,
        category: 'Testing',
        date: new Date().toISOString().split('T')[0]
      },
      { headers }
    );
    console.log('Add expense endpoint response:', response.data);
    return response.data.data._id;
  } catch (error) {
    console.error('Add expense endpoint error:', error.message);
    return null;
  }
}

// Test the delete expense endpoint
async function testDeleteExpense(id, token) {
  if (!id) return false;

  try {
    console.log(`Testing delete expense endpoint for ID ${id}...`);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.delete(
      `${API_URL}/expenses/${id}`,
      { headers }
    );
    console.log('Delete expense endpoint response:', response.data);
    return true;
  } catch (error) {
    console.error('Delete expense endpoint error:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...');
  console.log('API URL:', API_URL);
  console.log('-----------------------------------');

  const healthOk = await testHealth();
  console.log('Health endpoint test:', healthOk ? 'PASSED' : 'FAILED');
  console.log('-----------------------------------');

  const expensesOk = await testExpenses();
  console.log('Expenses endpoint test:', expensesOk ? 'PASSED' : 'FAILED');
  console.log('-----------------------------------');

  const token = await testLogin();
  console.log('Login endpoint test:', token ? 'PASSED' : 'FAILED');
  console.log('-----------------------------------');

  const expenseId = await testAddExpense(token);
  console.log('Add expense endpoint test:', expenseId ? 'PASSED' : 'FAILED');
  console.log('-----------------------------------');

  if (expenseId) {
    const deleteOk = await testDeleteExpense(expenseId, token);
    console.log('Delete expense endpoint test:', deleteOk ? 'PASSED' : 'FAILED');
    console.log('-----------------------------------');
  }

  console.log('All tests completed.');
}

// Run the tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});
