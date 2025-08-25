import React from 'react';
import { Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileSettings from '../components/ProfileSettings';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-600/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="text-gray-300 text-lg">Customize your Elite Fitness experience</p>
          </div>
        </div>

        {/* Settings Component */}
        <ProfileSettings />

        {/* Additional Settings Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Management */}
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-red-400" />
              Account Management
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Change Password
              </button>
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Connected Apps
              </button>
              <button className="w-full text-left p-3 bg-red-600/20 hover:bg-red-600/30 rounded-lg border border-red-500/30 text-red-400 transition-colors">
                Delete Account
              </button>
            </div>
          </div>

          {/* Data & Export */}
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-green-400" />
              Data & Export
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Export Fitness Data
              </button>
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Import Data
              </button>
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Backup Settings
              </button>
              <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors">
                Clear Cache
              </button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-400" />
            Help & Support
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors text-center">
              <div className="font-semibold">Help Center</div>
              <div className="text-sm text-gray-400 mt-1">Find answers to common questions</div>
            </button>
            <button className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors text-center">
              <div className="font-semibold">Contact Support</div>
              <div className="text-sm text-gray-400 mt-1">Get help from our team</div>
            </button>
            <button className="p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 text-white transition-colors text-center">
              <div className="font-semibold">Send Feedback</div>
              <div className="text-sm text-gray-400 mt-1">Help us improve the app</div>
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-purple-400" />
            App Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-gray-400 text-sm">Version</div>
              <div className="text-white font-semibold">Elite Fitness Pro v2.0.0</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Last Updated</div>
              <div className="text-white font-semibold">December 2024</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Database Status</div>
              <div className="text-green-400 font-semibold">✅ Connected</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Storage Used</div>
              <div className="text-white font-semibold">2.4 MB</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-600/30">
            <div className="flex flex-wrap gap-4 text-sm">
              <button className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</button>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</button>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">Open Source Licenses</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
