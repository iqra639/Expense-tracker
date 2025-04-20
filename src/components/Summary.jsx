import React from 'react';

const Summary = ({ expenses }) => {
  // Calculate total income
  const income = expenses
    .filter(expense => expense.amount > 0)
    .reduce((acc, expense) => acc + expense.amount, 0);

  // Calculate total expenses
  const expense = expenses
    .filter(expense => expense.amount < 0)
    .reduce((acc, expense) => acc + expense.amount, 0);

  // Calculate balance
  const balance = income + expense;

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Your Balance</h2>
        <div className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}>
          ${balance.toFixed(2)}
        </div>
      </div>
      <div className="summary-details">
        <div className="summary-item income">
          <h3>Income</h3>
          <p>${income.toFixed(2)}</p>
        </div>
        <div className="summary-item expense">
          <h3>Expenses</h3>
          <p>${Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
