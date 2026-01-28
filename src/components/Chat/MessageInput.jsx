import React, { useState } from 'react';
import webSocketService from '../../services/websocket';
import apiService from '../../services/api';

const MessageInput = ({ onSendMessage, disabled = false, activeReceiverId }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      setSending(true);
      try {
        // Try WebSocket first, fallback to REST API
        
        // Check if WebSocket is connected
        if (webSocketService.isConnected()) {
          // Send via WebSocket
          const success = webSocketService.sendChatMessage(activeReceiverId, message.trim());
          
          if (success) {
            console.log('Message sent via WebSocket');
            onSendMessage(message.trim());
            setMessage('');
            setIsTyping(false);
          } else {
            // Fallback to API service
            await apiService.sendMessage({
              receiverId: activeReceiverId,
              content: message.trim()
            });
            console.log('Message sent via API service');
            onSendMessage(message.trim());
            setMessage('');
            setIsTyping(false);
          }
        } else {
          // Fallback to API service
          await apiService.sendMessage({
            receiverId: activeReceiverId,
            content: message.trim()
          });
          console.log('Message sent via API service');
          onSendMessage(message.trim());
          setMessage('');
          setIsTyping(false);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        onSendMessage(message.trim(), true);
        setMessage('');
        setIsTyping(false);
      } finally {
        setSending(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setIsTyping(value.length > 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment button */}
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          disabled={disabled}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Emoji button */}
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          disabled={disabled}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            className="block w-full resize-none rounded-2xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: '48px',
              maxHeight: '120px'
            }}
          />
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="absolute right-3 bottom-3 flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          )}
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled || sending}
          className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 ${
            sending
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : message.trim() && !disabled
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
      
      {/* Typing users indicator */}
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <div className="flex space-x-1 mr-2">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
        <span>Someone is typing...</span>
      </div>
    </div>
  );
};

export default MessageInput;