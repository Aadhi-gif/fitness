import React from 'react';
import { Settings, User, MapPin, Bell, Shield, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickSettingsButton: React.FC = () => {
  const navigate = useNavigate();

  const settingsCategories = [
    {
      icon: User,
      label: 'Personal Info',
      description: 'Name, photo, contact details',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      description: 'Country, region, timezone',
      color: 'from-green-500 to-blue-500',
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Workout & meal reminders',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      label: 'Privacy',
      description: 'Profile visibility, data sharing',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-6 border border-blue-500/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Quick Settings</h3>
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-semibold"
        >
          View All
        </button>
      </div>

      <p className="text-gray-300 mb-6">
        Customize your profile with personal details, location, and preferences
      </p>

      {/* Quick Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {settingsCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => navigate('/settings')}
            className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                <category.icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                {category.label}
              </h4>
            </div>
            <p className="text-gray-400 text-sm">{category.description}</p>
          </button>
        ))}
      </div>

      {/* Key Features */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold mb-3">Available Settings:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            Profile photo upload
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Country & region selection
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            Mobile number & contact info
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            Notification preferences
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            Privacy & data sharing
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            Language & timezone
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-blue-400 font-semibold">Complete Your Profile</h4>
            <p className="text-gray-400 text-sm">Add personal details for a better experience</p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Settings className="w-4 h-4" />
            Open Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSettingsButton;
