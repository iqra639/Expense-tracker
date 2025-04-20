import axios from 'axios';
import { API_URL } from '../config';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with auth header
const createAuthHeader = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  };
};

// Get all expenses
export const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, createAuthHeader());
    return response.data.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Add a new expense
export const addExpense = async (expense) => {
  try {
    console.log('Making API call to add expense:', expense);
    console.log('API URL:', `${API_URL}/expenses`);

    // Ensure the expense object is properly formatted
    const formattedExpense = {
      title: expense.title,
      amount: expense.amount,
      category: expense.category || 'Uncategorized',
      date: expense.date || new Date().toISOString().split('T')[0]
    };

    console.log('Formatted expense:', formattedExpense);

    // Make the API call with explicit configuration and timeout
    const response = await axios({
      method: 'post',
      url: `${API_URL}/expenses`,
      data: formattedExpense,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log('API response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to add expense');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error adding expense:', error);

    // Enhanced error logging
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request details:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    // Rethrow with more context if possible
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL}/expenses/${id}`, createAuthHeader());
    return id;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

// Update an expense
export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expense, createAuthHeader());
    return response.data.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};
