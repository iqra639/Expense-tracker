@echo on
echo Fixing Common Issues in Expense Tracker Application...
echo.

echo 1. Checking and fixing environment files...
echo.

echo Recreating frontend .env file...
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
echo Frontend .env file updated.

echo.
echo Recreating backend .env file...
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
echo Backend .env file updated.

echo.
echo 2. Checking for port conflicts...
powershell -ExecutionPolicy Bypass -Command "Get-NetTCPConnection -LocalPort 5000,5173 -ErrorAction SilentlyContinue | Select-Object LocalPort,OwningProcess,@{Name='ProcessName';Expression={(Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue).ProcessName}} | Format-Table -AutoSize"

echo.
echo 3. Checking node_modules...
if not exist node_modules (
  echo Frontend node_modules not found. Installing dependencies...
  call npm install
) else (
  echo Frontend node_modules found.
)

if not exist backend\node_modules (
  echo Backend node_modules not found. Installing dependencies...
  cd backend
  call npm install
  cd ..
) else (
  echo Backend node_modules found.
)

echo.
echo 4. Clearing browser cache instructions:
echo - Chrome: Press Ctrl+Shift+Delete, select "Cached images and files", click "Clear data"
echo - Edge: Press Ctrl+Shift+Delete, select "Cached images and files", click "Clear now"
echo - Firefox: Press Ctrl+Shift+Delete, select "Cache", click "Clear Now"

echo.
echo Issues fixed! You can now run the application with:
echo   .\start-dev.bat
echo.
pause
