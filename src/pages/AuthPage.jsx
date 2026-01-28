import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  // No auto-navigation - user stays on auth page

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          {isLogin ? (
            <Login onSwitchToSignup={() => setIsLogin(false)} onLoginSuccess={onLoginSuccess} />
          ) : (
            <Signup onSwitchToLogin={() => setIsLogin(true)} onLoginSuccess={onLoginSuccess} />
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 EEE ChatApp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;