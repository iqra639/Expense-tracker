import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Summary from '../../components/Summary';
import Dashboard from '../../components/Dashboard';

const DashboardHome = ({ expenses }) => {
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

  // Calculate savings rate (if income > 0)
  const savingsRate = income > 0 ? ((income + expense) / income) * 100 : 0;

  // Get recent transactions
  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="ai-dashboard-home">
        {/* Summary Cards */}
        <div className="ai-dashboard-grid">
          {/* Balance Card */}
          <div className="ai-col-3 ai-col-md-6 ai-col-sm-6 ai-col-xs-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Balance</div>
                <div className="ai-card-icon ai-icon-balance">
                  <i className="fas fa-wallet"></i>
                </div>
              </div>
              <div className={`ai-card-value ${balance >= 0 ? 'ai-value-positive' : 'ai-value-negative'}`}>
                ${balance.toFixed(2)}
              </div>
              <div className="ai-card-label">Current Balance</div>
              <div className="ai-card-footer">
                <div className={`ai-trend ${balance >= 0 ? 'ai-trend-up' : 'ai-trend-down'}`}>
                  <i className={`fas ${balance >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                  <span>{Math.abs(balance).toFixed(2)}</span>
                </div>
                <div className="ai-trend-period">This Month</div>
              </div>
            </div>
          </div>

          {/* Income Card */}
          <div className="ai-col-3 ai-col-md-6 ai-col-sm-6 ai-col-xs-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Income</div>
                <div className="ai-card-icon ai-icon-income">
                  <i className="fas fa-arrow-down"></i>
                </div>
              </div>
              <div className="ai-card-value ai-value-positive">
                ${income.toFixed(2)}
              </div>
              <div className="ai-card-label">Total Income</div>
              <div className="ai-card-footer">
                <div className="ai-trend ai-trend-up">
                  <i className="fas fa-arrow-up"></i>
                  <span>12.5%</span>
                </div>
                <div className="ai-trend-period">vs Last Month</div>
              </div>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="ai-col-3 ai-col-md-6 ai-col-sm-6 ai-col-xs-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Expenses</div>
                <div className="ai-card-icon ai-icon-expense">
                  <i className="fas fa-arrow-up"></i>
                </div>
              </div>
              <div className="ai-card-value ai-value-negative">
                ${Math.abs(expense).toFixed(2)}
              </div>
              <div className="ai-card-label">Total Expenses</div>
              <div className="ai-card-footer">
                <div className="ai-trend ai-trend-down">
                  <i className="fas fa-arrow-up"></i>
                  <span>8.2%</span>
                </div>
                <div className="ai-trend-period">vs Last Month</div>
              </div>
            </div>
          </div>

          {/* Savings Rate Card */}
          <div className="ai-col-3 ai-col-md-6 ai-col-sm-6 ai-col-xs-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Savings Rate</div>
                <div className="ai-card-icon ai-icon-savings">
                  <i className="fas fa-piggy-bank"></i>
                </div>
              </div>
              <div className={`ai-card-value ${savingsRate >= 0 ? 'ai-value-positive' : 'ai-value-negative'}`}>
                {savingsRate.toFixed(1)}%
              </div>
              <div className="ai-card-label">of Income Saved</div>
              <div className="ai-card-footer">
                <div className={`ai-trend ${savingsRate >= 20 ? 'ai-trend-up' : 'ai-trend-down'}`}>
                  <i className={`fas ${savingsRate >= 20 ? 'fa-thumbs-up' : 'fa-thumbs-down'}`}></i>
                  <span>{savingsRate >= 20 ? 'Good' : 'Needs Improvement'}</span>
                </div>
                <div className="ai-trend-period">Target: 20%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="ai-dashboard-grid" style={{ marginTop: 'var(--ai-spacing-xl)' }}>
          {/* Expense Breakdown */}
          <div className="ai-col-8 ai-col-md-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Expense Breakdown</div>
                <div className="ai-card-actions">
                  <select className="ai-select">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>
              <div className="ai-chart-container">
                <Dashboard expenses={expenses} />
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="ai-col-4 ai-col-md-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Recent Transactions</div>
                <div className="ai-card-actions">
                  <button className="ai-btn-text">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
              <div className="ai-recent-transactions">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => {
                    const isExpense = transaction.amount < 0;
                    const date = new Date(transaction.date);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                    return (
                      <div key={transaction._id} className={`ai-expense-item ${isExpense ? 'expense' : 'income'}`}>
                        <div className="ai-expense-details">
                          <div className="ai-expense-icon">
                            <i className={`fas ${isExpense ? 'fa-shopping-cart' : 'fa-money-bill-wave'}`}></i>
                          </div>
                          <div className="ai-expense-info">
                            <h4>{transaction.title}</h4>
                            <div className="ai-expense-meta">
                              <span>{formattedDate}</span>
                              {transaction.category && <span>• {transaction.category}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="ai-expense-amount">
                          {isExpense ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="ai-no-data">No recent transactions</div>
                )}

                <div className="ai-card-footer" style={{ justifyContent: 'center' }}>
                  <a href="/dashboard/expenses" className="ai-btn-text">
                    View All Transactions <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
