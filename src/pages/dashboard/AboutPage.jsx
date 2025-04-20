import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const AboutPage = () => {
  return (
    <DashboardLayout>
      <div className="about-page">
        <div className="dashboard-section">
          <h3>About Expense Tracker</h3>
          <p>
            Expense Tracker is a web application designed to help you manage your personal finances.
            It allows you to track your income and expenses, categorize your transactions, and visualize
            your spending patterns.
          </p>
          
          <h4>Features</h4>
          <ul>
            <li>Track income and expenses</li>
            <li>Categorize transactions</li>
            <li>View transaction history</li>
            <li>Filter and sort transactions</li>
            <li>Visualize spending patterns</li>
            <li>Secure user authentication</li>
          </ul>
          
          <h4>Technologies Used</h4>
          <ul>
            <li>Frontend: React, Chart.js</li>
            <li>Backend: Node.js, Express</li>
            <li>Database: MongoDB</li>
            <li>Authentication: JWT</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutPage;
