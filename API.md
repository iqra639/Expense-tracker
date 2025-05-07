# Expense Tracker API Documentation

This document provides information about the API endpoints used in the Expense Tracker application.

## Base URL

The base URL for all API endpoints is defined in the environment variables:

- Development: `http://localhost:5000/api`
- Production: Defined in the Vercel environment variables

## Authentication

Most endpoints require authentication using JWT (JSON Web Token).

- Token is obtained during login or registration
- Token should be included in the Authorization header as `Bearer <token>`
- Token expires after the period defined in JWT_EXPIRY (default: 7 days)

## Endpoints

### Health Check

#### GET /api/health

Check if the API server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Authentication

#### POST /api/auth/register

Register a new user.

**Request Body:**
```json
{
  "username": "Iqra",
  "email": "Iqrazafarzafar647@gmail.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "1",
    "username": "Iqra",
    "email": "Iqrazafarzafar647@gmail.com"
  }
}
```

#### POST /api/auth/login

Login a user.

**Request Body:**
```json
{
  "email": "Iqrazafarzafar647@gmail.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "1",
    "username": "Iqra",
    "email": "Iqrazafarzafar647@gmail.com"
  }
}
```

#### GET /api/auth/me

Get the current user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "username": "Iqra",
    "email": "Iqrazafarzafar647@gmail.com"
  }
}
```

### Expenses

#### GET /api/expenses

Get all expenses.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "1",
      "title": "Groceries",
      "amount": -50.25,
      "category": "Food",
      "date": "2023-04-15T00:00:00.000Z",
      "createdAt": "2023-04-15T00:00:00.000Z",
      "userId": "1"
    },
    {
      "_id": "2",
      "title": "Salary",
      "amount": 2000,
      "category": "Income",
      "date": "2023-04-01T00:00:00.000Z",
      "createdAt": "2023-04-01T00:00:00.000Z",
      "userId": "1"
    },
    {
      "_id": "3",
      "title": "Rent",
      "amount": -800,
      "category": "Housing",
      "date": "2023-04-05T00:00:00.000Z",
      "createdAt": "2023-04-05T00:00:00.000Z",
      "userId": "1"
    }
  ]
}
```

#### POST /api/expenses

Add a new expense.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Groceries",
  "amount": -50.25,
  "category": "Food",
  "date": "2023-04-15"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "4",
    "title": "Groceries",
    "amount": -50.25,
    "category": "Food",
    "date": "2023-04-15T00:00:00.000Z",
    "createdAt": "2023-04-15T00:00:00.000Z",
    "userId": "1"
  }
}
```

#### PUT /api/expenses/:id

Update an expense.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Groceries",
  "amount": -60.25,
  "category": "Food",
  "date": "2023-04-16"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "1",
    "title": "Updated Groceries",
    "amount": -60.25,
    "category": "Food",
    "date": "2023-04-16T00:00:00.000Z",
    "createdAt": "2023-04-15T00:00:00.000Z",
    "updatedAt": "2023-04-16T00:00:00.000Z",
    "userId": "1"
  }
}
```

#### DELETE /api/expenses/:id

Delete an expense.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

## Environment Variables

### Frontend (.env)

```
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application Information
VITE_APP_NAME=Iqra's Expense Tracker
VITE_APP_VERSION=1.0.0

# Authentication Settings
VITE_AUTH_ENABLED=true
VITE_AUTH_TOKEN_EXPIRY=7d
```

### Backend (.env)

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://ziqra:ZhrRifsN4bOpcZFg@cluster0.4vpmc.mongodb.net/expense-tracker?retryWrites=true&w=majority

# Authentication
JWT_SECRET=iqra_expense_tracker_secure_jwt_key_2024
JWT_EXPIRY=7d

# CORS Settings
ALLOW_ORIGIN=http://localhost:5173

# API Settings
API_PREFIX=/api
API_VERSION=v1
```
