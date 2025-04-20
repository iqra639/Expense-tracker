import React, { useState, useEffect } from 'react';

const BudgetForm = ({ addBudget, updateBudget, budget, onCancel, expenses }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState([]);

  // Initialize form with budget data when editing
  useEffect(() => {
    if (budget) {
      setCategory(budget.category || '');
      setAmount(budget.amount ? budget.amount.toString() : '');
      setPeriod(budget.period || 'monthly');
    } else {
      // Reset form when not editing
      setCategory('');
      setAmount('');
      setPeriod('monthly');
    }
  }, [budget]);

  // Extract unique categories from expenses
  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const categories = new Set();
      
      expenses
        .filter(expense => expense.amount < 0) // Only consider expenses (negative amounts)
        .forEach(expense => {
          if (expense.category) {
            categories.add(expense.category);
          }
        });
      
      setSuggestedCategories(Array.from(categories));
    }
  }, [expenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate form
    if (!category) {
      setFormError('Category is required');
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount greater than zero');
      return;
    }

    try {
      setIsSubmitting(true);

      const budgetData = {
        category,
        amount: parseFloat(amount),
        period
      };

      if (budget) {
        // Update existing budget
        await updateBudget({
          ...budget,
          ...budgetData
        });
      } else {
        // Add new budget
        await addBudget(budgetData);
      }

      // Reset form after successful submission
      if (!budget) {
        setCategory('');
        setAmount('');
        setPeriod('monthly');
      }
      
      setFormError('');
    } catch (error) {
      console.error('Error submitting budget:', error);
      setFormError('Failed to save budget. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <div className="category-input-container">
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Food, Transportation"
            list="category-suggestions"
            required
          />
          <datalist id="category-suggestions">
            {suggestedCategories.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Budget Amount</label>
        <div className="amount-input-container">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="period">Budget Period</label>
        <select
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          required
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {formError && <div className="form-error">{formError}</div>}

      <div className="form-actions">
        {budget && (
          <button
            type="button"
            className="btn cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn primary-btn"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : budget
              ? 'Update Budget'
              : 'Add Budget'}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
