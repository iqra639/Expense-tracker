import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>Expense Tracker</h1>
        </Link>
      </div>
      <nav className="nav">
        {isAuthenticated ? (
          <ul className="nav-links">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
