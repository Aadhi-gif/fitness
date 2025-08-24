import React, { useState, useEffect } from 'react';
import { Utensils, Target, Crown, AlertCircle, ChefHat, Apple } from 'lucide-react';
import DietPlan from '../components/DietPlan';

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

const YourPersonalizedDietPlan: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [targetCalories, setTargetCalories] = useState<number>(0);

  // Load profile from sessionStorage on component mount
  useEffect(() => {
    const savedProfile = sessionStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);

      // Calculate target calories
      const calories = calculateTargetCalories(profile);
      setTargetCalories(calories);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                <Crown className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Your Personalized Diet Plan</h1>
              <p className="text-green-300 text-lg">Elite nutrition strategy tailored for champions</p>
            </div>
          </div>
        </div>

        {/* Profile Required Message */}
        {!userProfile ? (
          <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
            <div className="p-4 bg-green-600/20 rounded-2xl inline-block mb-4">
              <AlertCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Profile Required for Elite Diet Planning
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              To create your personalized diet plan, we need your body metrics, fitness goals, and calorie targets. 
              Complete your profile and calorie calculations first.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                <span>Macro Calculations</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-blue-400" />
                <span>Meal Planning</span>
              </div>
              <div className="flex items-center gap-2">
                <Apple className="w-4 h-4 text-red-400" />
                <span>Food Preferences</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Set Up Profile
              </button>
              <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all">
                Calculate Calories
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Message with Profile */}
            <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
              <div className="p-4 bg-green-600/20 rounded-2xl inline-block mb-4">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Elite Diet Plan for <span className="text-green-400">{userProfile.name}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                Your personalized meal strategy designed for optimal performance
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-green-400 font-semibold">Target:</span>
                  <span>{targetCalories} calories/day</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-green-400 font-semibold">Goal:</span>
                  <span className="capitalize">
                    {userProfile.goal === 'lose' ? 'Weight Loss' : 
                     userProfile.goal === 'gain' ? 'Weight Gain' : 'Weight Maintenance'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-green-400 font-semibold">Activity:</span>
                  <span className="capitalize">{userProfile.activityLevel.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Diet Plan Component */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
              <DietPlan targetCalories={targetCalories} goal={userProfile.goal} />
            </div>

            {/* Diet Plan Benefits */}
            <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Apple className="w-6 h-6 text-green-400" />
                Elite Diet Plan Benefits
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                  <h4 className="text-green-400 font-bold text-lg mb-3">Precision Macros</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Calculated protein for muscle preservation/growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Optimal carb timing for performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Healthy fats for hormone production</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                  <h4 className="text-blue-400 font-bold text-lg mb-3">Meal Variety</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>7-day rotating meal plans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Customizable food preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Budget and time considerations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/30">
                  <h4 className="text-orange-400 font-bold text-lg mb-3">Performance Focus</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Pre and post-workout nutrition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Energy optimization throughout day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Recovery-focused meal timing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-400" />
                Complete Your Elite Transformation
              </h3>
              
              <div className="text-center">
                <div className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                  <div className="p-3 bg-blue-600/20 rounded-xl inline-block mb-4">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Next: Exercise Routines</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Complete your transformation with elite exercise routines designed to complement your nutrition plan
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all">
                    Access Elite Workouts
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YourPersonalizedDietPlan;
