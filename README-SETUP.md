# Expense Tracker Setup Guide

This guide provides detailed instructions for setting up and running the Expense Tracker application.

## Quick Start

1. **Initial Setup**
   ```
   .\setup.bat
   ```
   This will install all dependencies for both frontend and backend.

2. **Start Development Environment**
   ```
   .\start-dev.bat
   ```
   This will start both the frontend and backend servers and open the application in your browser.

## Environment Configuration

### Frontend (.env)

```
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application Information
VITE_APP_NAME=Iqra's Expense Tracker
VITE_APP_VERSION=1.0.0

# Authentication Settings
VITE_AUTH_ENABLED=true
VITE_AUTH_TOKEN_EXPIRY=7d
```

### Backend (.env)

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://ziqra:ZhrRifsN4bOpcZFg@cluster0.4vpmc.mongodb.net/expense-tracker?retryWrites=true&w=majority

# Authentication
JWT_SECRET=iqra_expense_tracker_secure_jwt_key_2024
JWT_EXPIRY=7d

# CORS Settings
ALLOW_ORIGIN=http://localhost:5173

# API Settings
API_PREFIX=/api
API_VERSION=v1
```

## Utility Scripts

The application comes with several utility scripts to help you manage it:

### setup.bat

Installs all dependencies for both frontend and backend.

```
.\setup.bat
```

### start-dev.bat

Starts both the frontend and backend servers and opens the application in your browser.

```
.\start-dev.bat
```

### check-health.bat

Checks if the frontend and backend servers are running properly.

```
.\check-health.bat
```

### fix-issues.bat

Fixes common issues like missing environment files, port conflicts, etc.

```
.\fix-issues.bat
```

### test-api.bat

Tests the API endpoints to ensure they're working correctly.

```
.\test-api.bat
```

## Troubleshooting

### Common Issues

1. **"Failed to fetch expenses" Error**

   This usually means the backend is not running or there's a CORS issue.

   **Solution:**
   - Make sure the backend is running on port 5000
   - Check that the CORS settings in the backend allow requests from the frontend
   - Verify that the frontend is using the correct API URL
   - Run `.\fix-issues.bat` to reset the environment files

2. **Port Conflicts**

   If port 5000 or 5173 is already in use:

   **Solution:**
   - Change the backend port in backend/.env
   - Update the frontend API URL in .env to match the new backend port
   - Restart both servers

3. **Missing Dependencies**

   If you see errors about missing modules:

   **Solution:**
   - Run `.\setup.bat` to install all dependencies
   - Or manually run `npm install` in both the root and backend directories

4. **JWT Token Issues**

   If you see authentication errors:

   **Solution:**
   - Make sure the JWT_SECRET is set correctly in backend/.env
   - Check that the token is being properly sent in the Authorization header
   - Try logging out and logging in again

## Manual Setup

If the utility scripts don't work for you, you can set up the application manually:

1. **Install Dependencies**
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

2. **Create Environment Files**
   - Create .env in the root directory with the frontend environment variables
   - Create .env in the backend directory with the backend environment variables

3. **Start the Backend**
   ```
   cd backend
   node server.js
   ```

4. **Start the Frontend (in a new terminal)**
   ```
   npm run dev
   ```

## API Documentation

For detailed API documentation, please refer to the API.md file.
