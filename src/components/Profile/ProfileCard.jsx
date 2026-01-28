import React, { useState } from 'react';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import Input from '../UI/Input';

const ProfileCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    status: user?.status || 'Available'
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [saving, setSaving] = useState(false);

  const statusOptions = [
    { value: 'Available', label: 'Available', color: 'bg-green-500' },
    { value: 'Busy', label: 'Busy', color: 'bg-yellow-500' },
    { value: 'Away', label: 'Away', color: 'bg-orange-500' },
    { value: 'Offline', label: 'Appear Offline', color: 'bg-gray-500' }
  ];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      console.log('Profile updated:', formData);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-primary-400 to-primary-600 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Avatar 
                src={avatarPreview} 
                alt={formData.name} 
                size="2xl" 
                fallback={formData.name.charAt(0) || 'U'}
                className="border-4 border-white shadow-lg"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-primary-500 rounded-full p-2 cursor-pointer hover:bg-primary-600 transition-colors shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-8 px-6">
          {isEditing ? (
            <div className="space-y-6 animate-fade-in">
              <Input
                label="Display Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <Input
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                type="textarea"
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      bio: user?.bio || '',
                      status: user?.status || 'Available'
                    });
                    setAvatarPreview(user?.avatar || null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  loading={saving}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.name}
              </h2>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 mb-4">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  statusOptions.find(s => s.value === formData.status)?.color || 'bg-gray-500'
                }`}></span>
                <span className="text-sm font-medium text-gray-700">
                  {formData.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {formData.bio || 'No bio yet. Tell us about yourself!'}
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600">24</div>
                  <div className="text-sm text-gray-600">Chats</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600">156</div>
                  <div className="text-sm text-gray-600">Messages</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600">98%</div>
                  <div className="text-sm text-gray-600">Response Rate</div>
                </div>
              </div>
              
              <Button
                onClick={() => setIsEditing(true)}
                variant="primary"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;