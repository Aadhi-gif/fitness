import React, { useState } from 'react';
import { LogIn, UserPlus, X, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const WelcomeBanner: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Don't show if user is already authenticated or banner is dismissed
  if (isAuthenticated || !isVisible) return null;

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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute top-8 right-8">
            <Star className="w-6 h-6" />
          </div>
          <div className="absolute bottom-4 left-1/4">
            <Star className="w-4 h-4" />
          </div>
          <div className="absolute bottom-8 right-1/4">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Welcome to FitLife Pro!</h2>
                  <p className="text-blue-100">Transform your health journey with personalized fitness plans</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                
                <button
                  onClick={handleRegisterClick}
                  className="flex items-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-all font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  Join Free
                </button>

                <div className="hidden sm:flex items-center gap-2 text-sm text-blue-100">
                  <span>•</span>
                  <span>Demo: demo@fitlife.com / demo123</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all ml-4"
            >
              <X className="w-5 h-5" />
            </button>
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

export default WelcomeBanner;
