@echo on
echo Starting Backend Server on port 5000...
echo Make sure MongoDB is properly configured in the .env file
echo.
cd backend
node server.js
pause
