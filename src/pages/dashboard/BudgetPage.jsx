import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import BudgetForm from '../../components/budget/BudgetForm';
import BudgetList from '../../components/budget/BudgetList';
import { getBudgets, addBudget, deleteBudget, updateBudget, updateBudgetSpending } from '../../services/budgetService';
import '../../styles/budget.css';

const BudgetPage = ({ expenses }) => {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  // Fetch budgets when component mounts
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setIsLoading(true);
        let data = await getBudgets();
        
        // Update spent amounts based on expenses
        data = updateBudgetSpending(data, expenses);
        
        setBudgets(data);
        
        // Calculate totals
        const total = data.reduce((sum, budget) => sum + budget.amount, 0);
        const spent = data.reduce((sum, budget) => sum + budget.spent, 0);
        
        setTotalBudget(total);
        setTotalSpent(spent);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching budgets:', err);
        setError('Failed to load budgets. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudgets();
  }, [expenses]);

  // Add a new budget
  const handleAddBudget = async (budget) => {
    try {
      const newBudget = await addBudget(budget);
      
      // Update budgets list
      const updatedBudgets = [...budgets.filter(b => b.category !== budget.category), newBudget];
      const updatedBudgetsWithSpending = updateBudgetSpending(updatedBudgets, expenses);
      
      setBudgets(updatedBudgetsWithSpending);
      
      // Recalculate totals
      const total = updatedBudgetsWithSpending.reduce((sum, b) => sum + b.amount, 0);
      const spent = updatedBudgetsWithSpending.reduce((sum, b) => sum + b.spent, 0);
      
      setTotalBudget(total);
      setTotalSpent(spent);
      
      return newBudget;
    } catch (err) {
      console.error('Error adding budget:', err);
      setError('Failed to add budget. Please try again.');
      throw err;
    }
  };

  // Delete a budget
  const handleDeleteBudget = async (id) => {
    try {
      await deleteBudget(id);
      
      // Update budgets list
      const updatedBudgets = budgets.filter(budget => budget._id !== id);
      setBudgets(updatedBudgets);
      
      // Recalculate totals
      const total = updatedBudgets.reduce((sum, budget) => sum + budget.amount, 0);
      const spent = updatedBudgets.reduce((sum, budget) => sum + budget.spent, 0);
      
      setTotalBudget(total);
      setTotalSpent(spent);
    } catch (err) {
      console.error('Error deleting budget:', err);
      setError('Failed to delete budget. Please try again.');
    }
  };

  // Edit a budget
  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
  };

  // Update a budget
  const handleUpdateBudget = async (updatedBudget) => {
    try {
      const result = await updateBudget(updatedBudget._id, updatedBudget);
      
      // Update budgets list
      const updatedBudgets = budgets.map(budget => 
        budget._id === result._id ? result : budget
      );
      
      setBudgets(updatedBudgets);
      setEditingBudget(null);
      
      // Recalculate totals
      const total = updatedBudgets.reduce((sum, budget) => sum + budget.amount, 0);
      const spent = updatedBudgets.reduce((sum, budget) => sum + budget.spent, 0);
      
      setTotalBudget(total);
      setTotalSpent(spent);
    } catch (err) {
      console.error('Error updating budget:', err);
      setError('Failed to update budget. Please try again.');
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingBudget(null);
  };

  return (
    <DashboardLayout>
      <div className="budget-page">
        <div className="budget-header">
          <h2>Budget Management</h2>
          <div className="budget-summary">
            <div className="budget-summary-item">
              <span className="budget-summary-label">Total Budget:</span>
              <span className="budget-summary-value">${totalBudget.toFixed(2)}</span>
            </div>
            <div className="budget-summary-item">
              <span className="budget-summary-label">Total Spent:</span>
              <span className="budget-summary-value">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="budget-summary-item">
              <span className="budget-summary-label">Remaining:</span>
              <span className={`budget-summary-value ${totalBudget - totalSpent >= 0 ? 'positive' : 'negative'}`}>
                ${(totalBudget - totalSpent).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="budget-content">
          <div className="budget-form-container">
            <h3>{editingBudget ? 'Edit Budget' : 'Add New Budget'}</h3>
            <BudgetForm 
              addBudget={handleAddBudget} 
              updateBudget={handleUpdateBudget}
              budget={editingBudget}
              onCancel={handleCancelEdit}
              expenses={expenses}
            />
          </div>

          <div className="budget-list-container">
            <h3>Your Budgets</h3>
            {isLoading ? (
              <div className="loading">Loading budgets...</div>
            ) : (
              <BudgetList 
                budgets={budgets} 
                deleteBudget={handleDeleteBudget} 
                editBudget={handleEditBudget}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BudgetPage;
