# Vercel Deployment Guide for Expense Tracker

This guide explains how to deploy your Expense Tracker application to Vercel, even if you've hit the 10 project limit per repository.

## Deployment Options

### Option 1: Using the Automated Deployment Script (Recommended)

The project includes a deployment script that automatically:
- Creates unique project names for each deployment
- Deploys both frontend and backend
- Configures the frontend to connect to the backend
- Avoids the 10 project limit by creating new projects each time

#### Steps:

1. Make sure you have the Vercel CLI installed:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel if you haven't already:
   ```
   vercel login
   ```

3. Run the deployment script:
   ```
   deploy.bat
   ```

4. Follow the prompts in the terminal.

5. Once deployment is complete, you'll see URLs for both your frontend and backend.

### Option 2: Manual Deployment

If you prefer to deploy manually:

#### Backend Deployment:

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Deploy to Vercel:
   ```
   vercel --prod
   ```

3. When prompted:
   - Set up and deploy: Y
   - Link to existing project: N
   - Project name: iqra-expense-tracker-api-[unique-name]
   - Directory: ./
   - Override settings: Y
   - Build Command: None (just press Enter)
   - Output Directory: None (just press Enter)
   - Development Command: None (just press Enter)

4. Note the deployment URL.

#### Frontend Deployment:

1. Update the `.env.production` file with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

2. Build the frontend:
   ```
   npm run build
   ```

3. Deploy to Vercel:
   ```
   vercel --prod
   ```

4. When prompted:
   - Set up and deploy: Y
   - Link to existing project: N
   - Project name: iqra-expense-tracker-[unique-name]
   - Directory: ./dist
   - Override settings: Y
   - Build Command: None (just press Enter)
   - Output Directory: None (just press Enter)
   - Development Command: None (just press Enter)

## Troubleshooting

### 10 Project Limit Error

If you see "A Git Repository cannot be connected to more than 10 Projects", you have two options:

1. **Use the automated script**: The `deploy.bat` script creates new projects with unique names each time.

2. **Delete unused projects**: Go to your Vercel dashboard, find old test deployments, and delete them.

### CORS Issues

If your frontend can't connect to the backend, check:

1. The backend's CORS settings in `backend/server.js`
2. The `ALLOW_ORIGIN` environment variable in the backend's Vercel project
3. The `VITE_API_URL` environment variable in the frontend's Vercel project

### Environment Variables

If your application isn't working correctly, verify that all environment variables are set correctly in both projects.

## Vercel Project Management

To manage your Vercel projects:

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to "Settings" to configure environment variables, domains, etc.
4. Use "Deployments" to view deployment history and logs

Remember that each time you run the deployment script, new projects are created with unique names to avoid the 10 project limit.
