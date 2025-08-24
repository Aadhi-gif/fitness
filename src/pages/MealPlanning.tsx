import React, { useState } from 'react';
import { ChefHat, Plus, Clock, Users, Flame, ShoppingCart, BookOpen, Star } from 'lucide-react';

const MealPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('meal-plans');
  const [selectedDay, setSelectedDay] = useState('monday');

  const mealPlans = [
    {
      id: 1,
      name: 'Elite Muscle Building',
      description: 'High-protein meal plan for serious muscle growth',
      calories: 3200,
      protein: 180,
      carbs: 320,
      fat: 120,
      meals: 6,
      difficulty: 'Intermediate',
      duration: '7 days',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Lean Cutting Protocol',
      description: 'Precision nutrition for elite fat loss',
      calories: 2200,
      protein: 165,
      carbs: 180,
      fat: 80,
      meals: 5,
      difficulty: 'Advanced',
      duration: '14 days',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Performance Maintenance',
      description: 'Balanced nutrition for peak performance',
      calories: 2800,
      protein: 140,
      carbs: 280,
      fat: 100,
      meals: 5,
      difficulty: 'Beginner',
      duration: '7 days',
      rating: 4.7
    }
  ];

  const recipes = [
    {
      id: 1,
      name: 'Champion Protein Pancakes',
      category: 'Breakfast',
      prepTime: 15,
      servings: 2,
      calories: 420,
      protein: 35,
      difficulty: 'Easy',
      rating: 4.9,
      ingredients: [
        '1 cup oats',
        '2 scoops protein powder',
        '2 eggs',
        '1 banana',
        '1/2 cup milk'
      ],
      instructions: [
        'Blend all ingredients until smooth',
        'Heat pan over medium heat',
        'Pour batter and cook 2-3 minutes per side',
        'Serve with berries and syrup'
      ]
    },
    {
      id: 2,
      name: 'Elite Chicken Bowl',
      category: 'Lunch',
      prepTime: 25,
      servings: 1,
      calories: 650,
      protein: 55,
      difficulty: 'Medium',
      rating: 4.8,
      ingredients: [
        '8oz chicken breast',
        '1 cup brown rice',
        '1/2 avocado',
        'Mixed vegetables',
        'Olive oil'
      ],
      instructions: [
        'Season and grill chicken breast',
        'Cook brown rice according to package',
        'Steam mixed vegetables',
        'Assemble bowl with all ingredients'
      ]
    },
    {
      id: 3,
      name: 'Power Salmon Dinner',
      category: 'Dinner',
      prepTime: 30,
      servings: 2,
      calories: 580,
      protein: 45,
      difficulty: 'Medium',
      rating: 4.7,
      ingredients: [
        '2 salmon fillets',
        '2 cups quinoa',
        'Asparagus',
        'Lemon',
        'Herbs'
      ],
      instructions: [
        'Season salmon with herbs and lemon',
        'Bake at 400°F for 15 minutes',
        'Cook quinoa and steam asparagus',
        'Serve together with lemon wedge'
      ]
    }
  ];

  const weeklyMeals = {
    monday: [
      { meal: 'Breakfast', recipe: 'Champion Protein Pancakes', calories: 420 },
      { meal: 'Snack', recipe: 'Greek Yogurt Bowl', calories: 180 },
      { meal: 'Lunch', recipe: 'Elite Chicken Bowl', calories: 650 },
      { meal: 'Pre-Workout', recipe: 'Banana Protein Shake', calories: 280 },
      { meal: 'Dinner', recipe: 'Power Salmon Dinner', calories: 580 }
    ],
    tuesday: [
      { meal: 'Breakfast', recipe: 'Overnight Oats', calories: 380 },
      { meal: 'Snack', recipe: 'Protein Smoothie', calories: 220 },
      { meal: 'Lunch', recipe: 'Turkey Wrap', calories: 520 },
      { meal: 'Pre-Workout', recipe: 'Energy Balls', calories: 200 },
      { meal: 'Dinner', recipe: 'Lean Beef Stir-fry', calories: 620 }
    ]
  };

  const shoppingList = [
    { category: 'Proteins', items: ['Chicken breast (2 lbs)', 'Salmon fillets (4 pieces)', 'Greek yogurt (32oz)', 'Protein powder'] },
    { category: 'Carbs', items: ['Brown rice (2 lbs)', 'Quinoa (1 lb)', 'Oats (1 container)', 'Sweet potatoes (3 lbs)'] },
    { category: 'Vegetables', items: ['Spinach (1 bag)', 'Broccoli (2 heads)', 'Asparagus (1 bunch)', 'Mixed berries'] },
    { category: 'Fats', items: ['Avocados (4 pieces)', 'Olive oil', 'Almonds (1 bag)', 'Chia seeds'] }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite Meal Planning</h1>
              <p className="text-green-300 text-lg">Precision nutrition for champions</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: 'meal-plans', label: 'Meal Plans', icon: ChefHat },
            { id: 'recipes', label: 'Recipe Library', icon: BookOpen },
            { id: 'weekly-planner', label: 'Weekly Planner', icon: Clock },
            { id: 'shopping-list', label: 'Shopping List', icon: ShoppingCart }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white border border-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Meal Plans Tab */}
        {activeTab === 'meal-plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm font-semibold">{plan.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                    <p className="text-2xl font-bold text-white">{plan.calories}</p>
                    <p className="text-green-400 text-xs font-semibold">CALORIES</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
                    <p className="text-2xl font-bold text-white">{plan.protein}g</p>
                    <p className="text-blue-400 text-xs font-semibold">PROTEIN</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {plan.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {plan.meals} meals/day
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(plan.difficulty)}`}>
                    {plan.difficulty.toUpperCase()}
                  </span>
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all">
                    Start Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{recipe.name}</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-500/30">
                    {recipe.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span>{recipe.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Ingredients:</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        {ingredient}
                      </li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <li className="text-green-400 text-xs">+{recipe.ingredients.length - 3} more ingredients...</li>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm font-semibold">{recipe.rating}</span>
                  </div>
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all">
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Weekly Planner Tab */}
        {activeTab === 'weekly-planner' && (
          <div className="space-y-6">
            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap capitalize ${
                    selectedDay === day
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-black/40 text-gray-400 hover:text-white border border-gray-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Daily Meals */}
            <div className="space-y-4">
              {(weeklyMeals[selectedDay as keyof typeof weeklyMeals] || []).map((meal, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <ChefHat className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{meal.meal}</h3>
                        <p className="text-gray-300">{meal.recipe}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{meal.calories} cal</p>
                      <button className="text-green-400 text-sm hover:text-green-300 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shopping List Tab */}
        {activeTab === 'shopping-list' && (
          <div className="space-y-6">
            {shoppingList.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-xl border border-green-500/20"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanning;
