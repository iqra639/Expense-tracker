import React, { useState, useEffect } from 'react';

const EditExpenseModal = ({ expense, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');

  // Initialize form with expense data when it changes
  useEffect(() => {
    if (expense) {
      setTitle(expense.title || '');
      // Convert amount to positive for the form
      setAmount(Math.abs(expense.amount).toString());
      // Set type based on amount sign
      setType(expense.amount < 0 ? 'expense' : 'income');
      
      // Format date for input field (YYYY-MM-DD)
      const expenseDate = new Date(expense.date || expense.createdAt);
      const formattedDate = expenseDate.toISOString().split('T')[0];
      setDate(formattedDate);
      
      setCategory(expense.category || '');
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !amount) {
      return;
    }
    
    // Create updated expense object
    const updatedExpense = {
      ...expense,
      title,
      // Apply negative sign for expenses
      amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      date,
      category: category || undefined
    };
    
    onSave(updatedExpense);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Transaction</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          
          <div className="form-control">
            <label>Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          
          <div className="form-control">
            <label>Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                />
                <span>Expense</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                />
                <span>Income</span>
              </label>
            </div>
          </div>
          
          <div className="form-control">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="form-control">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Housing">Housing</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Shopping">Shopping</option>
              <option value="Personal">Personal</option>
              <option value="Travel">Travel</option>
              <option value="Salary">Salary</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
