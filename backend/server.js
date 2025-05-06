const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// JSON parsing middleware with error handling
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      console.error('Invalid JSON:', e);
      res.status(400).json({ success: false, error: 'Invalid JSON payload' });
      throw new Error('Invalid JSON');
    }
  }
}));

// In-memory database for demonstration
// Define users first since it's referenced in the expenses route
const users = [
  {
    _id: '1',
    username: 'Iqra',
    email: 'Iqrazafarzafar647@gmail.com',
    password: 'password123'
  }
];
let userIdCounter = 2; // Start from 2 since we already have one user

let expenses = [
  {
    _id: '1',
    title: 'Groceries',
    amount: -50.25,
    category: 'Food',
    date: new Date('2023-04-15'),
    createdAt: new Date('2023-04-15'),
    userId: '1'
  },
  {
    _id: '2',
    title: 'Salary',
    amount: 2000,
    category: 'Income',
    date: new Date('2023-04-01'),
    createdAt: new Date('2023-04-01'),
    userId: '1'
  },
  {
    _id: '3',
    title: 'Rent',
    amount: -800,
    category: 'Housing',
    date: new Date('2023-04-05'),
    createdAt: new Date('2023-04-05'),
    userId: '1'
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all expenses
app.get('/api/expenses', (req, res) => {
  res.json({ success: true, count: expenses.length, data: expenses });
});

// Add a new expense
app.post('/api/expenses', (req, res) => {
  try {
    console.log('Received expense POST request');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);

    // For simplicity, we'll skip token validation for now
    // Just assume the user is authenticated
    const userId = '1'; // Default to user ID 1
    const user = users.find(user => user._id === userId);

    console.log('Using default user:', user.username);

    const { title, amount, category, date } = req.body;

    // Improved validation with detailed error messages
    if (!title) {
      console.log('Validation failed: Missing title');
      return res.status(400).json({
        success: false,
        error: 'Please provide a title for the transaction'
      });
    }

    if (amount === undefined || amount === null) {
      console.log('Validation failed: Missing amount');
      return res.status(400).json({
        success: false,
        error: 'Please provide an amount for the transaction'
      });
    }

    // Parse amount to ensure it's a number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      console.log('Validation failed: Invalid amount format');
      return res.status(400).json({
        success: false,
        error: 'Amount must be a valid number'
      });
    }

    const newExpense = {
      _id: String(expenses.length + 1),
      title,
      amount: parsedAmount, // Use the parsed amount
      category: category || 'Uncategorized',
      date: date ? new Date(date) : new Date(),
      createdAt: new Date(),
      userId: user._id // Associate expense with user
    };

    console.log('Created new expense:', newExpense);
    expenses.push(newExpense);

    console.log('Sending response with data:', newExpense);
    res.status(201).json({
      success: true,
      data: newExpense
    });
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while adding transaction'
    });
  }
});

// Delete an expense
app.delete('/api/expenses/:id', (req, res) => {
  const id = req.params.id;
  const index = expenses.findIndex(expense => expense._id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'No expense found'
    });
  }

  expenses.splice(index, 1);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// Update an expense
app.put('/api/expenses/:id', (req, res) => {
  const id = req.params.id;
  const index = expenses.findIndex(expense => expense._id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'No expense found'
    });
  }

  const updatedExpense = {
    ...expenses[index],
    ...req.body,
    _id: id, // Ensure ID doesn't change
    updatedAt: new Date()
  };

  expenses[index] = updatedExpense;

  res.status(200).json({
    success: true,
    data: updatedExpense
  });
});

// Simple auth routes

// Register
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide username, email and password'
    });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User with this email already exists'
    });
  }

  // Create new user
  const newUser = {
    _id: String(userIdCounter++),
    username,
    email,
    password // In a real app, this would be hashed
  };

  users.push(newUser);

  // Generate token (in a real app, this would use JWT)
  const token = `fake-jwt-token-${newUser._id}`;

  res.status(201).json({
    success: true,
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    }
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({
      success: false,
      error: 'Please provide email and password'
    });
  }

  console.log('Available users:', users);

  // Find user
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    console.log('User not found or password incorrect');
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  console.log('User found:', user);

  // Generate token (in a real app, this would use JWT)
  const token = `fake-jwt-token-${user._id}`;

  console.log('Generated token:', token);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  // In a real app, this would verify the JWT token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }

  const token = authHeader.split(' ')[1];
  const userId = token.split('-')[2];

  const user = users.find(user => user._id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;

console.log('Starting server...');
console.log('Environment variables:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? 'Set' : 'Not set',
  JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set'
});

try {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Server is listening on all network interfaces');
    console.log('Available routes:');
    console.log('- GET /api/health');
    console.log('- GET /api/expenses');
    console.log('- POST /api/expenses');
    console.log('- DELETE /api/expenses/:id');
    console.log('- PUT /api/expenses/:id');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET /api/auth/me');
  });
} catch (error) {
  console.error('Error starting server:', error);
}
