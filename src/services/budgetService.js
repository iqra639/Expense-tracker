import axios from 'axios';
import { API_URL } from '../config';

// Helper function to create auth header
const createAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Mock budget data (will be replaced with API calls in production)
let mockBudgets = [
  {
    _id: '1',
    category: 'Food',
    amount: 500,
    spent: 320.45,
    period: 'monthly',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    category: 'Transportation',
    amount: 200,
    spent: 150.75,
    period: 'monthly',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    category: 'Entertainment',
    amount: 150,
    spent: 75.25,
    period: 'monthly',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    category: 'Shopping',
    amount: 300,
    spent: 210.50,
    period: 'monthly',
    createdAt: new Date().toISOString()
  }
];

// Get all budgets
export const getBudgets = async () => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/budgets`, createAuthHeader());
    // return response.data.data;
    
    // For now, return mock data
    return mockBudgets;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

// Add a new budget
export const addBudget = async (budget) => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}/budgets`, budget, createAuthHeader());
    // return response.data.data;
    
    // For now, add to mock data
    const newBudget = {
      _id: Date.now().toString(),
      ...budget,
      spent: 0,
      createdAt: new Date().toISOString()
    };
    
    // Check if budget for this category already exists
    const existingIndex = mockBudgets.findIndex(b => b.category === budget.category);
    
    if (existingIndex !== -1) {
      // Update existing budget
      mockBudgets[existingIndex] = {
        ...mockBudgets[existingIndex],
        amount: budget.amount,
        period: budget.period
      };
      return mockBudgets[existingIndex];
    } else {
      // Add new budget
      mockBudgets.push(newBudget);
      return newBudget;
    }
  } catch (error) {
    console.error('Error adding budget:', error);
    throw error;
  }
};

// Delete a budget
export const deleteBudget = async (id) => {
  try {
    // In a real app, this would be an API call
    // await axios.delete(`${API_URL}/budgets/${id}`, createAuthHeader());
    
    // For now, remove from mock data
    mockBudgets = mockBudgets.filter(budget => budget._id !== id);
    return id;
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw error;
  }
};

// Update a budget
export const updateBudget = async (id, budget) => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.put(`${API_URL}/budgets/${id}`, budget, createAuthHeader());
    // return response.data.data;
    
    // For now, update mock data
    const index = mockBudgets.findIndex(b => b._id === id);
    if (index !== -1) {
      mockBudgets[index] = {
        ...mockBudgets[index],
        ...budget
      };
      return mockBudgets[index];
    }
    throw new Error('Budget not found');
  } catch (error) {
    console.error('Error updating budget:', error);
    throw error;
  }
};

// Update spent amount based on expenses
export const updateBudgetSpending = (budgets, expenses) => {
  // Group expenses by category
  const expensesByCategory = {};
  
  // Only consider expenses from the current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  expenses
    .filter(expense => {
      // Only include expenses (negative amounts)
      if (expense.amount >= 0) return false;
      
      // Only include expenses from current month
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    })
    .forEach(expense => {
      const category = expense.category || 'Uncategorized';
      if (expensesByCategory[category]) {
        expensesByCategory[category] += Math.abs(expense.amount);
      } else {
        expensesByCategory[category] = Math.abs(expense.amount);
      }
    });
  
  // Update spent amount for each budget
  return budgets.map(budget => {
    const spent = expensesByCategory[budget.category] || 0;
    return {
      ...budget,
      spent
    };
  });
};
