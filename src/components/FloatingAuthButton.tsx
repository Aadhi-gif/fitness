import React, { useState } from 'react';
import { LogIn, UserPlus, X, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const FloatingAuthButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Don't show if user is already authenticated
  if (isAuthenticated) return null;

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
    setIsExpanded(false);
  };

  const handleRegisterClick = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[280px]">
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-800 mb-1">Join FitLife Pro</h3>
              <p className="text-sm text-gray-600">Start your fitness journey today</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleLoginClick}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              
              <button
                onClick={handleRegisterClick}
                className="w-full flex items-center gap-3 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-2">Demo Account:</p>
              <div className="bg-gray-50 rounded-lg p-2 text-xs">
                <p><strong>Email:</strong> demo@fitlife.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Close authentication menu" : "Open authentication menu"}
          aria-expanded={isExpanded}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isExpanded
              ? 'bg-red-500 hover:bg-red-600 rotate-45'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          }`}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white mx-auto" />
          ) : (
            <Users className="w-6 h-6 text-white mx-auto" />
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

export default FloatingAuthButton;
