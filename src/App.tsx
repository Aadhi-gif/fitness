import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfileForm from './components/UserProfileForm';
import CalorieCalculator from './components/CalorieCalculator';
import DietPlan from './components/DietPlan';
import ExerciseRoutines from './components/ExerciseRoutines';
import Assistant from './components/Assistant';
import UnifiedAuth from './components/UnifiedAuth';
import AdminDashboard from './components/AdminDashboard';

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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  const calculateTargetCalories = (profile: UserProfile): number => {
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr: number;
    if (profile.gender === 'male') {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9
    };

    const tdee = bmr * activityMultipliers[profile.activityLevel];

    // Goal adjustment
    switch (profile.goal) {
      case 'lose':
        return Math.round(tdee - 500);
      case 'gain':
        return Math.round(tdee + 500);
      default:
        return Math.round(tdee);
    }
  };

  const targetCalories = userProfile ? calculateTargetCalories(userProfile) : 0;

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
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!userProfile ? (
              <div className="text-center mb-8 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome to Your Fitness Journey
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Get personalized diet plans, exercise routines, and expert guidance based on your unique goals and body metrics.
                </p>
              </div>
            ) : (
              <div className="text-center mb-8 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {userProfile.name}!
                </h2>
                <p className="text-lg text-gray-300">
                  Your personalized fitness plan is ready. Let's achieve your goals together!
                </p>
              </div>
            )}

          <UserProfileForm 
            onProfileSubmit={setUserProfile} 
            currentProfile={userProfile}
          />

          {userProfile && (
            <>
              <CalorieCalculator profile={userProfile} />
              
              <DietPlan 
                targetCalories={targetCalories} 
                goal={userProfile.goal} 
              />
              
              <ExerciseRoutines />
              
              <Assistant 
                userProfile={userProfile} 
                targetCalories={targetCalories} 
              />
            </>
          )}
          </main>
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