import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dumbbell, User, LogOut, Settings, Home, UserCircle,
  Apple, Zap, Bot, Crown, Menu, X, TrendingUp, Target,
  ChefHat, BookOpen, Calculator, Utensils
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BackendStatus from './BackendStatus';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const navigationItems = [
    // Original 4 Main Sections
    { path: '/your-profile', label: 'Your Profile', icon: UserCircle },
    { path: '/your-calorie-plan', label: 'Your Calorie Plan', icon: Calculator },
    { path: '/your-diet-plan', label: 'Your Diet Plan', icon: Utensils },
    { path: '/exercise-routines', label: 'Exercise Routines', icon: Dumbbell },

    // Additional Features
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/assistant', label: 'AI Coach', icon: Bot }
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-40 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                  <Crown className="w-3 h-3 text-yellow-900" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  FITLIFE PRO
                </h1>
                <p className="text-orange-300 text-sm font-bold">ELITE EDITION</p>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              {/* Navigation Menu */}
              {isAuthenticated && (
                <nav className="hidden md:flex items-center gap-1">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path ||
                      (item.path === '/your-profile' && location.pathname === '/');
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              )}

              {/* Mobile Menu Button */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}

              {isAuthenticated && <BackendStatus />}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-3 text-white px-4 py-3 rounded-xl transition-all shadow-lg ${
                      user?.role === 'admin'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border border-red-500/30'
                        : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 border border-orange-500/30'
                    }`}
                  >
                    <div className="p-1 bg-white/20 rounded-full">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">{user?.name}</span>
                      {user?.role === 'admin' ? (
                        <span className="text-xs opacity-80 font-semibold">ADMINISTRATOR</span>
                      ) : (
                        <span className="text-xs opacity-80 font-semibold">ELITE MEMBER</span>
                      )}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-500/30 py-2">
                      <div className="px-4 py-3 border-b border-orange-500/30">
                        <p className="text-sm font-bold text-white">{user?.name}</p>
                        <p className="text-xs text-orange-300">{user?.email}</p>
                        {user?.role === 'admin' && (
                          <span className="inline-block mt-1 px-2 py-1 bg-red-600/20 text-red-300 text-xs font-bold rounded border border-red-500/30">
                            ADMIN ACCESS
                          </span>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-orange-600/20 flex items-center gap-2 transition-all"
                      >
                        <UserCircle className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-orange-600/20 flex items-center gap-2 transition-all"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-600/20 flex items-center gap-2 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && isAuthenticated && (
          <div className="md:hidden bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-xl border-t border-orange-500/30">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path ||
                  (item.path === '/your-profile' && location.pathname === '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;