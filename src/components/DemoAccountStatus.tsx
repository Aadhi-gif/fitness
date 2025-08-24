import React, { useState, useEffect } from 'react';
import { 
  Clock, AlertTriangle, CheckCircle, XCircle, 
  User, RefreshCw, Info, Eye, EyeOff 
} from 'lucide-react';
import { demoAccountManager } from '../services/demoAccountManager';

interface DemoAccountStatusProps {
  className?: string;
  showInLogin?: boolean;
}

const DemoAccountStatus: React.FC<DemoAccountStatusProps> = ({ 
  className = '', 
  showInLogin = false 
}) => {
  const [demoInfo, setDemoInfo] = useState(demoAccountManager.getDemoAccountInfo());
  const [demoStatus, setDemoStatus] = useState(demoAccountManager.getDemoStatus());
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setDemoInfo(demoAccountManager.getDemoAccountInfo());
      setDemoStatus(demoAccountManager.getDemoStatus());
      setTimeRemaining(demoAccountManager.getTimeUntilExpiration());
    };

    updateStatus();
    const interval = setInterval(updateStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setDemoInfo(demoAccountManager.getDemoAccountInfo());
    setDemoStatus(demoAccountManager.getDemoStatus());
    setTimeRemaining(demoAccountManager.getTimeUntilExpiration());
  };

  const getStatusIcon = () => {
    if (demoInfo.isAvailable) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    if (demoInfo.isAvailable) {
      return 'bg-green-50 border-green-200 text-green-800';
    } else {
      return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  if (showInLogin) {
    // Compact version for login form
    return (
      <div className={`border rounded-lg p-3 ${getStatusColor()} ${className}`}>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <div className="flex-1">
            <div className="text-sm font-medium">Demo Account</div>
            <div className="text-xs opacity-80">{demoInfo.message}</div>
          </div>
          {demoInfo.isAvailable && (
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 hover:bg-white/20 rounded"
              title={showPassword ? 'Hide credentials' : 'Show credentials'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        {demoInfo.isAvailable && showPassword && (
          <div className="mt-2 p-2 bg-white/20 rounded text-xs">
            <div><strong>Email:</strong> {demoInfo.email}</div>
            <div><strong>Password:</strong> {demoInfo.password}</div>
          </div>
        )}

        {demoStatus.isCurrentlyActive && timeRemaining && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span>{timeRemaining}</span>
          </div>
        )}
      </div>
    );
  }

  // Full version for dashboard/settings
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Demo Account Status</h3>
            <p className="text-sm text-gray-600">First-time use only</p>
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh status"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
        <div className="flex items-start gap-3">
          {getStatusIcon()}
          <div className="flex-1">
            <div className="font-medium mb-1">
              {demoInfo.isAvailable ? 'Available' : 'Not Available'}
            </div>
            <div className="text-sm opacity-90 mb-3">
              {demoInfo.message}
            </div>

            {demoInfo.isAvailable && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Email:</span>
                  <code className="px-2 py-1 bg-white/20 rounded text-xs">
                    {demoInfo.email}
                  </code>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Password:</span>
                  <code className="px-2 py-1 bg-white/20 rounded text-xs">
                    {demoInfo.password}
                  </code>
                </div>
              </div>
            )}

            {demoStatus.hasBeenUsed && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">First used:</span>{' '}
                    {demoStatus.firstUsed ? new Date(demoStatus.firstUsed).toLocaleString() : 'Unknown'}
                  </div>
                  <div>
                    <span className="font-medium">Usage count:</span>{' '}
                    {demoStatus.usageCount || 0} times
                  </div>
                  <div>
                    <span className="font-medium">Currently active:</span>{' '}
                    {demoStatus.isCurrentlyActive ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            )}

            {demoStatus.isCurrentlyActive && timeRemaining && (
              <div className="mt-3 flex items-center gap-2 p-2 bg-white/20 rounded">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{timeRemaining}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {demoAccountManager.shouldShowExpirationWarning() && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
            <div className="text-sm text-orange-800">
              <div className="font-medium mb-1">Demo Session Ending Soon</div>
              <div>
                Consider creating your own account to save your progress and continue using all features.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-1">Demo Account Policy</div>
            <div>
              The demo account is available for first-time use only. After logout or session expiry, 
              you'll need to create your own account to continue using the application.
            </div>
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-600">
            <div className="font-medium mb-1">Development Mode</div>
            <button
              onClick={() => {
                demoAccountManager.resetDemoAccount();
                handleRefresh();
              }}
              className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors"
            >
              Reset Demo Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoAccountStatus;
