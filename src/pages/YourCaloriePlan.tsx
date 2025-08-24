import React, { useState, useEffect } from 'react';
import { Calculator, Target, Flame, Crown, TrendingUp, AlertCircle } from 'lucide-react';
import CalorieCalculator from '../components/CalorieCalculator';

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

const YourCaloriePlan: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load profile from sessionStorage on component mount
  useEffect(() => {
    const savedProfile = sessionStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-2xl">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                <Crown className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Your Elite Calorie Plan</h1>
              <p className="text-orange-300 text-lg">Precision nutrition calculations for champions</p>
            </div>
          </div>
        </div>

        {/* Profile Required Message */}
        {!userProfile ? (
          <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30">
            <div className="p-4 bg-orange-600/20 rounded-2xl inline-block mb-4">
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Profile Required for Elite Calculations
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              To calculate your personalized calorie plan, we need your body metrics and fitness goals. 
              Set up your profile first to unlock precision nutrition planning.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span>BMR Calculation</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span>TDEE Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Goal-Based Targets</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-lg">
              Set Up Your Profile First
            </button>
          </div>
        ) : (
          <>
            {/* Welcome Message with Profile */}
            <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30">
              <div className="p-4 bg-green-600/20 rounded-2xl inline-block mb-4">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Elite Calorie Plan for <span className="text-orange-400">{userProfile.name}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                Your personalized nutrition calculations based on your elite profile
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-orange-400 font-semibold">Goal:</span>
                  <span className="capitalize">
                    {userProfile.goal === 'lose' ? 'Weight Loss' : 
                     userProfile.goal === 'gain' ? 'Weight Gain' : 'Weight Maintenance'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-orange-400 font-semibold">Activity:</span>
                  <span className="capitalize">{userProfile.activityLevel.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Calorie Calculator Component */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30">
              <CalorieCalculator profile={userProfile} />
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-400" />
                Elite Nutrition Guidelines
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/30">
                  <h4 className="text-orange-400 font-bold text-lg mb-3">Calorie Timing</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Eat 25-30% of calories within 2 hours post-workout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Distribute remaining calories evenly throughout the day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Avoid large calorie deficits on training days</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-xl border border-red-500/30">
                  <h4 className="text-red-400 font-bold text-lg mb-3">Elite Tips</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Track calories for 2 weeks to establish baseline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Adjust based on weekly weight and performance changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Prioritize whole foods over processed options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-green-400" />
                Continue Your Elite Journey
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/20">
                  <div className="p-3 bg-green-600/20 rounded-xl inline-block mb-4">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Next: Your Diet Plan</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Get specific meal recommendations and macro breakdowns based on your calorie targets
                  </p>
                  <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
                    View Diet Plan
                  </button>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                  <div className="p-3 bg-blue-600/20 rounded-xl inline-block mb-4">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Next: Exercise Routines</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Access elite workout routines designed to complement your nutrition plan
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                    Start Training
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

export default YourCaloriePlan;
