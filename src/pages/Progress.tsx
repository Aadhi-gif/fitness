import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award, BarChart3, LineChart, Activity, Flame } from 'lucide-react';

const Progress: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const progressStats = [
    {
      title: 'Weight Progress',
      current: '185 lbs',
      change: '-12 lbs',
      target: '175 lbs',
      icon: TrendingUp,
      color: 'from-green-500 to-blue-500',
      percentage: 83
    },
    {
      title: 'Body Fat',
      current: '12%',
      change: '-5%',
      target: '10%',
      icon: Target,
      color: 'from-blue-500 to-purple-500',
      percentage: 80
    },
    {
      title: 'Muscle Mass',
      current: '165 lbs',
      change: '+8 lbs',
      target: '170 lbs',
      icon: Activity,
      color: 'from-orange-500 to-red-500',
      percentage: 94
    },
    {
      title: 'Strength Score',
      current: '1,250',
      change: '+180',
      target: '1,400',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      percentage: 89
    }
  ];

  const weeklyProgress = [
    { week: 'Week 1', weight: 197, bodyFat: 17, muscle: 157 },
    { week: 'Week 2', weight: 195, bodyFat: 16.5, muscle: 159 },
    { week: 'Week 3', weight: 192, bodyFat: 15.8, muscle: 161 },
    { week: 'Week 4', weight: 190, bodyFat: 15.2, muscle: 163 },
    { week: 'Week 5', weight: 188, bodyFat: 14.5, muscle: 164 },
    { week: 'Week 6', weight: 185, bodyFat: 12, muscle: 165 }
  ];

  const achievements = [
    {
      title: 'First 10K Run',
      date: '2024-01-15',
      description: 'Completed first 10K in under 50 minutes',
      icon: '🏃‍♂️',
      category: 'Cardio'
    },
    {
      title: 'Bench Press PR',
      date: '2024-01-10',
      description: 'New personal record: 225 lbs x 5 reps',
      icon: '🏋️‍♂️',
      category: 'Strength'
    },
    {
      title: '30-Day Streak',
      date: '2024-01-08',
      description: 'Maintained consistent training for 30 days',
      icon: '🔥',
      category: 'Consistency'
    },
    {
      title: 'Body Fat Goal',
      date: '2024-01-05',
      description: 'Reached target body fat percentage',
      icon: '🎯',
      category: 'Body Composition'
    }
  ];

  const workoutMetrics = [
    { metric: 'Total Workouts', value: '247', change: '+15 this month' },
    { metric: 'Training Hours', value: '186h', change: '+12h this month' },
    { metric: 'Calories Burned', value: '45,680', change: '+2,340 this month' },
    { metric: 'Average Intensity', value: '8.2/10', change: '+0.3 this month' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Progress Analytics</h1>
              <p className="text-green-300 text-lg">Track your elite transformation</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'body-composition', label: 'Body Composition', icon: Target },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'achievements', label: 'Achievements', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white border border-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Progress Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {progressStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-400 font-bold">{stat.percentage}%</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{stat.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-white">{stat.current}</span>
                    <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">Target: {stat.target}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Progress Chart */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">6-Week Progress Trend</h2>
              </div>
              <div className="space-y-4">
                {weeklyProgress.map((week, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-white font-semibold">{week.week}</span>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-gray-400">Weight</p>
                        <p className="text-white font-bold">{week.weight} lbs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Body Fat</p>
                        <p className="text-blue-400 font-bold">{week.bodyFat}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Muscle</p>
                        <p className="text-orange-400 font-bold">{week.muscle} lbs</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workout Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workoutMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <h3 className="text-white font-bold">{metric.metric}</h3>
                  </div>
                  <p className="text-3xl font-black text-white mb-2">{metric.value}</p>
                  <p className="text-green-400 text-sm font-semibold">{metric.change}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-full border border-yellow-500/30">
                        {achievement.category}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{achievement.description}</p>
                    <p className="text-gray-400 text-sm">{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
