import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated, error, clearError } = useContext(AuthContext);
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
    setFormError('');
    setIsLoading(true);

    // Validate form
    if (!username || !email || !password || !confirmPassword) {
      setFormError('All fields are required');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Register user
    await register({ username, email, password });
    setIsLoading(false);
  };

  return (
    <div className="auth-page ai-gradient-bg">
      <div className="auth-container ai-glass-effect">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-user-plus ai-icon-pulse"></i>
          </div>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join us to track and manage your finances</p>
        </div>

        {(error || formError) && (
          <div className="auth-error ai-error-animation">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error || formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-control ai-input-group">
            <div className="ai-input-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="ai-input-wrapper">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="username">Username</label>
              <div className="ai-input-highlight"></div>
            </div>
          </div>

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
              />
              <label htmlFor="password">Password</label>
              <div className="ai-input-highlight"></div>
            </div>
          </div>

          <div className="form-control ai-input-group">
            <div className="ai-input-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="ai-input-wrapper">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="ai-input-highlight"></div>
            </div>
          </div>

          <div className="auth-options">
            <label className="ai-checkbox">
              <input type="checkbox" required />
              <span className="ai-checkbox-mark"></span>
              <span>I agree to the <Link to="/terms" className="ai-text-accent">Terms of Service</Link></span>
            </label>
          </div>

          <button
            type="submit"
            className={`btn ai-btn-primary ${isLoading ? 'ai-btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="ai-spinner"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login" className="ai-text-accent">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
