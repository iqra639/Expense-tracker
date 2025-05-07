@echo on
echo Starting Frontend Server...
echo Make sure the backend server is running on port 5000
echo API URL is set to: %VITE_API_URL%
echo.
set VITE_API_URL=http://localhost:5000/api
npm run dev
pause
