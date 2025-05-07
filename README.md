# Iqra's Expense Tracker Application

A comprehensive expense tracking application with budget management, analytics, and AI-powered insights. Built with React, Vite, and MongoDB.

## Quick Start

### Local Development

To start both the frontend and backend servers with a single command:

```bash
.\start-dev.bat
```

This will start:
- Backend server at http://localhost:5000
- Frontend development server at http://localhost:5173

## Features

- User authentication (login, registration)
- Expense tracking and categorization
- Budget management
- Interactive analytics and visualizations
- AI-powered insights and recommendations
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Chart.js, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: Custom CSS with responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Deployment

### Automated Deployment to Vercel

To deploy both the frontend and backend to Vercel with a single command:

```bash
.\deploy.bat
```

This script will:
1. Generate unique project names to avoid the "project already exists" error
2. Deploy the backend API first
3. Update the frontend environment variables to point to the deployed API
4. Build and deploy the frontend
5. Output the URLs for both deployments

### Manual Deployment

#### Important: Use a Unique Project Name

When deploying to Vercel, you might encounter this error:
```
Project "expense-tracker-7ct8" already exists, please use a new name.
```

To fix this:

1. Use a unique project name during deployment
2. Or update the `name` field in vercel.json to something unique

#### Frontend Deployment

1. Install Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. Build the frontend
   ```bash
   npm run build
   ```

3. Deploy to Vercel
   ```bash
   vercel --prod
   ```

4. When prompted for a project name, use something unique like:
   - `iqra-expense-tracker-2024`
   - `iqra-expense-tracker-app`
   - Or any other unique name

#### Backend API Deployment

1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Deploy to Vercel
   ```bash
   vercel --prod
   ```

3. When prompted for a project name, use something unique like:
   - `iqra-expense-tracker-api-2024`
   - `iqra-expense-tracker-backend`

4. After deployment, update the frontend environment variable:
   - Go to your project settings in Vercel
   - Add the following environment variables:
     - `VITE_API_URL`: Your deployed API URL (e.g., https://iqra-expense-tracker-api-2024.vercel.app/api)

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── context/        # Context providers
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── styles/         # CSS styles
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── vercel.json         # Vercel configuration
└── package.json        # Project dependencies
```

## License

This project is licensed under the MIT License.
