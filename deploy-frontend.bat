@echo on
echo Building and deploying frontend to Vercel...
echo.
echo This will build the frontend and deploy it to Vercel with a new project name.
echo.

rem Build the project
echo Building project...
npm run build

rem Deploy to Vercel
echo Deploying to Vercel...
npx vercel --prod

echo.
echo Deployment completed!
pause
