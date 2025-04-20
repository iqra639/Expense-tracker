import React from 'react';

const BudgetItem = ({ budget, deleteBudget, editBudget }) => {
  const { _id, category, amount, spent, period } = budget;
  
  // Calculate percentage spent
  const percentSpent = amount > 0 ? (spent / amount) * 100 : 0;
  
  // Determine status based on percentage spent
  const getStatus = () => {
    if (percentSpent >= 100) return 'over-budget';
    if (percentSpent >= 75) return 'warning';
    return 'good';
  };
  
  const status = getStatus();
  
  // Format period for display
  const formatPeriod = (period) => {
    switch (period) {
      case 'weekly':
        return 'Weekly';
      case 'yearly':
        return 'Yearly';
      case 'monthly':
      default:
        return 'Monthly';
    }
  };

  return (
    <div className={`budget-item ${status}`}>
      <div className="budget-item-header">
        <h4 className="budget-category">{category}</h4>
        <div className="budget-actions">
          <button
            onClick={() => editBudget(budget)}
            className="edit-btn"
            aria-label={`Edit ${category} budget`}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete the ${category} budget?`)) {
                deleteBudget(_id);
              }
            }}
            className="delete-btn"
            aria-label={`Delete ${category} budget`}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      
      <div className="budget-details">
        <div className="budget-amount-container">
          <div className="budget-amount">
            <span className="amount-label">Budget:</span>
            <span className="amount-value">${amount.toFixed(2)}</span>
          </div>
          <div className="budget-period">{formatPeriod(period)}</div>
        </div>
        
        <div className="budget-spent">
          <span className="spent-label">Spent:</span>
          <span className="spent-value">${spent.toFixed(2)}</span>
        </div>
        
        <div className="budget-remaining">
          <span className="remaining-label">Remaining:</span>
          <span className={`remaining-value ${amount - spent >= 0 ? 'positive' : 'negative'}`}>
            ${(amount - spent).toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="budget-progress-container">
        <div className="budget-progress-bar">
          <div 
            className="budget-progress" 
            style={{ width: `${Math.min(percentSpent, 100)}%` }}
          ></div>
        </div>
        <div className="budget-progress-label">
          {percentSpent.toFixed(0)}% used
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
