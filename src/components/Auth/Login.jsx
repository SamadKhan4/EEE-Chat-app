/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import apiService from '../../services/api';

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setLoginSuccess(false);
    
    try {
      const result = await apiService.login({
        emailOrMobile: formData.email,
        password: formData.password
      });
      
      if (result && result.token) {
        setLoginSuccess(true);
        // Store the token in localStorage if provided by backend
        localStorage.setItem('chatAppToken', result.token);
        console.log('Login successful:', result);
        // Call the success callback to redirect to chat
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess();
          }, 1500);
        }
      } else {
        setErrors({
          email: result.message || 'Login failed. Please try again.'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        email: err.message || 'Network error. Please check your connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to continue to your chats</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          success={loginSuccess ? "Valid email!" : ""}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          showPasswordToggle
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
          size="lg"
          className="mt-4"
        >
          Sign In
        </Button>

        {loginSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center animate-fade-in">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Login successful! Redirecting...
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;