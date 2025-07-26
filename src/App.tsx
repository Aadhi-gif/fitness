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
import WelcomeBanner from './components/WelcomeBanner';
import FloatingAuthButton from './components/FloatingAuthButton';
import QuickAuthSidebar from './components/QuickAuthSidebar';
import StickyAuthBar from './components/StickyAuthBar';

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
  const { isAuthenticated } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Welcome Banner - shows at top for non-authenticated users */}
      <WelcomeBanner />

      <Header />

      {/* Quick Auth Sidebar - slides in from left */}
      <QuickAuthSidebar />

      <ProtectedRoute>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!userProfile ? (
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Your Fitness Journey
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get personalized diet plans, exercise routines, and expert guidance based on your unique goals and body metrics.
              </p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {userProfile.name}! 
              </h2>
              <p className="text-lg text-gray-600">
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

      {/* Floating Action Button - bottom right corner */}
      <FloatingAuthButton />

      {/* Sticky Auth Bar - appears at bottom when scrolling */}
      <StickyAuthBar />
    </div>
  );
}

export default App;