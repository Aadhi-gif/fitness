import React from 'react';
import { Calculator, Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

interface CalorieCalculatorProps {
  profile: UserProfile;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ profile }) => {
  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    if (profile.gender === 'male') {
      return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
      return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }
  };

  const getActivityMultiplier = () => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9
    };
    return multipliers[profile.activityLevel];
  };

  const calculateTDEE = () => {
    return calculateBMR() * getActivityMultiplier();
  };

  const getTargetCalories = () => {
    const tdee = calculateTDEE();
    switch (profile.goal) {
      case 'lose':
        return tdee - 500; // 1 lb per week
      case 'gain':
        return tdee + 500; // 1 lb per week
      default:
        return tdee;
    }
  };

  const calculateBMI = () => {
    return profile.weight / ((profile.height / 100) ** 2);
  };

  const getBMICategory = () => {
    const bmi = calculateBMI();
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmr = calculateBMR();
  const tdee = calculateTDEE();
  const targetCalories = getTargetCalories();
  const bmi = calculateBMI();
  const bmiInfo = getBMICategory();

  const getGoalIcon = () => {
    switch (profile.goal) {
      case 'lose':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      case 'gain':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      default:
        return <Minus className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-xl">
          <Calculator className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Calorie Plan</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="text-sm font-medium text-blue-600 mb-2">BMR (Base Metabolic Rate)</div>
          <div className="text-2xl font-bold text-blue-700">{Math.round(bmr)}</div>
          <div className="text-sm text-blue-500">calories/day</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <div className="text-sm font-medium text-green-600 mb-2">TDEE (Total Daily Energy)</div>
          <div className="text-2xl font-bold text-green-700">{Math.round(tdee)}</div>
          <div className="text-sm text-green-500">calories/day</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-600" />
            <div className="text-sm font-medium text-purple-600">Target Calories</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-700">{Math.round(targetCalories)}</div>
            {getGoalIcon()}
          </div>
          <div className="text-sm text-purple-500">for {profile.goal} weight</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
          <div className="text-sm font-medium text-orange-600 mb-2">BMI</div>
          <div className="text-2xl font-bold text-orange-700">{bmi.toFixed(1)}</div>
          <div className={`text-sm font-medium ${bmiInfo.color}`}>{bmiInfo.category}</div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Macronutrient Breakdown (40/30/30)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{Math.round(targetCalories * 0.4 / 4)}g</div>
            <div className="text-sm text-gray-600">Carbohydrates (40%)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{Math.round(targetCalories * 0.3 / 4)}g</div>
            <div className="text-sm text-gray-600">Protein (30%)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{Math.round(targetCalories * 0.3 / 9)}g</div>
            <div className="text-sm text-gray-600">Fat (30%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;