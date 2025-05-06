@echo on
echo Starting Frontend Development Server...
echo.
echo This will start the frontend development server for the Expense Tracker application.
echo The application will be available at http://localhost:5173
echo.
echo Make sure the backend server is running at http://localhost:5000
echo.
echo Press Ctrl+C to stop the server.
echo.
set VITE_API_URL=http://localhost:5000/api
npm run dev
pause
