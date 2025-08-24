import React, { useState } from 'react';
import { LogIn, UserPlus, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const QuickAuthSidebar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Don't show if user is already authenticated
  if (isAuthenticated) return null;

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${
        isExpanded ? 'translate-x-0' : '-translate-x-64'
      }`}>
        <div className="bg-white shadow-2xl rounded-r-2xl border-r border-gray-200">
          {/* Sidebar Content */}
          <div className="w-64 p-6">
            <div className="text-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl inline-block mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Quick Access</h3>
              <p className="text-sm text-gray-600">Join FitLife Pro instantly</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleLoginClick}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>

              <button
                onClick={handleRegisterClick}
                className="w-full flex items-center gap-3 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 text-sm">🎯 Demo Access</h4>
                <div className="text-xs text-green-700 space-y-1">
                  <p><strong>Email:</strong> demo@fitlife.com</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 text-sm">✨ Features</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Calorie Calculator</li>
                  <li>• Custom Diet Plans</li>
                  <li>• Exercise Routines</li>
                  <li>• AI Assistant</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Close quick access sidebar" : "Open quick access sidebar"}
          aria-expanded={isExpanded}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-16 rounded-r-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
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
};

export default QuickAuthSidebar;
