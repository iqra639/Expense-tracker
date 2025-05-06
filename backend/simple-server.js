const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

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

// JSON parsing middleware
app.use(express.json());

// In-memory database for demonstration
const users = [
  {
    _id: '1',
    username: 'Iqra',
    email: 'Iqrazafarzafar647@gmail.com',
    password: 'password123'
  }
];

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
    const { title, amount, category, date } = req.body;
    
    if (!title || amount === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title and amount'
      });
    }
    
    const newExpense = {
      _id: String(expenses.length + 1),
      title,
      amount: parseFloat(amount),
      category: category || 'Uncategorized',
      date: date ? new Date(date) : new Date(),
      createdAt: new Date(),
      userId: '1'
    };
    
    expenses.push(newExpense);
    
    res.status(201).json({
      success: true,
      data: newExpense
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
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
      error: 'Expense not found'
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
      error: 'Expense not found'
    });
  }
  
  const updatedExpense = {
    ...expenses[index],
    ...req.body,
    _id: id
  };
  
  expenses[index] = updatedExpense;
  
  res.status(200).json({
    success: true,
    data: updatedExpense
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide email and password'
    });
  }
  
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
  
  const token = `fake-jwt-token-${user._id}`;
  
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

// Register
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide username, email and password'
    });
  }
  
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User with this email already exists'
    });
  }
  
  const newUser = {
    _id: String(users.length + 1),
    username,
    email,
    password
  };
  
  users.push(newUser);
  
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

// Get current user
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized'
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
