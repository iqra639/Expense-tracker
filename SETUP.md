# Expense Tracker Setup Guide

This guide will help you set up and run the Expense Tracker application properly.

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

## Troubleshooting

If you encounter any issues:

1. **Check Application Health**
   ```
   .\check-health.bat
   ```
   This will check if the frontend and backend are running properly.

2. **Fix Common Issues**
   ```
   .\fix-issues.bat
   ```
   This will fix common issues like missing environment files, port conflicts, etc.

## Manual Setup

### Environment Files

1. **Frontend (.env)**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Iqra's Expense Tracker
   VITE_APP_VERSION=1.0.0
   ```

2. **Backend (.env)**
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://ziqra:ZhrRifsN4bOpcZFg@cluster0.4vpmc.mongodb.net/expense-tracker?retryWrites=true&w=majority
   JWT_SECRET=iqra_expense_tracker_secure_jwt_key_2024
   NODE_ENV=development
   ALLOW_ORIGIN=http://localhost:5173
   ```

### Installing Dependencies

1. **Frontend**
   ```
   npm install
   ```

2. **Backend**
   ```
   cd backend
   npm install
   cd ..
   ```

### Starting the Application Manually

1. **Start Backend**
   ```
   cd backend
   node server.js
   ```

2. **Start Frontend (in a new terminal)**
   ```
   npm run dev
   ```

## Common Issues and Solutions

### "Failed to fetch expenses" Error

This usually means the backend is not running or there's a CORS issue.

**Solution:**
1. Make sure the backend is running on port 5000
2. Check that the CORS settings in the backend allow requests from the frontend
3. Verify that the frontend is using the correct API URL

### "Your subscription for account iqrazafarzafar647@gmail.com is inactive"

This is related to the Augment service, not your application.

**Solution:**
1. Sign out and sign in with a different account that has an active subscription
2. Update your plan on the Augment website

### Port Conflicts

If port 5000 or 5173 is already in use:

**Solution:**
1. Change the backend port in backend/.env
2. Update the frontend API URL in .env to match the new backend port
3. Restart both servers

## Deployment

For deployment instructions, please refer to the main README.md file.
