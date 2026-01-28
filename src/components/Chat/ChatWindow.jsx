/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect, useRef } from 'react';
import Avatar from '../UI/Avatar';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { dummyMessages } from '../../data/dummyMessages';

const ChatWindow = ({ activeChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      setIsLoading(true);
      
      // First try to load messages from backend API
      const fetchMessagesFromAPI = async () => {
        try {
          const token = localStorage.getItem('chatAppToken');
          const chatId = activeChat.id; // Get chatId from activeChat
          
          // Console log for debugging
          console.log('Chat ID being used for API call:', chatId);
          console.log('Active chat object:', activeChat);
          
          // Check if chatId is valid
          if (!chatId) {
            console.log('No valid chat ID, using dummy messages');
            setMessages(dummyMessages[activeChat.id] || []);
            setIsLoading(false);
            return;
          }
          
          // In a real app, this would fetch messages from the backend
          const response = await fetch(`https://chatapp-production-f3ef.up.railway.app/api/messages/${chatId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
          }
          
          const apiMessages = await response.json();
          
          // For now, using API messages or fallback to dummy
          setMessages(apiMessages || dummyMessages[activeChat.id] || []);
          setIsLoading(false);
          scrollToBottom();
        } catch (error) {
          console.error('Error fetching messages:', error);
          // Fallback to dummy messages
          setMessages(dummyMessages[activeChat.id] || []);
          setIsLoading(false);
          scrollToBottom();
        }
      };
      
      fetchMessagesFromAPI();
    }
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText, isError = false) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      error: isError // Add error flag
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a chat</h2>
          <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <div className="relative">
            <Avatar 
              src={activeChat.avatar} 
              alt={activeChat.name} 
              size="lg" 
              status={activeChat.online ? activeChat.status.toLowerCase() : null}
              fallback={activeChat.name.charAt(0)}
            />
            {activeChat.isGroup && (
              <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{activeChat.name}</h3>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                activeChat.online ? 'bg-green-500' : 'bg-gray-400'
              }`}></span>
              <span className="text-sm text-gray-600">
                {activeChat.online 
                  ? `${activeChat.status} • Online` 
                  : `Offline • Last seen ${activeChat.timestamp}`
                }
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`h-12 rounded-2xl bg-gray-200 animate-pulse ${
                  i % 2 === 0 ? 'rounded-bl-md' : 'rounded-br-md'
                }`}></div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">Start the conversation!</p>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isSender={message.sender}
                time={message.timestamp}
                read={message.read}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={!activeChat}
        activeReceiverId={activeChat?.id}
      />
    </div>
  );
};

export default ChatWindow;