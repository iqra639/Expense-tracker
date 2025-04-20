import React from 'react';
import BudgetItem from './BudgetItem';

const BudgetList = ({ budgets, deleteBudget, editBudget }) => {
  // Sort budgets by category
  const sortedBudgets = [...budgets].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="budget-list">
      {sortedBudgets.length === 0 ? (
        <p className="no-budgets">No budgets set yet. Add your first budget to start tracking your spending.</p>
      ) : (
        <div className="budget-items">
          {sortedBudgets.map(budget => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              deleteBudget={deleteBudget}
              editBudget={editBudget}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetList;
