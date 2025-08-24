import React, { useState } from 'react';
import { Apple, Target, Flame, Droplets, Clock, ChefHat } from 'lucide-react';
import CalorieCalculator from '../components/CalorieCalculator';
import DietPlan from '../components/DietPlan';

const Nutrition: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const nutritionStats = [
    {
      title: 'Daily Calories',
      current: '1,850',
      target: '2,400',
      icon: Flame,
      color: 'from-red-500 to-orange-500',
      percentage: 77
    },
    {
      title: 'Protein',
      current: '120g',
      target: '150g',
      icon: Target,
      color: 'from-orange-500 to-yellow-500',
      percentage: 80
    },
    {
      title: 'Water Intake',
      current: '2.1L',
      target: '3.0L',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      percentage: 70
    },
    {
      title: 'Meals Today',
      current: '3',
      target: '5',
      icon: ChefHat,
      color: 'from-green-500 to-blue-500',
      percentage: 60
    }
  ];

  const todaysMeals = [
    {
      time: '7:00 AM',
      meal: 'Breakfast',
      food: 'Protein Oatmeal with Berries',
      calories: 420,
      protein: '25g',
      status: 'completed'
    },
    {
      time: '10:00 AM',
      meal: 'Snack',
      food: 'Greek Yogurt with Almonds',
      calories: 180,
      protein: '15g',
      status: 'completed'
    },
    {
      time: '1:00 PM',
      meal: 'Lunch',
      food: 'Grilled Chicken Salad',
      calories: 520,
      protein: '45g',
      status: 'completed'
    },
    {
      time: '4:00 PM',
      meal: 'Pre-Workout',
      food: 'Banana with Peanut Butter',
      calories: 280,
      protein: '8g',
      status: 'pending'
    },
    {
      time: '7:00 PM',
      meal: 'Dinner',
      food: 'Salmon with Sweet Potato',
      calories: 650,
      protein: '40g',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite Nutrition</h1>
              <p className="text-green-300 text-lg">Fuel your champion performance</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'calculator', label: 'Calculator', icon: Flame },
            { id: 'meal-plan', label: 'Meal Plan', icon: ChefHat }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
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
            {/* Nutrition Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {nutritionStats.map((stat, index) => (
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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">{stat.current}</span>
                    <span className="text-gray-400">/ {stat.target}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Meals */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Today's Meal Schedule</h2>
              </div>
              <div className="space-y-4">
                {todaysMeals.map((meal, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      meal.status === 'completed'
                        ? 'bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30'
                        : 'bg-gradient-to-r from-orange-600/10 to-yellow-600/10 border-orange-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        meal.status === 'completed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                      }`}>
                        <ChefHat className={`w-5 h-5 ${
                          meal.status === 'completed' ? 'text-green-400' : 'text-orange-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-white font-semibold">{meal.meal}</h3>
                          <span className="text-gray-400 text-sm">{meal.time}</span>
                        </div>
                        <p className="text-gray-300">{meal.food}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{meal.calories} cal</p>
                      <p className="text-green-400 text-sm">{meal.protein} protein</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
            <CalorieCalculator profile={null} />
          </div>
        )}

        {/* Meal Plan Tab */}
        {activeTab === 'meal-plan' && (
          <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
            <DietPlan targetCalories={2400} goal="maintain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nutrition;
