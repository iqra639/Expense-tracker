import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('Iqrazafarzafar647@gmail.com');
  const [password, setPassword] = useState('password123');
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

    // Validate form
    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    // Login user
    await login({ email, password });
    setIsLoading(false);
  };

  return (
    <div className="auth-page ai-gradient-bg">
      <div className="auth-container ai-glass-effect">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-chart-pie ai-icon-pulse"></i>
          </div>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to your dashboard</p>
        </div>

        {error && (
          <div className="auth-error ai-error-animation">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-control ai-input-group">
            <div className="ai-input-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="ai-input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                autoComplete="email"
              />
              <label htmlFor="email">Email Address</label>
              <div className="ai-input-highlight"></div>
            </div>
          </div>

          <div className="form-control ai-input-group">
            <div className="ai-input-icon">
              <i className="fas fa-lock"></i>
            </div>
            <div className="ai-input-wrapper">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                autoComplete="current-password"
              />
              <label htmlFor="password">Password</label>
              <div className="ai-input-highlight"></div>
            </div>
          </div>

          <div className="auth-options">
            <label className="ai-checkbox">
              <input type="checkbox" />
              <span className="ai-checkbox-mark"></span>
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className={`btn ai-btn-primary ${isLoading ? 'ai-btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="ai-spinner"></span>
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

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register" className="ai-text-accent">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
