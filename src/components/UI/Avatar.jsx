import React from 'react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  status = null, 
  className = '',
  fallback = '?',
  onClick
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  };
  
  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-400',
    away: 'bg-orange-500'
  };
  
  const containerClasses = `relative inline-block rounded-full overflow-hidden ${sizes[size]} ${className}`;
  
  return (
    <div className={containerClasses} onClick={onClick}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = 'flex';
            }
          }}
        />
      ) : null}
      
      {!src && (
        <div className={`w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium`}>
          {fallback}
        </div>
      )}
      
      {status && (
        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${statusColors[status]}`}>
        </span>
      )}
    </div>
  );
};

export default Avatar;