import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, X, ArrowUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const StickyAuthBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Show the bar after user scrolls down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled && !isAuthenticated);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Sticky Auth Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <h3 className="font-bold text-gray-800">Ready to start your fitness journey?</h3>
                  <p className="text-sm text-gray-600">Join thousands of users achieving their goals</p>
                </div>
                <div className="sm:hidden">
                  <h3 className="font-bold text-gray-800">Join FitLife Pro</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Login</span>
                </button>

                <button
                  onClick={handleRegisterClick}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Join Free</span>
                  <span className="sm:hidden">Join</span>
                </button>

                <button
                  onClick={() => setIsVisible(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Demo info for mobile */}
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Demo: demo@fitlife.com / demo123
              </p>
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
};

export default StickyAuthBar;
