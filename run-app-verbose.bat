@echo on
echo Starting Expense Tracker Application with verbose output...
cd /d "%~dp0"
set DEBUG=vite:*
call npm run dev -- --debug
pause
