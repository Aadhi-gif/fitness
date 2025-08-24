import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import UnifiedAuth from './components/UnifiedAuth';
import AdminDashboard from './components/AdminDashboard';

// Import page components
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Nutrition from './pages/Nutrition';
import Exercise from './pages/Exercise';
import AssistantPage from './pages/Assistant';
import Progress from './pages/Progress';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import WorkoutLibrary from './pages/WorkoutLibrary';
import MealPlanning from './pages/MealPlanning';

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

function App() {
  const { isAuthenticated, user } = useAuth();

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Show unified auth if not authenticated
  if (!isAuthenticated) {
    return <UnifiedAuth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Fitness Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <Header />

        <ProtectedRoute>
          {isAdmin ? (
            <AdminDashboard />
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/exercise" element={<Exercise />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/workout-library" element={<WorkoutLibrary />} />
              <Route path="/meal-planning" element={<MealPlanning />} />
            </Routes>
          )}
        </ProtectedRoute>

      {/* Footer */}
      {isAuthenticated && (
        <footer className="bg-gray-800 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">FitLife Pro</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Empowering your fitness journey with personalized nutrition plans, expert exercise routines, 
                and intelligent assistance to help you achieve your health goals.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Nutrition</h4>
                  <p className="text-gray-400">Personalized meal plans and calorie tracking</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Exercise</h4>
                  <p className="text-gray-400">Targeted workouts for every muscle group</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Guidance</h4>
                  <p className="text-gray-400">AI assistant for form corrections and tips</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400">
                <p>&copy; 2025 FitLife Pro. Built for your health and wellness journey.</p>
              </div>
            </div>
          </div>
        </footer>
      )}
      </div>
    </div>
  );
}

export default App;