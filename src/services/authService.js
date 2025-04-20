// Mock Auth Service
// This file provides mock implementations of authentication functions
// for development and testing purposes

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Register user
export const register = async (userData) => {
  console.log('Mock register service called with:', userData);

  // Simulate API delay
  await delay(800);

  // Always return success for mock
  return {
    success: true,
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: Math.floor(Math.random() * 1000) + 1,
      username: 'Iqra',
      email: 'Iqrazafarzafar647@gmail.com'
    }
  };
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
      localStorage.setItem('user', JSON.stringify(user));

      return {
        success: true,
        token,
        user
      };
    }

    // Otherwise, try to use the API
    console.log('Attempting to login via API');
    return {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        username: 'Iqra',
        email: 'Iqrazafarzafar647@gmail.com'
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Invalid email or password. Try test@example.com / password123'
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

    if (token.includes('mock-jwt-token')) {
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
