import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader, Lock, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import AuthModal from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="text-center max-w-2xl mx-auto p-8">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl inline-block mb-6">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FitLife Pro</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users on their fitness journey. Sign in to access your personalized dashboard.
            </p>

            {/* Primary Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
              <button
                onClick={handleLoginClick}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <LogIn className="w-5 h-5" />
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleRegisterClick}
                className="flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                Create Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Demo Account Info */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-green-800 mb-2">🚀 Try Demo Account</h3>
              <p className="text-sm text-green-700 mb-3">
                Want to explore first? Use our demo account:
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p><strong>Email:</strong> demo@fitlife.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-4">What you'll get access to:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="text-left">
                  <li>• Personalized calorie calculations</li>
                  <li>• Custom diet plans and meal suggestions</li>
                  <li>• Targeted exercise routines</li>
                </div>
                <div className="text-left">
                  <li>• AI fitness assistant for guidance</li>
                  <li>• Progress tracking and analytics</li>
                  <li>• Goal-based nutrition planning</li>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authModalMode}
          onSwitchMode={(mode) => setAuthModalMode(mode)}
        />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;