import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Add or remove menu-open class to body for overlay effect
    if (!isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Clean up effect to remove body class when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <div className="ai-dashboard-container">
      {/* Mobile Menu Toggle */}
      <div className="ai-mobile-menu-toggle" onClick={toggleMobileMenu}>
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      {/* Sidebar */}
      <div className={`ai-sidebar ${isMobileMenuOpen ? 'ai-sidebar-open' : ''}`}>
        <div className="ai-sidebar-header">
          <div className="ai-sidebar-logo">
            <i className="fas fa-chart-pie"></i>
          </div>
          <div className="ai-sidebar-title">Expense Tracker</div>
        </div>

        {/* User Profile */}
        <div className="ai-user-profile">
          <div className="ai-user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="ai-user-info">
            <div className="ai-user-name">Iqra</div>
            <div className="ai-user-email">Iqrazafarzafar647@gmail.com</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="ai-nav">
          <Link
            to="/dashboard"
            className={`ai-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="ai-nav-icon">
              <i className="fas fa-home"></i>
            </div>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/dashboard/expenses"
            className={`ai-nav-item ${isActive('/dashboard/expenses') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="ai-nav-icon">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <span>Transactions</span>
          </Link>

          <Link
            to="/dashboard/analytics"
            className={`ai-nav-item ${isActive('/dashboard/analytics') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="ai-nav-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <span>Analytics</span>
          </Link>

          <Link
            to="/dashboard/budget"
            className={`ai-nav-item ${isActive('/dashboard/budget') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="ai-nav-icon">
              <i className="fas fa-wallet"></i>
            </div>
            <span>Budget</span>
          </Link>

          <Link
            to="/dashboard/settings"
            className={`ai-nav-item ${isActive('/dashboard/settings') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="ai-nav-icon">
              <i className="fas fa-cog"></i>
            </div>
            <span>Settings</span>
          </Link>

          <Link
            to="/dashboard/about"
            className={`ai-nav-item ${isActive('/dashboard/about') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="ai-nav-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <span>About</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="ai-sidebar-footer">
          <button onClick={logout} className="ai-logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ai-content">
        <div className="ai-content-header">
          <h1 className="ai-page-title">
            {isActive('/dashboard') && (
              <>
                <i className="fas fa-home"></i> Dashboard
              </>
            )}
            {isActive('/dashboard/expenses') && (
              <>
                <i className="fas fa-exchange-alt"></i> Transactions
              </>
            )}
            {isActive('/dashboard/analytics') && (
              <>
                <i className="fas fa-chart-bar"></i> Analytics
              </>
            )}
            {isActive('/dashboard/budget') && (
              <>
                <i className="fas fa-wallet"></i> Budget
              </>
            )}
            {isActive('/dashboard/settings') && (
              <>
                <i className="fas fa-cog"></i> Settings
              </>
            )}
            {isActive('/dashboard/about') && (
              <>
                <i className="fas fa-info-circle"></i> About
              </>
            )}
          </h1>

          <div className="ai-header-actions">
            <div className="ai-search-box">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search..." />
            </div>

            <div className="ai-notification">
              <i className="fas fa-bell"></i>
              <span className="ai-notification-badge">3</span>
            </div>
          </div>
        </div>

        <div className="ai-content-main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
