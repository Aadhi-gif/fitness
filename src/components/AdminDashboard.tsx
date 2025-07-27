import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Activity, Eye, Calendar, Clock, MapPin, 
  TrendingUp, AlertCircle, Download, Filter, Search,
  UserCheck, UserX, Globe, Smartphone, Monitor
} from 'lucide-react';

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  sessionId: string;
}

interface LoginRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  loginTime: string;
  logoutTime?: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  success: boolean;
  failureReason?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalLogins: number;
  failedLogins: number;
  averageSessionDuration: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'activities' | 'logins'>('overview');
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loginRecords, setLoginRecords] = useState<LoginRecord[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalLogins: 0,
    failedLogins: 0,
    averageSessionDuration: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  useEffect(() => {
    loadAdminData();
    // Set up real-time monitoring
    const interval = setInterval(loadAdminData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAdminData = () => {
    // Load from localStorage (in production, this would come from backend)
    const storedActivities = localStorage.getItem('admin_user_activities');
    const storedLogins = localStorage.getItem('admin_login_records');
    const storedStats = localStorage.getItem('admin_user_stats');

    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
    if (storedLogins) {
      setLoginRecords(JSON.parse(storedLogins));
    }
    if (storedStats) {
      setUserStats(JSON.parse(storedStats));
    }

    // Generate mock data if none exists
    if (!storedActivities || !storedLogins) {
      generateMockData();
    }
  };

  const generateMockData = () => {
    const mockActivities: UserActivity[] = [
      {
        id: '1',
        userId: 'user_1',
        userName: 'Demo User',
        userEmail: 'demo@fitlife.com',
        action: 'LOGIN',
        details: 'User logged in successfully',
        timestamp: new Date().toISOString(),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'New York, USA',
        sessionId: 'sess_123'
      },
      {
        id: '2',
        userId: 'user_1',
        userName: 'Demo User',
        userEmail: 'demo@fitlife.com',
        action: 'FOOD_PREFERENCES_UPDATED',
        details: 'Updated food preferences to Indian cuisine',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'New York, USA',
        sessionId: 'sess_123'
      },
      {
        id: '3',
        userId: 'user_2',
        userName: 'John Smith',
        userEmail: 'john@example.com',
        action: 'PROFILE_UPDATED',
        details: 'Updated weight and fitness goals',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        ipAddress: '10.0.0.50',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        location: 'Los Angeles, USA',
        sessionId: 'sess_456'
      }
    ];

    const mockLogins: LoginRecord[] = [
      {
        id: '1',
        userId: 'user_1',
        userName: 'Demo User',
        userEmail: 'demo@fitlife.com',
        loginTime: new Date().toISOString(),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'New York, USA',
        deviceType: 'desktop',
        browser: 'Chrome',
        success: true
      },
      {
        id: '2',
        userId: 'user_2',
        userName: 'John Smith',
        userEmail: 'john@example.com',
        loginTime: new Date(Date.now() - 3600000).toISOString(),
        logoutTime: new Date(Date.now() - 1800000).toISOString(),
        ipAddress: '10.0.0.50',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        location: 'Los Angeles, USA',
        deviceType: 'mobile',
        browser: 'Safari',
        success: true
      },
      {
        id: '3',
        userId: 'unknown',
        userName: 'Unknown',
        userEmail: 'hacker@evil.com',
        loginTime: new Date(Date.now() - 7200000).toISOString(),
        ipAddress: '203.0.113.1',
        userAgent: 'curl/7.68.0',
        location: 'Unknown',
        deviceType: 'desktop',
        browser: 'Unknown',
        success: false,
        failureReason: 'Invalid credentials'
      }
    ];

    const mockStats: UserStats = {
      totalUsers: 156,
      activeUsers: 23,
      newUsersToday: 8,
      totalLogins: 1247,
      failedLogins: 34,
      averageSessionDuration: 1845 // seconds
    };

    setActivities(mockActivities);
    setLoginRecords(mockLogins);
    setUserStats(mockStats);

    // Store in localStorage
    localStorage.setItem('admin_user_activities', JSON.stringify(mockActivities));
    localStorage.setItem('admin_login_records', JSON.stringify(mockLogins));
    localStorage.setItem('admin_user_stats', JSON.stringify(mockStats));
  };

  const exportData = (type: 'activities' | 'logins') => {
    const data = type === 'activities' ? activities : loginRecords;
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${type}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Smartphone className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN': return 'text-green-600 bg-green-50';
      case 'LOGOUT': return 'text-gray-600 bg-gray-50';
      case 'PROFILE_UPDATED': return 'text-blue-600 bg-blue-50';
      case 'FOOD_PREFERENCES_UPDATED': return 'text-orange-600 bg-orange-50';
      case 'WORKOUT_LOGGED': return 'text-purple-600 bg-purple-50';
      case 'ERROR': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogins = loginRecords.filter(login =>
    login.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    login.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    login.ipAddress.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-xl">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Administrator Dashboard</h1>
                <p className="text-gray-600">Monitor user activities and system health</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                🟢 System Online
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'activities', label: 'Activities', icon: Activity },
              { id: 'logins', label: 'Login Records', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">{userStats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.activeUsers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Logins</p>
                  <p className="text-2xl font-bold text-purple-600">{userStats.totalLogins}</p>
                </div>
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Failed Logins</p>
                  <p className="text-2xl font-bold text-red-600">{userStats.failedLogins}</p>
                </div>
                <UserX className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">User Activities</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => exportData('activities')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Details</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-800">{activity.userName}</div>
                          <div className="text-sm text-gray-500">{activity.userEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                          {activity.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{activity.details}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(activity.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{activity.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Login Records Tab */}
        {activeTab === 'logins' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Login Records</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => exportData('logins')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Device</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Login Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogins.map((login) => (
                    <tr key={login.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-800">{login.userName}</div>
                          <div className="text-sm text-gray-500">{login.userEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          login.success 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-red-600 bg-red-50'
                        }`}>
                          {login.success ? 'Success' : 'Failed'}
                        </span>
                        {!login.success && login.failureReason && (
                          <div className="text-xs text-red-500 mt-1">{login.failureReason}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(login.deviceType)}
                          <span className="text-sm text-gray-600">{login.browser}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(login.loginTime).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">{login.ipAddress}</td>
                      <td className="py-3 px-4 text-gray-600">{login.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
