@echo on
echo Setting up Expense Tracker Application...
echo.

echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo Error installing frontend dependencies!
  pause
  exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo Error installing backend dependencies!
  cd ..
  pause
  exit /b 1
)
cd ..

echo.
echo Setup completed successfully!
echo.
echo To start the application, run:
echo   .\start-dev.bat
echo.
pause
