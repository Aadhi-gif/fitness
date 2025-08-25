import React, { useState, useEffect } from 'react';
import { User, Trash2, LogIn, Plus, Crown, Shield } from 'lucide-react';
import { useAuth } from '../contexts/DatabaseAuthContext';

interface SavedUser {
  email: string;
  name: string;
  role: 'user' | 'admin';
  lastLogin: string;
  avatar?: string;
}

const SavedUsersManager: React.FC = () => {
  const { login, getSavedCredentials } = useAuth();
  const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved users from localStorage
  useEffect(() => {
    const loadSavedUsers = () => {
      try {
        const saved = localStorage.getItem('fitlife_saved_users');
        if (saved) {
          setSavedUsers(JSON.parse(saved));
        } else {
          // Initialize with demo users if none exist
          const demoUsers: SavedUser[] = [
            {
              email: 'demo@fitlife.com',
              name: 'Demo User',
              role: 'user',
              lastLogin: new Date().toISOString(),
            },
            {
              email: 'administrator@fitlife.com',
              name: 'Admin User',
              role: 'admin',
              lastLogin: new Date().toISOString(),
            },
          ];
          setSavedUsers(demoUsers);
          localStorage.setItem('fitlife_saved_users', JSON.stringify(demoUsers));
        }
      } catch (error) {
        console.error('Failed to load saved users:', error);
      }
    };

    loadSavedUsers();
  }, []);

  // Save a new user to the list
  const saveUser = (email: string, name: string, role: 'user' | 'admin' = 'user') => {
    const newUser: SavedUser = {
      email,
      name,
      role,
      lastLogin: new Date().toISOString(),
    };

    const updatedUsers = savedUsers.filter(user => user.email !== email);
    updatedUsers.unshift(newUser); // Add to beginning
    
    // Keep only last 5 users
    const limitedUsers = updatedUsers.slice(0, 5);
    
    setSavedUsers(limitedUsers);
    localStorage.setItem('fitlife_saved_users', JSON.stringify(limitedUsers));
  };

  // Remove a user from saved list
  const removeUser = (email: string) => {
    const updatedUsers = savedUsers.filter(user => user.email !== email);
    setSavedUsers(updatedUsers);
    localStorage.setItem('fitlife_saved_users', JSON.stringify(updatedUsers));
  };

  // Quick login with saved user
  const quickLogin = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Get saved credentials
      const savedCredentials = getSavedCredentials();
      
      if (savedCredentials && savedCredentials.email === email) {
        // Use saved credentials
        const success = await login(savedCredentials, true);
        if (success) {
          // Update last login time
          const user = savedUsers.find(u => u.email === email);
          if (user) {
            saveUser(user.email, user.name, user.role);
          }
        }
      } else {
        // Try with demo passwords
        const demoPasswords: { [key: string]: string } = {
          'demo@fitlife.com': 'demo123',
          'administrator@fitlife.com': 'admin123!@#',
        };
        
        const password = demoPasswords[email];
        if (password) {
          const success = await login({ email, password }, true);
          if (success) {
            const user = savedUsers.find(u => u.email === email);
            if (user) {
              saveUser(user.email, user.name, user.role);
            }
          }
        } else {
          alert('No saved password for this user. Please login manually.');
        }
      }
    } catch (error) {
      console.error('Quick login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvatarColor = (email: string) => {
    const colors = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-blue-500',
      'from-orange-500 to-red-500',
      'from-purple-500 to-pink-500',
      'from-yellow-500 to-orange-500',
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-6 border border-blue-500/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Saved Users</h3>
        </div>
        <div className="text-sm text-gray-400">
          Quick login with saved accounts
        </div>
      </div>

      {savedUsers.length === 0 ? (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No saved users yet</p>
          <p className="text-gray-500 text-sm">Login with "Remember Me" to save users</p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedUsers.map((user, index) => (
            <div
              key={user.email}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAvatarColor(user.email)} flex items-center justify-center relative`}>
                  <span className="text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.role === 'admin' && (
                    <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                      <Crown className="w-3 h-3 text-yellow-900" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold">{user.name}</h4>
                    {user.role === 'admin' && (
                      <Shield className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-xs">Last login: {formatLastLogin(user.lastLogin)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => quickLogin(user.email)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogIn className="w-4 h-4" />
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                
                <button
                  onClick={() => removeUser(user.email)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                  title="Remove saved user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Demo Account Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/20">
        <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Demo Accounts Available
        </h4>
        <div className="text-sm text-gray-300 space-y-1">
          <p><strong>User Account:</strong> demo@fitlife.com / demo123</p>
          <p><strong>Admin Account:</strong> administrator@fitlife.com / admin123!@#</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          These accounts are automatically saved when you login with "Remember Me"
        </p>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-600/10 rounded-lg border border-blue-500/20">
        <p className="text-blue-300 text-sm">
          💡 <strong>Tip:</strong> Check "Remember Me" when logging in to save your account for quick access
        </p>
      </div>
    </div>
  );
};

export default SavedUsersManager;
