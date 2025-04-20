import React from 'react';

const Dashboard = ({ expenses }) => {
  // Get expense categories and their totals
  const categories = {};
  
  expenses
    .filter(expense => expense.amount < 0)
    .forEach(expense => {
      const category = expense.category || 'Uncategorized';
      if (categories[category]) {
        categories[category] += Math.abs(expense.amount);
      } else {
        categories[category] = Math.abs(expense.amount);
      }
    });

  // Calculate total expenses
  const totalExpenses = Object.values(categories).reduce((acc, amount) => acc + amount, 0);

  return (
    <div className="dashboard-container">
      <h2>Expense Breakdown</h2>
      
      {Object.keys(categories).length === 0 ? (
        <p className="no-data">No expense data available</p>
      ) : (
        <div className="category-breakdown">
          {Object.entries(categories).map(([category, amount]) => {
            const percentage = totalExpenses ? (amount / totalExpenses) * 100 : 0;
            
            return (
              <div key={category} className="category-item">
                <div className="category-header">
                  <span className="category-name">{category}</span>
                  <span className="category-amount">${amount.toFixed(2)}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="percentage">{percentage.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
