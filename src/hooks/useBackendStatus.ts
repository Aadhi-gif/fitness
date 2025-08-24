import { useState, useEffect, useCallback } from 'react';

interface BackendStatus {
  isOnline: boolean;
  isChecking: boolean;
  lastChecked: Date | null;
  responseTime: number;
  error: string | null;
}

interface UseBackendStatusOptions {
  checkInterval?: number;
  timeout?: number;
  autoStart?: boolean;
}

export const useBackendStatus = (options: UseBackendStatusOptions = {}) => {
  const {
    checkInterval = 30000, // 30 seconds
    timeout = 5000, // 5 seconds
    autoStart = true
  } = options;

  const [status, setStatus] = useState<BackendStatus>({
    isOnline: false,
    isChecking: false,
    lastChecked: null,
    responseTime: 0,
    error: null
  });

  const apiUrl = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api';

  const checkBackendStatus = useCallback(async () => {
    setStatus(prev => ({ ...prev, isChecking: true, error: null }));
    
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Try multiple endpoints
      const endpoints = [
        `${apiUrl}/health`,
        `${apiUrl}/status`,
        `${apiUrl}/ping`,
        apiUrl
      ];

      let isOnline = false;
      let error: string | null = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
          });

          if (response.ok) {
            isOnline = true;
            break;
          } else {
            error = `HTTP ${response.status}`;
          }
        } catch (err: any) {
          if (err.name === 'AbortError') {
            error = 'Timeout';
          } else {
            error = err.message || 'Network error';
          }
        }
      }

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      setStatus({
        isOnline,
        isChecking: false,
        lastChecked: new Date(),
        responseTime,
        error: isOnline ? null : error
      });

    } catch (err: any) {
      const responseTime = Date.now() - startTime;
      
      setStatus({
        isOnline: false,
        isChecking: false,
        lastChecked: new Date(),
        responseTime,
        error: err.message || 'Unknown error'
      });
    }
  }, [apiUrl, timeout]);

  // Manual check function
  const checkNow = useCallback(() => {
    checkBackendStatus();
  }, [checkBackendStatus]);

  // Auto-check effect
  useEffect(() => {
    if (!autoStart) return;

    // Initial check
    checkBackendStatus();

    // Set up interval
    const interval = setInterval(checkBackendStatus, checkInterval);

    return () => clearInterval(interval);
  }, [checkBackendStatus, checkInterval, autoStart]);

  return {
    ...status,
    checkNow,
    // Convenience getters
    isOffline: !status.isOnline,
    statusText: status.isOnline ? 'Online' : 'Offline',
    statusColor: status.isOnline ? 'green' : 'red',
    formattedResponseTime: status.responseTime < 1000 
      ? `${status.responseTime}ms` 
      : `${(status.responseTime / 1000).toFixed(1)}s`,
    formattedLastChecked: status.lastChecked?.toLocaleTimeString() || 'Never'
  };
};

// Simple hook for just checking if backend is online
export const useIsBackendOnline = (checkInterval = 30000) => {
  const { isOnline, isChecking } = useBackendStatus({ checkInterval });
  return { isOnline, isChecking };
};

// Hook for one-time backend check
export const useBackendCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{ isOnline: boolean; error?: string } | null>(null);

  const checkBackend = useCallback(async () => {
    setIsChecking(true);
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api';
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      setResult({ isOnline: response.ok });
    } catch (error: any) {
      setResult({ isOnline: false, error: error.message });
    } finally {
      setIsChecking(false);
    }
  }, []);

  return { checkBackend, isChecking, result };
};

export default useBackendStatus;
