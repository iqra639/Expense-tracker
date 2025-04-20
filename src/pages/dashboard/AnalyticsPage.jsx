import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import '../../styles/analytics.css';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

const AnalyticsPage = ({ expenses }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });
  const [trendData, setTrendData] = useState({ labels: [], datasets: [] });
  const [insights, setInsights] = useState([]);
  const [financialScore, setFinancialScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Process expense data when component mounts or expenses change
  useEffect(() => {
    if (expenses.length > 0) {
      processExpenseData();
      generateInsights();
      calculateFinancialScore();
    } else {
      setLoading(false);
    }
  }, [expenses, timeframe]);

  // Process expense data for charts
  const processExpenseData = () => {
    setLoading(true);

    // Get expense categories and their totals
    const categories = {};
    const filteredExpenses = filterExpensesByTimeframe(expenses);

    filteredExpenses
      .filter(expense => expense.amount < 0)
      .forEach(expense => {
        const category = expense.category || 'Uncategorized';
        if (categories[category]) {
          categories[category] += Math.abs(expense.amount);
        } else {
          categories[category] = Math.abs(expense.amount);
        }
      });

    // Prepare data for pie chart
    const categoryLabels = Object.keys(categories);
    const categoryValues = Object.values(categories);
    const backgroundColors = generateColors(categoryLabels.length);

    setCategoryData({
      labels: categoryLabels,
      datasets: [
        {
          data: categoryValues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1,
        },
      ],
    });

    // Prepare data for trend line chart
    const trendLabels = generateTrendLabels();
    const trendValues = calculateTrendValues(trendLabels, filteredExpenses);

    setTrendData({
      labels: trendLabels,
      datasets: [
        {
          label: 'Expenses',
          data: trendValues.expenses,
          borderColor: 'rgba(231, 76, 60, 1)',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Income',
          data: trendValues.income,
          borderColor: 'rgba(46, 204, 113, 1)',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    });

    setLoading(false);
  };

  // Filter expenses based on selected timeframe
  const filterExpensesByTimeframe = (expenses) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date || expense.createdAt);

      if (timeframe === 'month') {
        return expenseDate.getMonth() === currentMonth &&
               expenseDate.getFullYear() === currentYear;
      } else if (timeframe === 'quarter') {
        const expenseQuarter = Math.floor(expenseDate.getMonth() / 3);
        const currentQuarter = Math.floor(currentMonth / 3);
        return expenseQuarter === currentQuarter &&
               expenseDate.getFullYear() === currentYear;
      } else if (timeframe === 'year') {
        return expenseDate.getFullYear() === currentYear;
      } else {
        return true; // 'all' timeframe
      }
    });
  };

  // Generate labels for trend chart based on timeframe
  const generateTrendLabels = () => {
    const now = new Date();
    const labels = [];

    if (timeframe === 'month') {
      // Last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        labels.push(date.getDate().toString());
      }
    } else if (timeframe === 'quarter') {
      // Last 3 months by week
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - (i * 7));
        labels.push(`Week ${12-i}`);
      }
    } else if (timeframe === 'year') {
      // Months of the year
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      labels.push(...months);
    } else {
      // Last 2 years by quarter
      for (let i = 1; i >= 0; i--) {
        for (let q = 1; q <= 4; q++) {
          labels.push(`Q${q} ${now.getFullYear() - i}`);
        }
      }
    }

    return labels;
  };

  // Calculate trend values based on labels and expenses
  const calculateTrendValues = (labels, filteredExpenses) => {
    const expenses = Array(labels.length).fill(0);
    const income = Array(labels.length).fill(0);
    const now = new Date();

    filteredExpenses.forEach(expense => {
      const expenseDate = new Date(expense.date || expense.createdAt);
      let index = -1;

      if (timeframe === 'month') {
        // Day of month
        const dayDiff = Math.floor((now - expenseDate) / (1000 * 60 * 60 * 24));
        if (dayDiff < 30) index = labels.length - 1 - dayDiff;
      } else if (timeframe === 'quarter') {
        // Week of quarter
        const weekDiff = Math.floor((now - expenseDate) / (1000 * 60 * 60 * 24 * 7));
        if (weekDiff < 12) index = labels.length - 1 - weekDiff;
      } else if (timeframe === 'year') {
        // Month of year
        if (expenseDate.getFullYear() === now.getFullYear()) {
          index = expenseDate.getMonth();
        }
      } else {
        // Quarter of last 2 years
        const yearDiff = now.getFullYear() - expenseDate.getFullYear();
        if (yearDiff < 2) {
          const quarter = Math.floor(expenseDate.getMonth() / 3);
          index = (yearDiff * 4) + quarter;
        }
      }

      if (index >= 0) {
        if (expense.amount < 0) {
          expenses[index] += Math.abs(expense.amount);
        } else {
          income[index] += expense.amount;
        }
      }
    });

    return { expenses, income };
  };

  // Generate random colors for chart
  const generateColors = (count) => {
    const colors = [
      'rgba(231, 76, 60, 0.7)',   // Red
      'rgba(241, 196, 15, 0.7)',   // Yellow
      'rgba(46, 204, 113, 0.7)',   // Green
      'rgba(52, 152, 219, 0.7)',   // Blue
      'rgba(155, 89, 182, 0.7)',   // Purple
      'rgba(230, 126, 34, 0.7)',   // Orange
      'rgba(26, 188, 156, 0.7)',   // Turquoise
      'rgba(41, 128, 185, 0.7)',   // Dark Blue
      'rgba(142, 68, 173, 0.7)',   // Dark Purple
      'rgba(243, 156, 18, 0.7)',   // Dark Yellow
    ];

    // If we need more colors than we have, repeat the array
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(colors[i % colors.length]);
    }

    return result;
  };

  // Generate AI insights based on expense data
  const generateInsights = () => {
    const insights = [];

    // Calculate total income and expenses
    const totalIncome = expenses
      .filter(expense => expense.amount > 0)
      .reduce((acc, expense) => acc + expense.amount, 0);

    const totalExpenses = expenses
      .filter(expense => expense.amount < 0)
      .reduce((acc, expense) => acc + Math.abs(expense.amount), 0);

    // Calculate savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

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

    // Sort categories by amount
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1] - a[1]);

    // Generate insights
    if (savingsRate < 20 && totalIncome > 0) {
      insights.push({
        type: 'warning',
        title: 'Low Savings Rate',
        description: `Your savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of your income.`,
        icon: 'piggy-bank'
      });
    } else if (savingsRate >= 20 && totalIncome > 0) {
      insights.push({
        type: 'success',
        title: 'Healthy Savings Rate',
        description: `Great job! Your savings rate is ${savingsRate.toFixed(1)}%, which meets the recommended 20% threshold.`,
        icon: 'thumbs-up'
      });
    }

    if (sortedCategories.length > 0) {
      const [topCategory, amount] = sortedCategories[0];
      const percentage = ((amount / totalExpenses) * 100).toFixed(1);

      if (percentage > 30) {
        insights.push({
          type: 'info',
          title: 'High Spending in One Category',
          description: `${percentage}% of your expenses are in ${topCategory}. Consider if you can reduce spending in this area.`,
          icon: 'chart-pie'
        });
      }
    }

    // Add a predictive insight
    if (trendData.datasets.length > 0 && trendData.datasets[0].data.length > 1) {
      const recentExpenses = trendData.datasets[0].data.slice(-3);
      const isIncreasing = recentExpenses[2] > recentExpenses[1] && recentExpenses[1] > recentExpenses[0];

      if (isIncreasing) {
        insights.push({
          type: 'warning',
          title: 'Increasing Expense Trend',
          description: 'Your expenses have been increasing over the last three periods. This trend may impact your savings goals if it continues.',
          icon: 'chart-line'
        });
      }
    }

    // Add a random tip if we don't have many insights
    if (insights.length < 2) {
      const tips = [
        {
          type: 'tip',
          title: '50/30/20 Budget Rule',
          description: 'Consider using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.',
          icon: 'lightbulb'
        },
        {
          type: 'tip',
          title: 'Emergency Fund',
          description: 'Aim to build an emergency fund that covers 3-6 months of essential expenses.',
          icon: 'shield-alt'
        },
        {
          type: 'tip',
          title: 'Review Subscriptions',
          description: 'Regularly review your subscriptions and cancel unused ones.',
          icon: 'calendar-check'
        }
      ];

      insights.push(tips[Math.floor(Math.random() * tips.length)]);
    }

    setInsights(insights);
  };

  // Calculate financial health score (0-100)
  const calculateFinancialScore = () => {
    let score = 50; // Start at neutral

    // Calculate total income and expenses
    const totalIncome = expenses
      .filter(expense => expense.amount > 0)
      .reduce((acc, expense) => acc + expense.amount, 0);

    const totalExpenses = expenses
      .filter(expense => expense.amount < 0)
      .reduce((acc, expense) => acc + Math.abs(expense.amount), 0);

    // Calculate savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Adjust score based on savings rate
    if (totalIncome > 0) {
      if (savingsRate >= 20) score += 20;
      else if (savingsRate >= 10) score += 10;
      else if (savingsRate < 0) score -= 20;
    }

    // Adjust score based on expense diversity
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

    const categoryCount = Object.keys(categories).length;
    if (categoryCount >= 5) score += 10;
    else if (categoryCount <= 2 && totalExpenses > 0) score -= 10;

    // Adjust score based on expense trends
    if (trendData.datasets.length > 0 && trendData.datasets[0].data.length > 2) {
      const recentExpenses = trendData.datasets[0].data.slice(-3);
      const isIncreasing = recentExpenses[2] > recentExpenses[1] && recentExpenses[1] > recentExpenses[0];
      const isDecreasing = recentExpenses[2] < recentExpenses[1] && recentExpenses[1] < recentExpenses[0];

      if (isIncreasing) score -= 10;
      if (isDecreasing) score += 10;
    }

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));

    setFinancialScore(score);
  };

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 80) return '#2ecc71'; // Green
    if (score >= 60) return '#f39c12'; // Yellow
    return '#e74c3c'; // Red
  };

  // Get score label based on value
  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <DashboardLayout>
      <div className="analytics-page">
        {/* Timeframe Selector */}
        <div className="ai-timeframe-selector">
          <button
            className={timeframe === 'month' ? 'active' : ''}
            onClick={() => setTimeframe('month')}
          >
            Month
          </button>
          <button
            className={timeframe === 'quarter' ? 'active' : ''}
            onClick={() => setTimeframe('quarter')}
          >
            Quarter
          </button>
          <button
            className={timeframe === 'year' ? 'active' : ''}
            onClick={() => setTimeframe('year')}
          >
            Year
          </button>
          <button
            className={timeframe === 'all' ? 'active' : ''}
            onClick={() => setTimeframe('all')}
          >
            All Time
          </button>
        </div>

        {/* Financial Health Score */}
        <div className="ai-dashboard-grid">
          <div className="ai-col-4 ai-col-md-6 ai-col-sm-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Financial Health Score</div>
                <div className="ai-card-icon ai-icon-balance">
                  <i className="fas fa-heartbeat"></i>
                </div>
              </div>
              <div className="ai-financial-score">
                <div
                  className="ai-score-circle"
                  style={{
                    background: `conic-gradient(${getScoreColor(financialScore)} ${financialScore}%, #e2e8f0 0)`
                  }}
                >
                  <div className="ai-score-inner">
                    <span className="ai-score-value">{financialScore}</span>
                    <span className="ai-score-label">{getScoreLabel(financialScore)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="ai-col-8 ai-col-md-6 ai-col-sm-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">AI Insights</div>
                <div className="ai-card-icon ai-icon-insights">
                  <i className="fas fa-robot"></i>
                </div>
              </div>
              <div className="ai-insights-container">
                {insights.length > 0 ? (
                  insights.map((insight, index) => (
                    <div key={index} className={`ai-insight ai-insight-${insight.type}`}>
                      <div className="ai-insight-icon">
                        <i className={`fas fa-${insight.icon}`}></i>
                      </div>
                      <div className="ai-insight-content">
                        <h4>{insight.title}</h4>
                        <p>{insight.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="ai-no-data">Add more transactions to get personalized insights.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="ai-dashboard-grid" style={{ marginTop: 'var(--ai-spacing-xl)' }}>
          {/* Expense Categories */}
          <div className="ai-col-6 ai-col-md-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Expense Categories</div>
              </div>
              <div className="ai-chart-container">
                {loading ? (
                  <div className="ai-loading">Loading chart data...</div>
                ) : categoryData.labels.length > 0 ? (
                  <Pie
                    data={categoryData}
                    options={{
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              const label = context.label || '';
                              const value = context.raw || 0;
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                            }
                          }
                        }
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                ) : (
                  <div className="ai-no-data">No expense data available for the selected timeframe.</div>
                )}
              </div>
            </div>
          </div>

          {/* Expense Trends */}
          <div className="ai-col-6 ai-col-md-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">Income & Expense Trends</div>
              </div>
              <div className="ai-chart-container">
                {loading ? (
                  <div className="ai-loading">Loading chart data...</div>
                ) : trendData.labels.length > 0 ? (
                  <Line
                    data={trendData}
                    options={{
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              const label = context.dataset.label || '';
                              const value = context.raw || 0;
                              return `${label}: $${value.toFixed(2)}`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function(value) {
                              return '$' + value;
                            }
                          }
                        }
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                ) : (
                  <div className="ai-no-data">No trend data available for the selected timeframe.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Analysis */}
        <div className="ai-dashboard-grid" style={{ marginTop: 'var(--ai-spacing-xl)' }}>
          <div className="ai-col-12">
            <div className="ai-dashboard-card">
              <div className="ai-card-header">
                <div className="ai-card-title">AI Spending Predictions</div>
                <div className="ai-card-icon ai-icon-prediction">
                  <i className="fas fa-magic"></i>
                </div>
              </div>
              <div className="ai-prediction-container">
                <div className="ai-prediction-header">
                  <i className="fas fa-lightbulb"></i>
                  <h3>Smart Budget Recommendations</h3>
                </div>
                <div className="ai-prediction-content">
                  {expenses.length > 5 ? (
                    <div className="ai-prediction-items">
                      <div className="ai-prediction-item">
                        <h4>Predicted Monthly Expenses</h4>
                        <p>
                          Based on your spending patterns, we predict your expenses next month will be approximately
                          <strong> ${calculatePredictedExpenses().toFixed(2)}</strong>.
                        </p>
                      </div>
                      <div className="ai-prediction-item">
                        <h4>Recommended Budget Allocation</h4>
                        <div className="ai-budget-recommendations">
                          {generateBudgetRecommendations().map((item, index) => (
                            <div key={index} className="ai-budget-item">
                              <div className="ai-budget-category">
                                <i className={`fas fa-${item.icon}`}></i>
                                <span>{item.category}</span>
                              </div>
                              <div className="ai-budget-amount">${item.amount.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="ai-no-data">Add at least 5 transactions to get AI-powered spending predictions and budget recommendations.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  // Helper function to calculate predicted expenses
  function calculatePredictedExpenses() {
    if (expenses.length < 5) return 0;

    const expenseAmounts = expenses
      .filter(expense => expense.amount < 0)
      .map(expense => Math.abs(expense.amount));

    // Simple prediction based on average with a slight increase
    const avgExpense = expenseAmounts.reduce((sum, amount) => sum + amount, 0) / expenseAmounts.length;
    return avgExpense * expenseAmounts.length * 1.05; // 5% increase prediction
  }

  // Helper function to generate budget recommendations
  function generateBudgetRecommendations() {
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
    const totalExpenses = Object.values(categories).reduce((sum, amount) => sum + amount, 0);

    // Sort categories by amount
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1] - a[1]);

    // Generate recommendations with icons
    const recommendations = [];
    const categoryIcons = {
      'Food': 'utensils',
      'Housing': 'home',
      'Transportation': 'car',
      'Entertainment': 'film',
      'Shopping': 'shopping-bag',
      'Utilities': 'bolt',
      'Healthcare': 'medkit',
      'Personal': 'user',
      'Education': 'graduation-cap',
      'Uncategorized': 'question'
    };

    // Take top 5 categories or all if less than 5
    const topCategories = sortedCategories.slice(0, Math.min(5, sortedCategories.length));

    topCategories.forEach(([category, amount]) => {
      // Recommend slightly less than current spending
      const recommendedAmount = amount * 0.9; // 10% reduction

      recommendations.push({
        category,
        amount: recommendedAmount,
        icon: categoryIcons[category] || 'tag'
      });
    });

    return recommendations;
  }
};

export default AnalyticsPage;
