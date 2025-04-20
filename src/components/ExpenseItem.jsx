import React from 'react';

const ExpenseItem = ({ expense, deleteExpense, editExpense }) => {
  // Extract properties from expense, handling both string _id and ObjectId
  const { _id, title, amount, date, createdAt, category } = expense;
  const isExpense = amount < 0;

  // Format date - use createdAt from MongoDB if date is not available
  const formattedDate = new Date(date || createdAt).toLocaleDateString();

  return (
    <li className={`expense-item ${isExpense ? 'expense' : 'income'}`}>
      <div className="expense-details">
        <h3>{title}</h3>
        <div className="expense-meta">
          <p className="expense-date">{formattedDate}</p>
          {category && <p className="expense-category">{category}</p>}
        </div>
      </div>
      <div className="expense-amount">
        <span>{isExpense ? '-' : '+'}${Math.abs(amount).toFixed(2)}</span>
        <div className="expense-actions">
          <button
            onClick={() => editExpense(expense)}
            className="edit-btn"
            aria-label="Edit transaction"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => deleteExpense(_id)}
            className="delete-btn"
            aria-label="Delete transaction"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ExpenseItem;
