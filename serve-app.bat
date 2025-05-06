@echo on
echo Starting Static Server on port 8080...
echo Current directory: %CD%
echo.
echo If you see any errors, please report them.
echo.
node serve.js
echo.
if %ERRORLEVEL% NEQ 0 (
  echo Server failed to start with error code %ERRORLEVEL%
  echo Please check if you have Node.js installed and if port 8080 is available.
)
pause
