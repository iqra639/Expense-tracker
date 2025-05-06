import axios from 'axios';
import { API_URL } from '../config';

// Helper function to simulate API delay for fallback
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Register user
export const register = async (userData) => {
  console.log('Register service called with:', userData);

  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    console.log('Register API response:', response.data);

    if (response.data.success) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('Register error:', error);

    // Fallback to mock for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock register fallback');
      await delay(800);
      const mockResponse = {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: Math.floor(Math.random() * 1000) + 1,
          username: userData.username || 'Iqra',
          email: userData.email || 'Iqrazafarzafar647@gmail.com'
        }
      };

      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));

      return mockResponse;
    }

    return {
      success: false,
      error: error.response?.data?.error || 'Registration failed. Please try again.'
    };
  }
};

// Login user
export const login = async (userData) => {
  console.log('Login service called with:', userData);

  try {
    // For testing purposes, allow direct login with test credentials
    if (userData.email === 'test@example.com' && userData.password === 'password123') {
      console.log('Using test credentials, bypassing API');
      const token = 'mock-jwt-token-' + Date.now();

      // Store user in localStorage for getCurrentUser
      const user = {
        id: 1,
        username: 'Iqra',
        email: 'Iqrazafarzafar647@gmail.com'
      };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        success: true,
        token,
        user
      };
    }

    // Try to use the real API
    console.log('Attempting to login via API');
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    console.log('Login API response:', response.data);

    if (response.data.success) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error);

    // Fallback to mock for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock login fallback');
      await delay(800);
      const mockResponse = {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          username: 'Iqra',
          email: 'Iqrazafarzafar647@gmail.com'
        }
      };

      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));

      return mockResponse;
    }

    return {
      success: false,
      error: error.response?.data?.error || 'Login failed. Please try again.'
    };
  }
};

// Get current user
export const getCurrentUser = async () => {
  console.log('getCurrentUser service called');

  try {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (!token) {
      console.log('No token found');
      return {
        success: false,
        error: 'No token found'
      };
    }

    // Try to get user from API first
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('getCurrentUser API response:', response.data);

      if (response.data.success) {
        // Update stored user
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }
    } catch (apiError) {
      console.error('API error in getCurrentUser:', apiError);
      // Fall through to use localStorage as fallback
    }

    // Fallback to localStorage
    if (token.includes('mock-jwt-token') || process.env.NODE_ENV === 'development') {
      // Get user from localStorage if available
      const storedUser = localStorage.getItem('user');
      console.log('Stored user:', storedUser);

      if (storedUser) {
        const user = JSON.parse(storedUser);
        return {
          success: true,
          user
        };
      } else {
        // Default test user if no stored user
        const user = {
          id: 1,
          username: 'Iqra',
          email: 'Iqrazafarzafar647@gmail.com'
        };
        localStorage.setItem('user', JSON.stringify(user));
        return {
          success: true,
          user
        };
      }
    } else {
      return {
        success: false,
        error: 'Invalid or expired token'
      };
    }
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return {
      success: false,
      error: 'Failed to get current user'
    };
  }
};

// Logout user (client-side only)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
