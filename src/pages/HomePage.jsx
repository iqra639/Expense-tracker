import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Summary from '../components/Summary';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';

const HomePage = ({ expenses, addExpense, deleteExpense, editExpense, error, isLoading }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        {!isAuthenticated ? (
          <div className="auth-banner">
            <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to manage your expenses.</p>
          </div>
        ) : (
          <div className="dashboard-banner">
            <p>Welcome back! Access your <Link to="/dashboard" className="dashboard-link">Dashboard</Link> for more detailed analytics and management tools.</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <div className="loading">Loading expenses...</div>
        ) : (
          <>
            <Summary expenses={expenses} />
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense} />
            <Dashboard expenses={expenses} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
