import React, { useEffect, useState } from 'react';
import Avatar from '../UI/Avatar';

const ChatList = ({ chats, activeChat, onSelectChat }) => {
  const [apiChats, setApiChats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch users from the backend API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('chatAppToken');
        
        // If no token exists, we can't fetch users
        if (!token) {
          console.log('No token found, cannot fetch users. User needs to log in first.');
          // Fallback to dummy chats
          setApiChats(chats);
          setLoading(false);
          return; // Exit early
        }
        
        const response = await fetch('https://chatapp-production-f3ef.up.railway.app/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        // Process the users data to match our chat format
        const processedChats = users.map((user, index) => ({
          id: user.id || user._id || index + 1,
          name: user.username || user.name || 'Unknown User',
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          lastMessage: 'No recent messages',
          timestamp: new Date(user.createdAt).toLocaleDateString() || 'Just now',
          unread: 0,
          online: false,
          status: 'Offline',
          isGroup: false
        }));
        
        setApiChats(processedChats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback to dummy chats
        setApiChats(chats);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [chats]);
  
  const displayedChats = apiChats.length > 0 ? apiChats : chats;
  
  if (loading && displayedChats.length === 0) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 p-2">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-gray-100">
      {displayedChats.map((chat) => (
        <div
          key={chat.id}
          className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
            activeChat?.id === chat.id ? 'bg-primary-50 border-r-4 border-primary-500' : ''
          }`}
          onClick={() => onSelectChat(chat)}
        >
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar 
                src={chat.avatar} 
                alt={chat.name} 
                size="lg" 
                status={chat.online ? chat.status.toLowerCase() : null}
                fallback={chat.name.charAt(0)}
              />
              {chat.isGroup && (
                <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 01-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-semibold truncate ${
                  activeChat?.id === chat.id ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {chat.timestamp}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className={`text-sm truncate ${
                  activeChat?.id === chat.id ? 'text-primary-600' : 'text-gray-600'
                }`}>
                  {chat.lastMessage}
                </p>
                
                {/* Unread Badge */}
                {chat.unread > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-500 rounded-full min-w-[20px] h-5 ml-2">
                    {chat.unread > 99 ? '99+' : chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {displayedChats.length === 0 && (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No chats found</h3>
          <p className="text-gray-500">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;