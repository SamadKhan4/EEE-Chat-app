import React from 'react';

const MessageBubble = ({ message, isSender, time, read = false }) => {
  return (
    <div className={`flex mb-4 ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-2xl relative group ${
        isSender 
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-md' 
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
      }`}>
        {/* Message content */}
        <p className={`text-sm break-words ${message.error ? 'text-red-500 italic' : ''}`}>{message.text}</p>
        
        {/* Time and read status */}
        <div className={`flex items-center mt-1 space-x-1 ${
          isSender ? 'text-primary-100' : 'text-gray-500'
        }`}>
          <span className={`text-xs ${message.error ? 'text-red-400' : ''}`}>{time}</span>
          
          {/* Read indicator for sender messages */}
          {isSender && (
            <div className="flex items-center">
              {read ? (
                <svg className="w-4 h-4 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </div>
          )}
        </div>
        
        {/* Hover effects */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 rounded-2xl transition-all duration-200"></div>
      </div>
    </div>
  );
};

export default MessageBubble;