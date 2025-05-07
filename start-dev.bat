@echo on
echo Starting Expense Tracker Development Environment...
echo.

echo Checking environment files...
if not exist .env (
  echo Creating frontend .env file...
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
)

if not exist backend\.env (
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
)

echo.
echo Starting Backend Server...
start cmd /k "cd backend && node server.js"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
start cmd /k "npm run dev"

echo.
echo Both servers are now running!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000/api
echo.
echo Press any key to open the application in your browser...
pause > nul
start http://localhost:5173
