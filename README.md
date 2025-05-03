# Expense Tracker Application

A comprehensive expense tracking application with budget management, analytics, and AI-powered insights. Built with React, Vite, and MongoDB.

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

### Deploying to Vercel

1. Install Vercel CLI (optional)
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

3. Set up environment variables in Vercel
   - Go to your project settings in Vercel
   - Add the following environment variables:
     - `VITE_API_URL`: Your API URL

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
