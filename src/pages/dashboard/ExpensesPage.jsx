import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ExpenseForm from '../../components/ExpenseForm';
import ExpenseList from '../../components/ExpenseList';

const ExpensesPage = ({ expenses, addExpense, deleteExpense, editExpense }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    // Filter by type
    if (filter === 'income' && expense.amount <= 0) return false;
    if (filter === 'expense' && expense.amount > 0) return false;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        expense.title.toLowerCase().includes(term) ||
        (expense.category && expense.category.toLowerCase().includes(term))
      );
    }
    
    return true;
  });
  
  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortBy === 'amount') {
      return sortOrder === 'asc' 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    }
    
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    
    return 0;
  });
  
  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <DashboardLayout>
      <div className="expenses-page">
        {/* Filters and Search */}
        <div className="dashboard-section">
          <div className="filters-container">
            <div className="filter-group">
              <label>Filter:</label>
              <div className="filter-buttons">
                <button 
                  className={filter === 'all' ? 'active' : ''} 
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={filter === 'income' ? 'active' : ''} 
                  onClick={() => setFilter('income')}
                >
                  Income
                </button>
                <button 
                  className={filter === 'expense' ? 'active' : ''} 
                  onClick={() => setFilter('expense')}
                >
                  Expenses
                </button>
              </div>
            </div>
            
            <div className="search-group">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchTerm('')}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Add New Expense */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3 className="section-title">Add New Transaction</h3>
          </div>
          <ExpenseForm addExpense={addExpense} />
        </div>
        
        {/* Expenses List */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3 className="section-title">
              Transactions ({filteredExpenses.length})
            </h3>
            <div className="sort-controls">
              <span>Sort by:</span>
              <button 
                className={sortBy === 'date' ? 'active' : ''} 
                onClick={() => toggleSort('date')}
              >
                Date {sortBy === 'date' && (
                  <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </button>
              <button 
                className={sortBy === 'amount' ? 'active' : ''} 
                onClick={() => toggleSort('amount')}
              >
                Amount {sortBy === 'amount' && (
                  <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </button>
              <button 
                className={sortBy === 'title' ? 'active' : ''} 
                onClick={() => toggleSort('title')}
              >
                Title {sortBy === 'title' && (
                  <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </button>
            </div>
          </div>
          
          {sortedExpenses.length === 0 ? (
            <p className="no-expenses">No transactions found</p>
          ) : (
            <ExpenseList expenses={sortedExpenses} deleteExpense={deleteExpense} editExpense={editExpense} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpensesPage;
