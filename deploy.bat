@echo off
echo ===================================================
echo    Expense Tracker Vercel Deployment Script
echo ===================================================
echo.
echo This script will automatically deploy both the frontend and backend to Vercel.
echo It will generate unique project names to avoid the 10 project limit.
echo.
echo Prerequisites:
echo  - Node.js installed
echo  - Internet connection
echo  - Vercel account (you'll be prompted to log in if needed)
echo.
echo The script will:
echo  1. Check if Vercel CLI is installed and install it if needed
echo  2. Log you in to Vercel if needed
echo  3. Generate unique project names for frontend and backend
echo  4. Deploy the backend API
echo  5. Deploy the frontend application
echo  6. Configure them to work together
echo.
echo Press Ctrl+C to cancel or any key to continue...
pause > nul

echo.
echo Starting deployment process...
echo.

powershell -ExecutionPolicy Bypass -Command "node deploy.cjs"

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Deployment failed. Please check the error messages above.
  echo.
  echo Common issues:
  echo  - Network connectivity problems
  echo  - Vercel authentication issues
  echo  - Node.js or npm errors
  echo.
  echo Try running 'vercel login' manually before retrying.
  echo.
) else (
  echo.
  echo Deployment completed successfully!
  echo.
  echo Your application should now be accessible at the URLs shown above.
  echo.
)

pause
