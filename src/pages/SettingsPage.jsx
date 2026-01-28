import React, { useState } from 'react';
import Button from '../components/UI/Button';

const SettingsPage = ({ onClose, onLogout }) => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    messages: true,
    groups: true,
    sounds: true
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const wallpaperOptions = [
    { id: 'default', name: 'Default', color: 'bg-gradient-to-br from-blue-400 to-purple-500' },
    { id: 'ocean', name: 'Ocean', color: 'bg-gradient-to-br from-teal-400 to-blue-500' },
    { id: 'sunset', name: 'Sunset', color: 'bg-gradient-to-br from-orange-400 to-pink-500' },
    { id: 'forest', name: 'Forest', color: 'bg-gradient-to-br from-green-400 to-emerald-500' }
  ];

  const [selectedWallpaper, setSelectedWallpaper] = useState('default');

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">Theme</h4>
            <p className="text-sm text-gray-600">Choose light or dark mode</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === 'light' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Chat Wallpaper</h4>
          <div className="grid grid-cols-2 gap-3">
            {wallpaperOptions.map((wallpaper) => (
              <button
                key={wallpaper.id}
                onClick={() => setSelectedWallpaper(wallpaper.id)}
                className={`h-20 rounded-lg border-2 transition-all ${
                  selectedWallpaper === wallpaper.id
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                } ${wallpaper.color}`}
              >
                {selectedWallpaper === wallpaper.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Message Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications for new messages</p>
            </div>
            <button
              onClick={() => handleNotificationChange('messages')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.messages ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.messages ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Group Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications for group messages</p>
            </div>
            <button
              onClick={() => handleNotificationChange('groups')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.groups ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.groups ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sound Effects</h4>
              <p className="text-sm text-gray-600">Play sounds for new messages</p>
            </div>
            <button
              onClick={() => handleNotificationChange('sounds')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.sounds ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.sounds ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
        
        <div className="space-y-3">
          <Button variant="outline" fullWidth>
            Change Password
          </Button>
          <Button variant="outline" fullWidth>
            Privacy Settings
          </Button>
          <Button variant="danger" fullWidth onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;