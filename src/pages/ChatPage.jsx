import React, { useState } from 'react';
import Sidebar from '../components/Chat/Sidebar';
import ChatWindow from '../components/Chat/ChatWindow';
import Modal from '../components/UI/Modal';
import ProfileCard from '../components/Profile/ProfileCard';
import SettingsPage from './SettingsPage';
import { dummyChats } from '../data/dummyChats';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(dummyChats[0]);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock current user data
  const currentUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    status: "Available"
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        currentUser={currentUser}
        onProfileClick={() => setShowProfile(true)}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      {/* Main Chat Area */}
      <ChatWindow 
        activeChat={activeChat}
        currentUser={currentUser}
      />

      {/* Profile Modal */}
      <Modal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        title="My Profile"
        size="lg"
      >
        <ProfileCard user={currentUser} />
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
        size="md"
      >
        <SettingsPage onClose={() => setShowSettings(false)} />
      </Modal>
    </div>
  );
};

export default ChatPage;