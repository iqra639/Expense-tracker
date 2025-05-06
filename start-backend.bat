@echo on
echo Starting Backend Server on port 5000...
echo.
echo This will start the backend API server for the Expense Tracker application.
echo The server will be available at http://localhost:5000/api
echo.
echo Press Ctrl+C to stop the server.
echo.
cd backend
node simple-server.js
pause
