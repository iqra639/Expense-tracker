import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Uncategorized');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Predefined categories
  const categories = [
    'Uncategorized',
    'Food',
    'Transportation',
    'Housing',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Shopping',
    'Personal'
  ];

  const handleSubmit = async (e) => {
    // e.preventDefault() is now in the onSubmit handler
    setFormError('');
    console.log('Form submitted');

    try {
      // Form validation
      if (!title.trim()) {
        setFormError('Please enter a title');
        console.log('Title validation failed');
        return;
      }

      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        setFormError('Please enter a valid amount greater than zero');
        console.log('Amount validation failed:', amount);
        return;
      }

      // Format the expense object
      const parsedAmount = parseFloat(amount);
      console.log('Parsed amount:', parsedAmount);

      // Create the expense object with the correct format
      const newExpense = {
        title: title.trim(),
        amount: type === 'income' ? parsedAmount : -parsedAmount,
        category: type === 'income' ? 'Income' : category,
        date: date
      };

      console.log('Submitting expense:', newExpense);

      // Set submitting state to show loading indicator
      setIsSubmitting(true);

      // Call the API to add the expense
      const result = await addExpense(newExpense);
      console.log('Expense added successfully:', result);

      // Reset form fields after successful submission
      setTitle('');
      setAmount('');
      setType('expense');
      setCategory('Uncategorized');
      setDate(new Date().toISOString().split('T')[0]);
      setFormError('');

      // Show success message
      alert('Transaction added successfully!');

      // Refresh the page to show the new transaction
      window.location.reload();

    } catch (error) {
      console.error('Error submitting form:', error);

      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);

        if (error.response.data && error.response.data.error) {
          // Use the error message from the server if available
          setFormError(error.response.data.error);
        } else {
          setFormError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setFormError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        setFormError(error.message || 'An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
        />
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
          min="0"
        />
      </div>
      <div className="form-control">
        <label>Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            Income
          </label>
        </div>
      </div>

      <div className="form-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {type === 'expense' && (
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
      {formError && <div className="form-error">{formError}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          type="button"
          className="btn"
          disabled={isSubmitting}
          onClick={() => {
            console.log('Add Transaction button clicked');
            handleSubmit();
          }}
          style={{ backgroundColor: '#007bff' }}
        >
          {isSubmitting ? 'Adding...' : 'Add Transaction'}
        </button>

        <button
          type="button"
          className="btn"
          style={{ backgroundColor: '#28a745' }}
          onClick={() => {
            console.log('Test button clicked');
            const testExpense = {
              title: 'Test Expense',
              amount: -50,
              category: 'Test',
              date: new Date().toISOString().split('T')[0]
            };
            addExpense(testExpense);
          }}
        >
          Add Test Transaction
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
