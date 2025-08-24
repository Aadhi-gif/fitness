import React from 'react';
import { Trophy, Target, Flame, Zap, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Workouts This Week',
      value: '5',
      icon: Trophy,
      color: 'from-orange-500 to-red-500',
      change: '+2 from last week'
    },
    {
      title: 'Calories Burned',
      value: '2,450',
      icon: Flame,
      color: 'from-red-500 to-pink-500',
      change: '+15% this month'
    },
    {
      title: 'Current Streak',
      value: '12 days',
      icon: Target,
      color: 'from-yellow-500 to-orange-500',
      change: 'Personal best!'
    },
    {
      title: 'Energy Level',
      value: '95%',
      icon: Zap,
      color: 'from-green-500 to-blue-500',
      change: 'Feeling strong'
    }
  ];

  const recentActivities = [
    { date: 'Today', activity: 'Upper Body Strength', duration: '45 min', calories: 320 },
    { date: 'Yesterday', activity: 'HIIT Cardio', duration: '30 min', calories: 280 },
    { date: '2 days ago', activity: 'Lower Body Power', duration: '50 min', calories: 380 },
    { date: '3 days ago', activity: 'Core & Flexibility', duration: '25 min', calories: 150 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Welcome back, <span className="text-orange-400">{user?.name || 'Champion'}</span>!
          </h1>
          <p className="text-gray-300 text-lg">Ready to dominate today's training session?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
              <p className="text-green-400 text-xs font-semibold">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Recent Training Sessions</h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-xl border border-orange-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Trophy className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{activity.activity}</h3>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{activity.duration}</p>
                  <p className="text-orange-400 text-sm">{activity.calories} cal</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-white mb-3">Today's Workout</h3>
            <p className="text-gray-300 mb-4">Chest & Triceps Power Session</p>
            <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:from-red-700 hover:to-orange-700 transition-all">
              START TRAINING
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
            <h3 className="text-xl font-bold text-white mb-3">Nutrition Plan</h3>
            <p className="text-gray-300 mb-4">2,800 calories remaining today</p>
            <button className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 rounded-xl font-bold hover:from-orange-700 hover:to-yellow-700 transition-all">
              VIEW MEALS
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
            <h3 className="text-xl font-bold text-white mb-3">AI Coach</h3>
            <p className="text-gray-300 mb-4">Get personalized guidance</p>
            <button className="w-full bg-gradient-to-r from-yellow-600 to-green-600 text-white py-3 rounded-xl font-bold hover:from-yellow-700 hover:to-green-700 transition-all">
              ASK COACH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
