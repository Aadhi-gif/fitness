import React, { useState } from 'react';
import { Target, Plus, Calendar, Trophy, CheckCircle, Clock, Flame, Zap } from 'lucide-react';

const Goals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const currentGoals = [
    {
      id: 1,
      title: 'Reach 10% Body Fat',
      category: 'Body Composition',
      current: 12,
      target: 10,
      unit: '%',
      deadline: '2024-03-01',
      progress: 80,
      icon: Target,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      title: 'Bench Press 250 lbs',
      category: 'Strength',
      current: 225,
      target: 250,
      unit: 'lbs',
      deadline: '2024-02-15',
      progress: 90,
      icon: Trophy,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      title: 'Run 5K in 20 minutes',
      category: 'Cardio',
      current: 22.5,
      target: 20,
      unit: 'min',
      deadline: '2024-04-01',
      progress: 60,
      icon: Zap,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Gain 5 lbs Muscle',
      category: 'Muscle Building',
      current: 3,
      target: 5,
      unit: 'lbs',
      deadline: '2024-05-01',
      progress: 60,
      icon: Flame,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const completedGoals = [
    {
      title: 'Lose 15 lbs',
      category: 'Weight Loss',
      completedDate: '2024-01-15',
      duration: '3 months',
      icon: '🎯'
    },
    {
      title: 'Deadlift 300 lbs',
      category: 'Strength',
      completedDate: '2024-01-08',
      duration: '2 months',
      icon: '🏋️‍♂️'
    },
    {
      title: '30-Day Consistency',
      category: 'Habit',
      completedDate: '2024-01-01',
      duration: '30 days',
      icon: '🔥'
    }
  ];

  const goalCategories = [
    'Weight Loss', 'Muscle Building', 'Strength', 'Cardio', 'Flexibility', 'Nutrition', 'Habit'
  ];

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white">Elite Goals</h1>
                <p className="text-purple-300 text-lg">Set and conquer your targets</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddGoal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              New Goal
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'current', label: 'Current Goals', icon: Target },
            { id: 'completed', label: 'Completed', icon: CheckCircle },
            { id: 'analytics', label: 'Analytics', icon: Trophy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white border border-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Current Goals Tab */}
        {activeTab === 'current' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${goal.color}`}>
                    <goal.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                    {goal.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{goal.title}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-white">{goal.current}</span>
                    <span className="text-gray-400"> / {goal.target} {goal.unit}</span>
                  </div>
                  <span className="text-purple-400 font-bold">{goal.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${goal.color}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {goal.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 font-semibold">
                      {getDaysRemaining(goal.deadline)} days left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Goals Tab */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            {completedGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{goal.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-500/30">
                        {goal.category}
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Completed: {goal.completedDate}</span>
                      <span>Duration: {goal.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-purple-400" />
                <h3 className="text-white font-bold">Total Goals</h3>
              </div>
              <p className="text-3xl font-black text-white mb-2">7</p>
              <p className="text-purple-400 text-sm">4 active, 3 completed</p>
            </div>
            
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-white font-bold">Success Rate</h3>
              </div>
              <p className="text-3xl font-black text-white mb-2">86%</p>
              <p className="text-green-400 text-sm">Above average</p>
            </div>
            
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-orange-400" />
                <h3 className="text-white font-bold">Avg. Duration</h3>
              </div>
              <p className="text-3xl font-black text-white mb-2">2.3</p>
              <p className="text-orange-400 text-sm">months per goal</p>
            </div>
            
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-blue-400" />
                <h3 className="text-white font-bold">This Month</h3>
              </div>
              <p className="text-3xl font-black text-white mb-2">2</p>
              <p className="text-blue-400 text-sm">goals completed</p>
            </div>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Create New Goal</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-purple-300 mb-2">Goal Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
                    placeholder="Enter your goal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-purple-300 mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-400">
                    {goalCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-purple-300 mb-2">Target Value</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
                      placeholder="Target"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-purple-300 mb-2">Unit</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
                      placeholder="lbs, %, min"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-purple-300 mb-2">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-bold"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
