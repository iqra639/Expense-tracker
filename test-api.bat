@echo on
echo Testing Expense Tracker API...
echo.
echo This will test all API endpoints to ensure they are working correctly.
echo Make sure the backend server is running at http://localhost:5000
echo.

echo Checking environment files...
if not exist .env (
  echo Frontend .env file not found. Creating...
  echo VITE_API_URL=http://localhost:5000/api > .env
  echo VITE_APP_NAME=Iqra's Expense Tracker >> .env
  echo VITE_APP_VERSION=1.0.0 >> .env
  echo VITE_AUTH_ENABLED=true >> .env
  echo VITE_AUTH_TOKEN_EXPIRY=7d >> .env
)

if not exist backend\.env (
  echo Backend .env file not found. Creating...
  echo PORT=5000 > backend\.env
  echo NODE_ENV=development >> backend\.env
  echo MONGO_URI=mongodb+srv://ziqra:ZhrRifsN4bOpcZFg@cluster0.4vpmc.mongodb.net/expense-tracker?retryWrites=true^&w=majority >> backend\.env
  echo JWT_SECRET=iqra_expense_tracker_secure_jwt_key_2024 >> backend\.env
  echo JWT_EXPIRY=7d >> backend\.env
  echo ALLOW_ORIGIN=http://localhost:5173 >> backend\.env
  echo API_PREFIX=/api >> backend\.env
  echo API_VERSION=v1 >> backend\.env
)

echo.
echo Running API tests...
node test-api.js

echo.
echo Tests completed!
pause
