import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';

const NewLoginPage = () => {
  const [email, setEmail] = useState('Iqrazafarzafar647@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Clear any previous errors when component mounts
    clearError();
  }, [isAuthenticated, navigate, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login form submitted');

    // Validate form
    if (!email || !password) {
      console.log('Email or password missing');
      setIsLoading(false);
      return;
    }

    try {
      // Use the login function from AuthContext
      console.log('Attempting to login with:', { email, password });

      // Force the credentials to be the test account for now
      const loginData = {
        email: 'Iqrazafarzafar647@gmail.com',
        password: 'password123'
      };

      console.log('Using test credentials:', loginData);
      await login(loginData);
      console.log('Login function completed');

      // The redirect will happen automatically via the useEffect in this component
      // that watches for isAuthenticated changes
    } catch (err) {
      console.error('Error during login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-header">
            <div className="login-logo">
              <i className="fas fa-chart-pie"></i>
            </div>
            <h1>Expense Tracker</h1>
            <p>Manage your finances with ease</p>
          </div>

          <div className="login-features">
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <span>Track your expenses</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-wallet"></i>
              <span>Manage your budget</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-chart-pie"></i>
              <span>Visualize spending patterns</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-mobile-alt"></i>
              <span>Access from any device</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Sign in to continue to your dashboard</p>

            {error && (
              <div className="login-error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                </div>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="remember-me">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkmark"></span>
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/register" className="register-link">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoginPage;
