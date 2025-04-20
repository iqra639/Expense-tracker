import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import EditExpenseModal from './EditExpenseModal';

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  
  // Handle opening the edit modal
  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  // Handle saving the edited expense
  const handleSave = (updatedExpense) => {
    editExpense(updatedExpense);
    setEditingExpense(null);
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setEditingExpense(null);
  };

  return (
    <div className="expense-list-container">
      <h2>Transaction History</h2>
      {expenses.length === 0 ? (
        <p className="no-expenses">No transactions yet</p>
      ) : (
        <ul className="expense-list">
          {expenses.map(expense => (
            <ExpenseItem
              key={expense.id || expense._id}
              expense={expense}
              deleteExpense={deleteExpense}
              editExpense={handleEdit}
            />
          ))}
        </ul>
      )}
      
      {/* Edit Expense Modal */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ExpenseList;
