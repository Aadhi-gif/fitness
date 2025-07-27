import React, { useState, useEffect } from 'react';
import { 
  Server, Wifi, WifiOff, RefreshCw, CheckCircle, XCircle, 
  AlertTriangle, Activity, Clock, Globe, Monitor, Smartphone,
  Download, Copy, ExternalLink
} from 'lucide-react';
import BackendHealthChecker from './BackendHealthChecker';
import { backendTester, getBackendHealth, testAPIEndpoints, getConnectionInfo } from '../utils/backendTester';

interface EndpointTest {
  name: string;
  url: string;
  status: 'online' | 'offline' | 'testing';
  responseTime: number;
  error?: string;
  lastTested: Date;
}

const BackendStatusPage: React.FC = () => {
  const [endpoints, setEndpoints] = useState<EndpointTest[]>([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [testResults, setTestResults] = useState<string>('');

  const apiUrl = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api';

  useEffect(() => {
    initializeEndpoints();
    updateNetworkInfo();
    testAllEndpoints();
  }, []);

  const initializeEndpoints = () => {
    const endpointList: EndpointTest[] = [
      { name: 'Health Check', url: `${apiUrl}/health`, status: 'testing', responseTime: 0, lastTested: new Date() },
      { name: 'Authentication', url: `${apiUrl}/auth/profile`, status: 'testing', responseTime: 0, lastTested: new Date() },
      { name: 'Food Preferences', url: `${apiUrl}/preferences/food`, status: 'testing', responseTime: 0, lastTested: new Date() },
      { name: 'Progress Tracking', url: `${apiUrl}/progress/stats`, status: 'testing', responseTime: 0, lastTested: new Date() },
      { name: 'Base API', url: apiUrl, status: 'testing', responseTime: 0, lastTested: new Date() }
    ];
    setEndpoints(endpointList);
  };

  const updateNetworkInfo = () => {
    const info = getConnectionInfo();
    setNetworkInfo(info);
  };

  const testAllEndpoints = async () => {
    setIsTestingAll(true);
    
    try {
      const results = await testAPIEndpoints();
      
      setEndpoints(prev => prev.map(endpoint => {
        const result = Object.values(results).find(r => r.endpoint === endpoint.url);
        if (result) {
          return {
            ...endpoint,
            status: result.isOnline ? 'online' : 'offline',
            responseTime: result.responseTime,
            error: result.error,
            lastTested: result.timestamp
          };
        }
        return endpoint;
      }));

      // Generate test results summary
      const summary = Object.entries(results).map(([name, result]) => 
        `${name}: ${result.isOnline ? '✅ Online' : '❌ Offline'} (${result.responseTime}ms)`
      ).join('\n');
      
      setTestResults(`Backend Test Results (${new Date().toLocaleString()}):\n\n${summary}`);

    } catch (error) {
      console.error('Failed to test endpoints:', error);
    } finally {
      setIsTestingAll(false);
    }
  };

  const testSingleEndpoint = async (index: number) => {
    const endpoint = endpoints[index];
    
    setEndpoints(prev => prev.map((ep, i) => 
      i === index ? { ...ep, status: 'testing' } : ep
    ));

    try {
      const result = await backendTester.testEndpoint(endpoint.url);
      
      setEndpoints(prev => prev.map((ep, i) => 
        i === index ? {
          ...ep,
          status: result.isOnline ? 'online' : 'offline',
          responseTime: result.responseTime,
          error: result.error,
          lastTested: result.timestamp
        } : ep
      ));
    } catch (error) {
      console.error('Failed to test endpoint:', error);
    }
  };

  const copyResults = () => {
    navigator.clipboard.writeText(testResults);
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(endpoints, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `backend_status_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'testing':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-50 border-green-200';
      case 'offline':
        return 'bg-red-50 border-red-200';
      case 'testing':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-orange-50 border-orange-200';
    }
  };

  const onlineCount = endpoints.filter(ep => ep.status === 'online').length;
  const totalCount = endpoints.length;
  const successRate = totalCount > 0 ? (onlineCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Backend Status Monitor</h1>
              <p className="text-gray-600">Real-time backend connectivity and health monitoring</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={testAllEndpoints}
              disabled={isTestingAll}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isTestingAll ? 'animate-spin' : ''}`} />
              Test All
            </button>
            
            <button
              onClick={exportResults}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{successRate.toFixed(1)}%</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Online Endpoints</p>
              <p className="text-2xl font-bold text-blue-600">{onlineCount}/{totalCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Network Status</p>
              <p className="text-2xl font-bold text-purple-600">
                {networkInfo?.online ? 'Online' : 'Offline'}
              </p>
            </div>
            {networkInfo?.online ? 
              <Wifi className="w-8 h-8 text-purple-600" /> : 
              <WifiOff className="w-8 h-8 text-red-600" />
            }
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Connection Type</p>
              <p className="text-2xl font-bold text-orange-600">
                {networkInfo?.effectiveType || 'Unknown'}
              </p>
            </div>
            <Globe className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Backend Health Checker */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Live Health Monitor</h2>
        <BackendHealthChecker showDetails={true} />
      </div>

      {/* Endpoint Tests */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">API Endpoint Tests</h2>
        
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getStatusColor(endpoint.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(endpoint.status)}
                  <div>
                    <h3 className="font-semibold text-gray-800">{endpoint.name}</h3>
                    <p className="text-sm text-gray-600">{endpoint.url}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {endpoint.responseTime > 0 && `${endpoint.responseTime}ms`}
                    </div>
                    <div className="text-xs text-gray-500">
                      {endpoint.lastTested.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => testSingleEndpoint(index)}
                    disabled={endpoint.status === 'testing'}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${endpoint.status === 'testing' ? 'animate-spin' : ''}`} />
                  </button>
                  
                  <a
                    href={endpoint.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              {endpoint.error && (
                <div className="mt-2 p-2 bg-white/20 rounded text-sm">
                  <strong>Error:</strong> {endpoint.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Test Results</h2>
            <button
              onClick={copyResults}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
            {testResults}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BackendStatusPage;
