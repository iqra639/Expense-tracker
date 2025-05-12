# Troubleshooting Vercel Deployment Issues

This guide helps you resolve common issues when deploying your Expense Tracker application to Vercel.

## "A Git Repository cannot be connected to more than 10 Projects" Error

### Solution: Use the CLI Deployment Script

Our deployment script (`deploy.bat`) solves this issue by:
1. Creating unique project names for each deployment
2. Using the Vercel CLI with the `--name` flag to create new projects
3. Bypassing the Git repository connection entirely

Simply run:
```
deploy.bat
```

### Alternative Solutions

If the script doesn't work for you:

1. **Delete unused projects**:
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Find and delete old test deployments
   - Try connecting your repository again

2. **Create a new Git repository**:
   - Create a new repository on GitHub/GitLab/etc.
   - Push your code to this new repository
   - Connect this new repository to Vercel

## Vercel CLI Not Found

If you see "Vercel CLI not found" errors:

1. Install Vercel CLI manually:
   ```
   npm install -g vercel
   ```

2. Verify installation:
   ```
   vercel --version
   ```

## Authentication Issues

If you encounter authentication problems:

1. Log in manually:
   ```
   vercel login
   ```

2. Follow the prompts to authenticate via browser

3. Try deployment again:
   ```
   deploy.bat
   ```

## Backend Deployment Fails

If the backend deployment fails:

1. Check MongoDB connection:
   - Verify your MongoDB Atlas credentials
   - Ensure your IP is whitelisted in MongoDB Atlas

2. Check for syntax errors:
   - Run `node backend/server.js` locally to check for errors

3. Try deploying manually:
   ```
   cd backend
   vercel --prod
   ```

## Frontend Deployment Fails

If the frontend deployment fails:

1. Check build process:
   - Run `npm run build` locally to verify it works

2. Check environment variables:
   - Ensure `.env` file has correct values
   - Verify `vercel.json` has correct environment variables

3. Try deploying manually:
   ```
   npm run build
   vercel --prod
   ```

## Frontend Can't Connect to Backend

If your frontend deploys but can't connect to the backend:

1. Check CORS settings:
   - Verify `ALLOW_ORIGIN` in backend's environment variables
   - Ensure it includes your frontend URL

2. Check API URL:
   - Verify `VITE_API_URL` in frontend's environment variables
   - Ensure it points to the correct backend URL

3. Test backend API directly:
   - Visit `https://your-backend-url.vercel.app/api/health` in browser
   - Should return `{"status":"ok","message":"Server is running"}`

## Need More Help?

If you're still experiencing issues:

1. Check Vercel logs:
   - Go to your project in the Vercel dashboard
   - Click on the latest deployment
   - Check "Functions" and "Build" logs

2. Try a clean deployment:
   - Delete both frontend and backend projects from Vercel
   - Run `deploy.bat` again

3. Contact support:
   - Reach out to Vercel support
   - Provide deployment logs and error messages
