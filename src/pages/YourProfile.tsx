import React, { useState } from 'react';
import { User, Target, Trophy, Crown } from 'lucide-react';
import UserProfileForm from '../components/UserProfileForm';

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

const YourProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    // Save to sessionStorage (will be cleared when tab closes)
    sessionStorage.setItem('userProfile', JSON.stringify(profile));
  };

  // Load profile from sessionStorage on component mount
  React.useEffect(() => {
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
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                <Crown className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Your Elite Profile</h1>
              <p className="text-blue-300 text-lg">Configure your champion metrics and goals</p>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        {!userProfile ? (
          <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
            <div className="p-4 bg-blue-600/20 rounded-2xl inline-block mb-4">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to Your Elite Fitness Journey
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Set up your profile to get personalized diet plans, exercise routines, and expert guidance 
              based on your unique goals and body metrics.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Personalized Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Goal Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span>Elite Coaching</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
            <div className="p-4 bg-green-600/20 rounded-2xl inline-block mb-4">
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-blue-400">{userProfile.name}</span>!
            </h2>
            <p className="text-lg text-gray-300">
              Your elite profile is configured. Update your metrics below to keep your plans optimized.
            </p>
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
          <UserProfileForm 
            onProfileSubmit={handleProfileSubmit} 
            currentProfile={userProfile}
          />
        </div>

        {/* Profile Summary (if profile exists) */}
        {userProfile && (
          <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              Your Elite Profile Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                <h4 className="text-blue-400 font-bold text-sm mb-2">BASIC INFO</h4>
                <p className="text-white font-semibold">{userProfile.name}</p>
                <p className="text-gray-300 text-sm">{userProfile.age} years old</p>
                <p className="text-gray-300 text-sm capitalize">{userProfile.gender}</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl border border-green-500/30">
                <h4 className="text-green-400 font-bold text-sm mb-2">BODY METRICS</h4>
                <p className="text-white font-semibold">{userProfile.height} cm</p>
                <p className="text-white font-semibold">{userProfile.weight} kg</p>
                <p className="text-gray-300 text-sm">Height / Weight</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/30">
                <h4 className="text-orange-400 font-bold text-sm mb-2">ACTIVITY LEVEL</h4>
                <p className="text-white font-semibold capitalize">{userProfile.activityLevel.replace('-', ' ')}</p>
                <p className="text-gray-300 text-sm">Training Intensity</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                <h4 className="text-purple-400 font-bold text-sm mb-2">FITNESS GOAL</h4>
                <p className="text-white font-semibold capitalize">
                  {userProfile.goal === 'lose' ? 'Lose Weight' : 
                   userProfile.goal === 'gain' ? 'Gain Weight' : 'Maintain Weight'}
                </p>
                <p className="text-gray-300 text-sm">Primary Target</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        {userProfile && (
          <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-green-400" />
              Your Elite Journey Continues
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                <div className="p-3 bg-blue-600/20 rounded-xl inline-block mb-4">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-bold mb-2">Next: Calorie Plan</h4>
                <p className="text-gray-300 text-sm mb-4">Get your personalized daily calorie targets</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                  Calculate Calories
                </button>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/20">
                <div className="p-3 bg-green-600/20 rounded-xl inline-block mb-4">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-white font-bold mb-2">Next: Diet Plan</h4>
                <p className="text-gray-300 text-sm mb-4">Discover your personalized meal strategy</p>
                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all">
                  View Diet Plan
                </button>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-xl border border-orange-500/20">
                <div className="p-3 bg-orange-600/20 rounded-xl inline-block mb-4">
                  <Target className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="text-white font-bold mb-2">Next: Workouts</h4>
                <p className="text-gray-300 text-sm mb-4">Access elite exercise routines</p>
                <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all">
                  Start Training
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourProfile;
