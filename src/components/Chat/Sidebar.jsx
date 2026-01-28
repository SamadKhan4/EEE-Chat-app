import React, { useState, useEffect } from 'react';
import Avatar from '../UI/Avatar';
import ChatList from './ChatList';

const Sidebar = ({ 
  activeChat, 
  onSelectChat, 
  currentUser,
  onProfileClick,
  onSettingsClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiChats, setApiChats] = useState([]);
  
  useEffect(() => {
    // Fetch users from the backend API
    const fetchUsers = async () => {
      try {
        // Use static dummy chats (static mode)
        import('../../data/dummyChats').then(module => {
          setApiChats(module.dummyChats);
        });
        return; // Exit early
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback to dummy data
        import('../../data/dummyChats').then(module => {
          setApiChats(module.dummyChats);
        });
      }
    };
    
    fetchUsers();
  }, []);
  
  const chatsToUse = apiChats.length > 0 ? apiChats : [];
  
  const filteredChats = chatsToUse.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-80">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Chats</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.544-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.544-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.544.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.544.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <ChatList 
          chats={filteredChats} 
          activeChat={activeChat} 
          onSelectChat={onSelectChat} 
        />
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-200">
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors"
          onClick={onProfileClick}
        >
          <Avatar 
            src={currentUser?.avatar} 
            alt={currentUser?.name} 
            size="lg" 
            status={currentUser?.status}
            fallback={currentUser?.name?.charAt(0) || 'U'}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUser?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser?.status || 'Available'}
            </p>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;