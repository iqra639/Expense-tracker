import React, { useState, useContext } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { AuthContext } from '../../context/AuthContext';

const SettingsPage = () => {
  const { user } = useContext(AuthContext);
  
  // Initialize form state with user data
  const [formData, setFormData] = useState({
    username: 'Iqra',
    email: 'Iqrazafarzafar647@gmail.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Profile updated successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Password updated successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="settings-page">
        <div className="dashboard-section">
          <h3>Account Settings</h3>
          
          {successMessage && (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <span>{successMessage}</span>
            </div>
          )}
          
          {errorMessage && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <span>{errorMessage}</span>
            </div>
          )}
          
          <div className="settings-container">
            {/* Profile Settings */}
            <div className="settings-card">
              <h4>Profile Information</h4>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>
            
            {/* Password Settings */}
            <div className="settings-card">
              <h4>Change Password</h4>
              <form onSubmit={handlePasswordUpdate}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
