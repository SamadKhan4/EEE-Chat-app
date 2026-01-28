import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in (you can check for token in localStorage)
  // Check if user is already logged in (you can check for token in localStorage)
  React.useEffect(() => {
    const token = localStorage.getItem('chatAppToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Store token in localStorage if provided by backend
    // localStorage.setItem('chatAppToken', token);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('chatAppToken');
    // Set logged in state to false
    setIsLoggedIn(false);
  };

  return (
    <div className="font-sans antialiased">
      {isLoggedIn ? <ChatPage onLogout={handleLogout} /> : <AuthPage onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
