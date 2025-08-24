import React from 'react';
import { User, Target, Activity, Calendar, Trophy, Medal } from 'lucide-react';
import UserProfileForm from '../components/UserProfileForm';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite Profile</h1>
              <p className="text-orange-300 text-lg">Configure your champion settings</p>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Elite Status</h3>
            </div>
            <p className="text-yellow-300 font-semibold">Champion Level</p>
            <p className="text-gray-400 text-sm">Top 1% performer</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Medal className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-bold text-white">Training Streak</h3>
            </div>
            <p className="text-orange-300 font-semibold">12 Days</p>
            <p className="text-gray-400 text-sm">Personal record</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-bold text-white">Total Workouts</h3>
            </div>
            <p className="text-red-300 font-semibold">247</p>
            <p className="text-gray-400 text-sm">This year</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Body Metrics & Goals</h2>
          </div>
          <UserProfileForm onProfileSubmit={() => {}} currentProfile={null} />
        </div>

        {/* Training History */}
        <div className="mt-8 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Training History</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { date: '2024-01-15', workout: 'Upper Body Strength', duration: '45 min', intensity: 'High' },
              { date: '2024-01-14', workout: 'HIIT Cardio', duration: '30 min', intensity: 'Very High' },
              { date: '2024-01-13', workout: 'Lower Body Power', duration: '50 min', intensity: 'High' },
              { date: '2024-01-12', workout: 'Core & Flexibility', duration: '25 min', intensity: 'Medium' }
            ].map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-xl border border-orange-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{session.workout}</h3>
                    <p className="text-gray-400 text-sm">{session.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{session.duration}</p>
                  <p className={`text-sm font-semibold ${
                    session.intensity === 'Very High' ? 'text-red-400' :
                    session.intensity === 'High' ? 'text-orange-400' :
                    session.intensity === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {session.intensity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
