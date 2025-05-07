# Deployment Guide for Expense Tracker

This guide will help you deploy your Expense Tracker application to Vercel.

## Prerequisites

- A Vercel account
- Your backend API deployed to a hosting service (Heroku, Render, Railway, etc.)

## Deploying the Frontend to Vercel

### Step 1: Set up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Settings" tab
4. Click on "Environment Variables"
5. Add the following environment variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | VITE_API_URL | https://expense-tracker-api-iqra.vercel.app/api | Production, Preview, Development |
   | VITE_APP_NAME | Iqra's Expense Tracker | Production, Preview, Development |
   | VITE_APP_VERSION | 1.0.0 | Production, Preview, Development |
   | VITE_AUTH_ENABLED | true | Production, Preview, Development |
   | VITE_AUTH_TOKEN_EXPIRY | 7d | Production, Preview, Development |

   Note: The API URL is already configured in your vercel.json file, but it's good practice to also set it as an environment variable in the Vercel dashboard.

### Step 2: Vercel Configuration

Your project already includes a `vercel.json` file with the following configuration:

```json
{
  "version": 2,
  "name": "iqra-expense-tracker-2024",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist",
        "buildCommand": "npm run build"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*\\.(js|css|ico|png|jpg|jpeg|svg|webp|json))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "github": {
    "silent": true
  },
  "env": {
    "VITE_API_URL": "https://expense-tracker-api-iqra.vercel.app/api"
  }
}
```

This configuration:
- Sets up the build process for your React application
- Configures proper routing for static assets and client-side routing
- Sets the API URL environment variable

### Step 3: Deploy Your Application

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect your configuration from the vercel.json file
3. Click "Deploy"

## Deploying the Backend

### Option 1: Deploy to Heroku

1. Create a new Heroku app
2. Add the following environment variables in Heroku:
   - PORT: 5000
   - NODE_ENV: production
   - MONGO_URI: your-mongodb-connection-string
   - JWT_SECRET: your-jwt-secret
   - JWT_EXPIRY: 7d
   - ALLOW_ORIGIN: https://your-vercel-app-url.vercel.app

3. Deploy your backend to Heroku

### Option 2: Deploy to Render

1. Create a new Web Service in Render
2. Add the following environment variables:
   - PORT: 5000
   - NODE_ENV: production
   - MONGO_URI: your-mongodb-connection-string
   - JWT_SECRET: your-jwt-secret
   - JWT_EXPIRY: 7d
   - ALLOW_ORIGIN: https://your-vercel-app-url.vercel.app

3. Deploy your backend to Render

## Troubleshooting

### CORS Issues

If you encounter CORS issues, make sure:

1. Your backend's ALLOW_ORIGIN environment variable includes your frontend's URL
2. Your backend has proper CORS middleware configured

### Environment Variable Issues

If your environment variables aren't being recognized:

1. Check that they're properly set in Vercel
2. Make sure they're prefixed with `VITE_` for client-side access
3. Redeploy your application after updating environment variables

### API Connection Issues

If your frontend can't connect to your backend:

1. Verify your backend is running and accessible
2. Check that the VITE_API_URL is correctly set
3. Ensure your backend's CORS settings allow requests from your frontend
