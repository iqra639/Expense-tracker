@echo on
echo Deploying Expense Tracker to Vercel...
echo.
echo This script will automatically deploy both the frontend and backend to Vercel.
echo It will generate unique project names to avoid naming conflicts.
echo.
powershell -ExecutionPolicy Bypass -Command "node deploy.js"
pause
