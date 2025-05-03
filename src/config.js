// API URL from environment variables with fallback
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Environment detection
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;
