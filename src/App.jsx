import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { getExpenses, addExpense as addExpenseAPI, deleteExpense as deleteExpenseAPI, updateExpense as updateExpenseAPI } from './services/expenseService'

// Pages
import HomePage from './pages/HomePage'
import NewLoginPage from './pages/NewLoginPage'
import RegisterPage from './pages/RegisterPage'

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome'
import ExpensesPage from './pages/dashboard/ExpensesPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'
import AboutPage from './pages/dashboard/AboutPage'
import SettingsPage from './pages/dashboard/SettingsPage'
import BudgetPage from './pages/dashboard/BudgetPage'

// Import styles
import './styles/settings.css'
import './styles/budget.css'

// AI Components
import AIAssistant from './components/AIAssistant'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div className="loading">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Main App component that uses AuthContext
const AppContent = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useContext(AuthContext);

  // Fetch expenses from API when component mounts or when authentication state changes
  useEffect(() => {
    const fetchExpenses = async (retryCount = 0) => {
      try {
        setIsLoading(true);
        const data = await getExpenses();
        setExpenses(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching expenses:', err);

        // Check if error is due to authentication
        if (err.response && err.response.status === 401) {
          setError('Please login to view your expenses');
          setExpenses([]);
        } else {
          // Retry up to 3 times with increasing delay
          if (retryCount < 3) {
            const delay = 1000 * Math.pow(2, retryCount); // Exponential backoff: 1s, 2s, 4s
            console.log(`Retrying in ${delay/1000} seconds... (Attempt ${retryCount + 1}/3)`);

            setTimeout(() => {
              fetchExpenses(retryCount + 1);
            }, delay);
          } else {
            setError('Failed to fetch expenses. Please try again later.');
          }
        }
      } finally {
        if (retryCount === 0) { // Only set loading to false after initial attempt or final retry
          setIsLoading(false);
        }
      }
    };

    fetchExpenses();
  }, [isAuthenticated, token]);

  // Add a new expense
  const addExpense = async (expense) => {
    console.log('App.jsx: addExpense called with:', expense);
    try {
      const newExpense = await addExpenseAPI(expense);
      console.log('App.jsx: API returned new expense:', newExpense);
      setExpenses([...expenses, newExpense]);
      return newExpense; // Return the new expense for the form to use
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error('Error adding expense:', err);
      throw err; // Re-throw the error for the form to catch
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    try {
      await deleteExpenseAPI(id);
      // Filter out the deleted expense by its ID
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error('Error deleting expense:', err);
    }
  };

  // Edit an expense
  const editExpense = async (updatedExpense) => {
    try {
      const result = await updateExpenseAPI(updatedExpense._id, updatedExpense);
      // Update the expense in the state
      setExpenses(expenses.map(expense =>
        expense._id === updatedExpense._id ? result : expense
      ));
    } catch (err) {
      setError('Failed to update expense. Please try again.');
      console.error('Error updating expense:', err);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<NewLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <HomePage
                expenses={expenses}
                addExpense={addExpense}
                deleteExpense={deleteExpense}
                editExpense={editExpense}
                error={error}
                isLoading={isLoading}
              />
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome expenses={expenses} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/expenses"
            element={
              <ProtectedRoute>
                <ExpensesPage
                  expenses={expenses}
                  addExpense={addExpense}
                  deleteExpense={deleteExpense}
                  editExpense={editExpense}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage expenses={expenses} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/budget"
            element={
              <ProtectedRoute>
                <BudgetPage expenses={expenses} />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* AI Assistant - only show when authenticated */}
        {isAuthenticated && <AIAssistant expenses={expenses} />}
      </div>
    </Router>
  )
}

// Wrapper component that provides AuthContext
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
