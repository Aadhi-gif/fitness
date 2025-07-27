import React, { useState, useEffect } from 'react';
import { 
  Wifi, WifiOff, Cloud, CloudOff, RefreshCw, CheckCircle, 
  XCircle, AlertTriangle, Activity, Clock, Globe, Server
} from 'lucide-react';

interface BackendHealth {
  isOnline: boolean;
  responseTime: number;
  lastChecked: Date;
  status: 'online' | 'offline' | 'checking' | 'error';
  endpoint: string;
  errorMessage?: string;
}

interface BackendHealthCheckerProps {
  apiUrl?: string;
  checkInterval?: number;
  showDetails?: boolean;
  className?: string;
}

const BackendHealthChecker: React.FC<BackendHealthCheckerProps> = ({
  apiUrl = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api',
  checkInterval = 30000, // 30 seconds
  showDetails = false,
  className = ''
}) => {
  const [health, setHealth] = useState<BackendHealth>({
    isOnline: false,
    responseTime: 0,
    lastChecked: new Date(),
    status: 'checking',
    endpoint: apiUrl
  });

  const [isManualChecking, setIsManualChecking] = useState(false);

  const checkBackendHealth = async (isManual = false) => {
    if (isManual) {
      setIsManualChecking(true);
    }

    setHealth(prev => ({ ...prev, status: 'checking' }));

    const startTime = Date.now();
    
    try {
      // Try multiple endpoints to determine backend health
      const healthEndpoints = [
        `${apiUrl}/health`,
        `${apiUrl}/status`,
        `${apiUrl}/ping`,
        apiUrl // Base API URL
      ];

      let isOnline = false;
      let responseTime = 0;
      let errorMessage = '';

      // Test each endpoint until one succeeds
      for (const endpoint of healthEndpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal
          });

          clearTimeout(timeoutId);
          responseTime = Date.now() - startTime;

          if (response.ok) {
            isOnline = true;
            break;
          } else {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
        } catch (error: any) {
          if (error.name === 'AbortError') {
            errorMessage = 'Request timeout (>5s)';
          } else {
            errorMessage = error.message || 'Network error';
          }
        }
      }

      setHealth({
        isOnline,
        responseTime,
        lastChecked: new Date(),
        status: isOnline ? 'online' : 'offline',
        endpoint: apiUrl,
        errorMessage: isOnline ? undefined : errorMessage
      });

    } catch (error: any) {
      setHealth({
        isOnline: false,
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
        status: 'error',
        endpoint: apiUrl,
        errorMessage: error.message || 'Unknown error'
      });
    } finally {
      if (isManual) {
        setIsManualChecking(false);
      }
    }
  };

  // Automatic health checking
  useEffect(() => {
    checkBackendHealth();
    
    const interval = setInterval(() => {
      checkBackendHealth();
    }, checkInterval);

    return () => clearInterval(interval);
  }, [apiUrl, checkInterval]);

  const getStatusIcon = () => {
    switch (health.status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'checking':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (health.status) {
      case 'online':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'offline':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'checking':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'error':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (health.status) {
      case 'online':
        return 'Backend Online';
      case 'offline':
        return 'Backend Offline';
      case 'checking':
        return 'Checking...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Unknown Status';
    }
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) {
      return `${ms}ms`;
    } else {
      return `${(ms / 1000).toFixed(1)}s`;
    }
  };

  if (!showDetails) {
    // Compact version
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor()} ${className}`}>
        {getStatusIcon()}
        <span className="text-sm font-medium">
          {health.status === 'online' ? 'Online' : 'Offline'}
        </span>
      </div>
    );
  }

  // Detailed version
  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold">{getStatusText()}</h3>
            <p className="text-sm opacity-80">
              {health.status === 'online' 
                ? 'All systems operational' 
                : health.errorMessage || 'Backend is not responding'
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={() => checkBackendHealth(true)}
          disabled={isManualChecking}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
          title="Check backend health"
        >
          <RefreshCw className={`w-4 h-4 ${isManualChecking ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <span>Response Time: {formatResponseTime(health.responseTime)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Last Check: {health.lastChecked.toLocaleTimeString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4" />
          <span>Endpoint: {new URL(health.endpoint).hostname}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Status: {health.status.toUpperCase()}</span>
        </div>
      </div>

      {health.errorMessage && (
        <div className="mt-3 p-2 bg-white/20 rounded text-sm">
          <strong>Error:</strong> {health.errorMessage}
        </div>
      )}

      <div className="mt-3 text-xs opacity-70">
        Automatic checks every {checkInterval / 1000} seconds
      </div>
    </div>
  );
};

export default BackendHealthChecker;
