// Comprehensive backend testing utility
interface BackendTestResult {
  endpoint: string;
  isOnline: boolean;
  responseTime: number;
  status: number | null;
  error?: string;
  timestamp: Date;
}

interface BackendHealthReport {
  overall: 'online' | 'offline' | 'partial';
  endpoints: BackendTestResult[];
  averageResponseTime: number;
  successRate: number;
  timestamp: Date;
}

class BackendTester {
  private apiUrl: string;
  private timeout: number;

  constructor(apiUrl?: string, timeout = 5000) {
    this.apiUrl = apiUrl || process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api';
    this.timeout = timeout;
  }

  /**
   * Test a single endpoint
   */
  async testEndpoint(endpoint: string): Promise<BackendTestResult> {
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      return {
        endpoint,
        isOnline: response.ok,
        responseTime,
        status: response.status,
        timestamp: new Date()
      };

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint,
        isOnline: false,
        responseTime,
        status: null,
        error: error.name === 'AbortError' ? 'Timeout' : error.message,
        timestamp: new Date()
      };
    }
  }

  /**
   * Test multiple endpoints and generate health report
   */
  async testBackendHealth(): Promise<BackendHealthReport> {
    const endpoints = [
      `${this.apiUrl}/health`,
      `${this.apiUrl}/status`,
      `${this.apiUrl}/ping`,
      `${this.apiUrl}/auth/profile`,
      this.apiUrl
    ];

    const results = await Promise.all(
      endpoints.map(endpoint => this.testEndpoint(endpoint))
    );

    const onlineCount = results.filter(r => r.isOnline).length;
    const totalCount = results.length;
    const successRate = (onlineCount / totalCount) * 100;
    
    const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / totalCount;

    let overall: 'online' | 'offline' | 'partial';
    if (onlineCount === 0) {
      overall = 'offline';
    } else if (onlineCount === totalCount) {
      overall = 'online';
    } else {
      overall = 'partial';
    }

    return {
      overall,
      endpoints: results,
      averageResponseTime,
      successRate,
      timestamp: new Date()
    };
  }

  /**
   * Quick connectivity check
   */
  async quickCheck(): Promise<boolean> {
    try {
      const result = await this.testEndpoint(this.apiUrl);
      return result.isOnline;
    } catch {
      return false;
    }
  }

  /**
   * Test specific API endpoints
   */
  async testAPIEndpoints(): Promise<{ [key: string]: BackendTestResult }> {
    const apiEndpoints = {
      'Health Check': `${this.apiUrl}/health`,
      'Authentication': `${this.apiUrl}/auth/profile`,
      'Food Preferences': `${this.apiUrl}/preferences/food`,
      'Progress Tracking': `${this.apiUrl}/progress/stats`,
      'Base API': this.apiUrl
    };

    const results: { [key: string]: BackendTestResult } = {};

    for (const [name, endpoint] of Object.entries(apiEndpoints)) {
      results[name] = await this.testEndpoint(endpoint);
    }

    return results;
  }

  /**
   * Monitor backend continuously
   */
  startMonitoring(
    callback: (report: BackendHealthReport) => void,
    interval = 30000
  ): () => void {
    const monitor = async () => {
      const report = await this.testBackendHealth();
      callback(report);
    };

    // Initial check
    monitor();

    // Set up interval
    const intervalId = setInterval(monitor, interval);

    // Return cleanup function
    return () => clearInterval(intervalId);
  }

  /**
   * Get network information
   */
  getNetworkInfo(): {
    online: boolean;
    connection?: any;
    effectiveType?: string;
  } {
    const navigator = window.navigator as any;
    
    return {
      online: navigator.onLine,
      connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection,
      effectiveType: navigator.connection?.effectiveType
    };
  }

  /**
   * Test with authentication
   */
  async testWithAuth(token: string): Promise<BackendTestResult> {
    const endpoint = `${this.apiUrl}/auth/profile`;
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      return {
        endpoint,
        isOnline: response.ok,
        responseTime,
        status: response.status,
        timestamp: new Date()
      };

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint,
        isOnline: false,
        responseTime,
        status: null,
        error: error.name === 'AbortError' ? 'Timeout' : error.message,
        timestamp: new Date()
      };
    }
  }
}

// Utility functions for easy use
export const backendTester = new BackendTester();

export const checkBackendStatus = async (): Promise<boolean> => {
  return await backendTester.quickCheck();
};

export const getBackendHealth = async (): Promise<BackendHealthReport> => {
  return await backendTester.testBackendHealth();
};

export const testAPIEndpoints = async (): Promise<{ [key: string]: BackendTestResult }> => {
  return await backendTester.testAPIEndpoints();
};

export const isNetworkOnline = (): boolean => {
  return navigator.onLine;
};

export const getConnectionInfo = () => {
  return backendTester.getNetworkInfo();
};

// React hook for backend monitoring
export const useBackendMonitoring = (interval = 30000) => {
  const [health, setHealth] = React.useState<BackendHealthReport | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const stopMonitoring = backendTester.startMonitoring((report) => {
      setHealth(report);
      setIsLoading(false);
    }, interval);

    return stopMonitoring;
  }, [interval]);

  return { health, isLoading };
};

export default BackendTester;
