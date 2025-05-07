@echo on
echo Building and deploying backend to Vercel...
echo.
echo This will deploy the backend API to Vercel with a new project name.
echo.

rem Change to backend directory
cd backend

rem Deploy to Vercel
echo Deploying to Vercel...
npx vercel --prod

echo.
echo Deployment completed!
pause
