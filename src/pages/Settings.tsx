import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Download, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    progressUpdates: true,
    achievements: true,
    weeklyReports: false
  });

  const [preferences, setPreferences] = useState({
    units: 'imperial',
    theme: 'dark',
    language: 'english',
    timezone: 'PST'
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Download }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite Settings</h1>
              <p className="text-gray-300 text-lg">Customize your champion experience</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-500/30">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-500/30">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Elite Champion"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="champion@fitlife.com"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Age</label>
                      <input
                        type="number"
                        defaultValue="28"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Gender</label>
                      <select className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-400">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all">
                    Update Profile
                  </button>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-xl border border-gray-500/20">
                        <div>
                          <h3 className="text-white font-semibold capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {key === 'workoutReminders' && 'Get reminded about your scheduled workouts'}
                            {key === 'mealReminders' && 'Receive notifications for meal times'}
                            {key === 'progressUpdates' && 'Weekly progress and achievement updates'}
                            {key === 'achievements' && 'Celebrate your fitness milestones'}
                            {key === 'weeklyReports' && 'Comprehensive weekly performance reports'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">App Preferences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Units</label>
                      <select 
                        value={preferences.units}
                        onChange={(e) => handlePreferenceChange('units', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      >
                        <option value="imperial">Imperial (lbs, ft)</option>
                        <option value="metric">Metric (kg, cm)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Theme</label>
                      <select 
                        value={preferences.theme}
                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      >
                        <option value="dark">Dark (Elite)</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Language</label>
                      <select 
                        value={preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">Timezone</label>
                      <select 
                        value={preferences.timezone}
                        onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-500/50 rounded-xl text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-400"
                      >
                        <option value="PST">Pacific (PST)</option>
                        <option value="EST">Eastern (EST)</option>
                        <option value="CST">Central (CST)</option>
                        <option value="MST">Mountain (MST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-xl border border-red-500/20">
                      <h3 className="text-white font-semibold mb-2">Change Password</h3>
                      <p className="text-gray-400 text-sm mb-4">Update your account password for enhanced security</p>
                      <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                      <h3 className="text-white font-semibold mb-2">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management Tab */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Data Management</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/20">
                      <h3 className="text-white font-semibold mb-2">Export Data</h3>
                      <p className="text-gray-400 text-sm mb-4">Download all your fitness data and progress</p>
                      <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Data
                      </button>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-xl border border-red-500/20">
                      <h3 className="text-white font-semibold mb-2">Delete Account</h3>
                      <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data</p>
                      <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
