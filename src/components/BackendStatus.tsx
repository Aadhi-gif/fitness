import React from 'react';
import { Wifi, WifiOff, Cloud, CloudOff, Database, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BackendStatusProps {
  className?: string;
  showDetails?: boolean;
}

const BackendStatus: React.FC<BackendStatusProps> = ({ 
  className = '', 
  showDetails = false 
}) => {
  const { isBackendConnected, isAuthenticated } = useAuth();

  if (!showDetails && isBackendConnected) {
    // Don't show anything when backend is working normally
    return null;
  }

  const getStatusInfo = () => {
    if (isBackendConnected) {
      return {
        icon: <Cloud className="w-4 h-4" />,
        text: 'Backend Connected',
        description: 'All data is synced with the server',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        icon: <CloudOff className="w-4 h-4" />,
        text: 'Offline Mode',
        description: 'Data is stored locally. Will sync when connection is restored.',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200'
      };
    }
  };

  const status = getStatusInfo();

  if (showDetails) {
    return (
      <div className={`${status.bgColor} ${status.borderColor} border rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className={`${status.textColor} mt-0.5`}>
            {status.icon}
          </div>
          <div className="flex-1">
            <div className={`font-medium ${status.textColor}`}>
              {status.text}
            </div>
            <div className={`text-sm ${status.textColor} opacity-80 mt-1`}>
              {status.description}
            </div>
            {!isBackendConnected && (
              <div className="mt-2 text-xs text-yellow-600">
                <div className="flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  <span>Local storage active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Compact version for header/status bar
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bgColor} ${status.borderColor} border ${className}`}>
      <div className={status.textColor}>
        {status.icon}
      </div>
      <span className={`text-sm font-medium ${status.textColor}`}>
        {isBackendConnected ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default BackendStatus;
