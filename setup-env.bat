@echo off
echo Setting up environment variables for Expense Tracker...
echo.

echo Creating .env file for local development...
echo # API Configuration > .env
echo VITE_API_URL=http://localhost:5000/api >> .env
echo. >> .env
echo # Application Information >> .env
echo VITE_APP_NAME=Iqra's Expense Tracker >> .env
echo VITE_APP_VERSION=1.0.0 >> .env
echo. >> .env
echo # Authentication Settings >> .env
echo VITE_AUTH_ENABLED=true >> .env
echo VITE_AUTH_TOKEN_EXPIRY=7d >> .env

echo Creating .env.local file for local development...
echo # API Configuration for local development > .env.local
echo VITE_API_URL=http://localhost:5000/api >> .env.local
echo. >> .env.local
echo # Application Information >> .env.local
echo VITE_APP_NAME=Iqra's Expense Tracker >> .env.local
echo VITE_APP_VERSION=1.0.0 >> .env.local
echo. >> .env.local
echo # Authentication Settings >> .env.local
echo VITE_AUTH_ENABLED=true >> .env.local
echo VITE_AUTH_TOKEN_EXPIRY=7d >> .env.local

echo Creating .env.production file for production...
echo # API Configuration for production > .env.production
echo # This will be overridden by Vercel environment variables >> .env.production
echo VITE_API_URL=https://expense-tracker-api-iqra.vercel.app/api >> .env.production
echo. >> .env.production
echo # Application Information >> .env.production
echo VITE_APP_NAME=Iqra's Expense Tracker >> .env.production
echo VITE_APP_VERSION=1.0.0 >> .env.production
echo. >> .env.production
echo # Authentication Settings >> .env.production
echo VITE_AUTH_ENABLED=true >> .env.production
echo VITE_AUTH_TOKEN_EXPIRY=7d >> .env.production

echo Creating backend .env file...
echo # Server Configuration > backend\.env
echo PORT=5000 >> backend\.env
echo NODE_ENV=development >> backend\.env
echo. >> backend\.env
echo # Database Configuration >> backend\.env
echo MONGO_URI=mongodb+srv://ziqra:ZhrRifsN4bOpcZFg@cluster0.4vpmc.mongodb.net/expense-tracker?retryWrites=true^&w=majority >> backend\.env
echo. >> backend\.env
echo # Authentication >> backend\.env
echo JWT_SECRET=iqra_expense_tracker_secure_jwt_key_2024 >> backend\.env
echo JWT_EXPIRY=7d >> backend\.env
echo. >> backend\.env
echo # CORS Settings >> backend\.env
echo ALLOW_ORIGIN=http://localhost:5173 >> backend\.env
echo. >> backend\.env
echo # API Settings >> backend\.env
echo API_PREFIX=/api >> backend\.env
echo API_VERSION=v1 >> backend\.env

echo.
echo Environment variables set up successfully!
echo.
echo Next steps:
echo 1. Start the backend server: cd backend ^&^& node server.js
echo 2. Start the frontend server: npm run dev
echo.
echo For deployment, please refer to DEPLOYMENT.md
echo.
pause
