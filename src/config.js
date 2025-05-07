// API URL from environment variables with fallback
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log the API URL for debugging
console.log('API URL from environment:', import.meta.env.VITE_API_URL);
console.log('Using API URL:', apiUrl);

// Export API URL
export const API_URL = apiUrl;

// Application information
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Iqra\'s Expense Tracker';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Authentication settings
export const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === 'true';
export const AUTH_TOKEN_EXPIRY = import.meta.env.VITE_AUTH_TOKEN_EXPIRY || '7d';

// Environment detection
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;

// Log configuration
console.log('App Configuration:', {
  API_URL,
  APP_NAME,
  APP_VERSION,
  AUTH_ENABLED,
  AUTH_TOKEN_EXPIRY,
  IS_PRODUCTION,
  IS_DEVELOPMENT
});
