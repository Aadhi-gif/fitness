import React, { useState, useEffect } from 'react';
import { Dumbbell, Target, Crown, AlertCircle, Trophy, Flame } from 'lucide-react';
import ExerciseRoutines from '../components/ExerciseRoutines';

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

const ExerciseRoutinesPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load profile from sessionStorage on component mount
  useEffect(() => {
    const savedProfile = sessionStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const getWorkoutRecommendation = (profile: UserProfile) => {
    if (profile.goal === 'lose') {
      return {
        focus: 'Fat Loss & Conditioning',
        description: 'High-intensity circuits with compound movements',
        frequency: '4-5 times per week',
        style: 'HIIT + Strength Training'
      };
    } else if (profile.goal === 'gain') {
      return {
        focus: 'Muscle Building & Strength',
        description: 'Progressive overload with heavy compound lifts',
        frequency: '4-6 times per week',
        style: 'Hypertrophy + Powerlifting'
      };
    } else {
      return {
        focus: 'Performance & Maintenance',
        description: 'Balanced training for overall fitness',
        frequency: '3-4 times per week',
        style: 'Functional Fitness'
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                <Crown className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite Exercise Routines</h1>
              <p className="text-red-300 text-lg">Champion-level training programs for peak performance</p>
            </div>
          </div>
        </div>

        {/* Profile Required Message */}
        {!userProfile ? (
          <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30">
            <div className="p-4 bg-red-600/20 rounded-2xl inline-block mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Profile Required for Elite Training
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              To access personalized exercise routines, we need your fitness goals and activity level. 
              Complete your profile to unlock elite training programs designed for your specific objectives.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <span>Goal-Based Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Intensity Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Progressive Training</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-lg">
              Set Up Your Profile First
            </button>
          </div>
        ) : (
          <>
            {/* Welcome Message with Profile */}
            <div className="text-center mb-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30">
              <div className="p-4 bg-green-600/20 rounded-2xl inline-block mb-4">
                <Trophy className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Elite Training for <span className="text-red-400">{userProfile.name}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                Personalized exercise routines designed for your elite transformation
              </p>
              
              {/* Training Recommendation */}
              {(() => {
                const recommendation = getWorkoutRecommendation(userProfile);
                return (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                      <h4 className="text-red-400 font-bold text-sm mb-1">FOCUS</h4>
                      <p className="text-white font-semibold text-sm">{recommendation.focus}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl border border-orange-500/30">
                      <h4 className="text-orange-400 font-bold text-sm mb-1">STYLE</h4>
                      <p className="text-white font-semibold text-sm">{recommendation.style}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-green-600/20 rounded-xl border border-yellow-500/30">
                      <h4 className="text-yellow-400 font-bold text-sm mb-1">FREQUENCY</h4>
                      <p className="text-white font-semibold text-sm">{recommendation.frequency}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl border border-green-500/30">
                      <h4 className="text-green-400 font-bold text-sm mb-1">GOAL</h4>
                      <p className="text-white font-semibold text-sm capitalize">
                        {userProfile.goal === 'lose' ? 'Weight Loss' : 
                         userProfile.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Exercise Routines Component */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30">
              <ExerciseRoutines />
            </div>

            {/* Training Principles */}
            <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-red-400" />
                Elite Training Principles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                  <h4 className="text-red-400 font-bold text-lg mb-3">Progressive Overload</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Gradually increase weight, reps, or intensity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Track all workouts for consistent progress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Challenge your body every session</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl border border-orange-500/30">
                  <h4 className="text-orange-400 font-bold text-lg mb-3">Perfect Form</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Quality over quantity in every rep</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Control the weight through full range of motion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>Focus on mind-muscle connection</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-yellow-600/20 to-green-600/20 rounded-xl border border-yellow-500/30">
                  <h4 className="text-yellow-400 font-bold text-lg mb-3">Recovery Focus</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Allow 48-72 hours between training same muscles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Prioritize sleep and nutrition for growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Listen to your body and adjust intensity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Complete Journey */}
            <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-green-400" />
                Your Elite Transformation is Complete
              </h3>
              
              <div className="text-center">
                <div className="p-6 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/20">
                  <div className="p-3 bg-green-600/20 rounded-xl inline-block mb-4">
                    <Trophy className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-white font-bold mb-2">You Now Have Everything You Need</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Your complete elite fitness system: Profile ✓ Calorie Plan ✓ Diet Plan ✓ Exercise Routines ✓
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                      Track Progress
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all">
                      AI Coach Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseRoutinesPage;
