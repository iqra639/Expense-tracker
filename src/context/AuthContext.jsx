import React, { createContext, useState, useEffect } from 'react';
import { login as loginAPI, register as registerAPI, getCurrentUser } from '../services/authService';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial render if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const data = await getCurrentUser();

          if (data.success) {
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await registerAPI(userData);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError(data.error || 'Registration failed');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  // Login user
  const login = async (userData) => {
    setLoading(true);
    setError(null);

    console.log('Attempting login with:', userData);

    try {
      const data = await loginAPI(userData);
      console.log('Response data:', data);

      if (data.success) {
        console.log('Login successful, setting token and user');
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        console.log('Login failed:', data.error);
        setError(data.error || 'Invalid credentials');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
