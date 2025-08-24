import React, { useState } from 'react';
import { Dumbbell, Target, Clock, Flame, Play, CheckCircle } from 'lucide-react';
import ExerciseRoutines from '../components/ExerciseRoutines';

const Exercise: React.FC = () => {
  const [activeTab, setActiveTab] = useState('routines');

  const workoutStats = [
    {
      title: 'This Week',
      value: '5 workouts',
      icon: Target,
      color: 'from-red-500 to-orange-500',
      change: '+2 from last week'
    },
    {
      title: 'Total Time',
      value: '3h 45m',
      icon: Clock,
      color: 'from-orange-500 to-yellow-500',
      change: 'Average 45min/session'
    },
    {
      title: 'Calories Burned',
      value: '2,450',
      icon: Flame,
      color: 'from-yellow-500 to-red-500',
      change: '+15% this month'
    },
    {
      title: 'Completed',
      value: '247 sessions',
      icon: CheckCircle,
      color: 'from-green-500 to-blue-500',
      change: 'This year'
    }
  ];

  const todaysWorkout = {
    title: 'Upper Body Power',
    duration: '45 minutes',
    difficulty: 'Advanced',
    exercises: [
      { name: 'Bench Press', sets: '4 x 8-10', rest: '2-3 min', completed: true },
      { name: 'Pull-ups', sets: '4 x 6-8', rest: '2 min', completed: true },
      { name: 'Overhead Press', sets: '3 x 8-10', rest: '2 min', completed: false },
      { name: 'Barbell Rows', sets: '3 x 8-10', rest: '2 min', completed: false },
      { name: 'Dips', sets: '3 x 10-12', rest: '90 sec', completed: false },
      { name: 'Face Pulls', sets: '3 x 15', rest: '60 sec', completed: false }
    ]
  };

  const weeklySchedule = [
    { day: 'Monday', workout: 'Upper Body Power', status: 'completed', duration: '45 min' },
    { day: 'Tuesday', workout: 'Lower Body Strength', status: 'completed', duration: '50 min' },
    { day: 'Wednesday', workout: 'HIIT Cardio', status: 'completed', duration: '30 min' },
    { day: 'Thursday', workout: 'Upper Body Hypertrophy', status: 'completed', duration: '55 min' },
    { day: 'Friday', workout: 'Lower Body Power', status: 'completed', duration: '45 min' },
    { day: 'Saturday', workout: 'Core & Conditioning', status: 'scheduled', duration: '35 min' },
    { day: 'Sunday', workout: 'Active Recovery', status: 'scheduled', duration: '25 min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite Training</h1>
              <p className="text-red-300 text-lg">Forge your champion physique</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'routines', label: 'Routines', icon: Dumbbell },
            { id: 'today', label: "Today's Workout", icon: Play },
            { id: 'schedule', label: 'Weekly Schedule', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white border border-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Workout Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {workoutStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
              <p className="text-red-400 text-xs font-semibold">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'routines' && (
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
            <ExerciseRoutines />
          </div>
        )}

        {activeTab === 'today' && (
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{todaysWorkout.title}</h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {todaysWorkout.duration}
                  </span>
                  <span className="text-red-400 font-semibold">{todaysWorkout.difficulty}</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:from-red-700 hover:to-orange-700 transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                START WORKOUT
              </button>
            </div>
            
            <div className="space-y-4">
              {todaysWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    exercise.completed
                      ? 'bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30'
                      : 'bg-gradient-to-r from-red-600/10 to-orange-600/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      exercise.completed ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {exercise.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Dumbbell className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{exercise.name}</h3>
                      <p className="text-gray-400 text-sm">{exercise.sets}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">Rest: {exercise.rest}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Weekly Training Schedule</h2>
            <div className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    day.status === 'completed'
                      ? 'bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30'
                      : 'bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border-orange-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      day.status === 'completed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                    }`}>
                      {day.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{day.day}</h3>
                      <p className="text-gray-300">{day.workout}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{day.duration}</p>
                    <p className={`text-sm font-semibold ${
                      day.status === 'completed' ? 'text-green-400' : 'text-orange-400'
                    }`}>
                      {day.status === 'completed' ? 'Completed' : 'Scheduled'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;
