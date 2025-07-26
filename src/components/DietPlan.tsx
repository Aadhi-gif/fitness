import React, { useState, useMemo } from 'react';
import { Utensils, Coffee, Sun, Moon, Apple } from 'lucide-react';

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

interface DietPlanProps {
  targetCalories: number;
  goal: 'lose' | 'maintain' | 'gain';
}

const DietPlan: React.FC<DietPlanProps> = ({ targetCalories, goal }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const mealPlans = useMemo(() => {
    const baseCalories = Math.round(targetCalories);
    // Adjust macros based on goal
    const proteinRatio = goal === 'gain' ? 0.30 : goal === 'lose' ? 0.35 : 0.25;
    const carbRatio = goal === 'gain' ? 0.45 : goal === 'lose' ? 0.35 : 0.45;
    const fatRatio = 1 - proteinRatio - carbRatio;

    const breakfast = Math.round(baseCalories * 0.25);
    const lunch = Math.round(baseCalories * 0.35);
    const dinner = Math.round(baseCalories * 0.30);
    const snack = Math.round(baseCalories * 0.10);

    const weeklyMealPlans = [
      // Monday
      {
        breakfast: {
          name: "Protein Oatmeal Bowl",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Steel-cut oats with protein powder, berries, and almonds"
        },
        lunch: {
          name: "Grilled Chicken Salad",
          calories: lunch,
          protein: Math.round(lunch * 0.35 / 4),
          carbs: Math.round(lunch * 0.40 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Mixed greens, grilled chicken breast, quinoa, and olive oil dressing"
        },
        dinner: {
          name: "Salmon with Sweet Potato",
          calories: dinner,
          protein: Math.round(dinner * 0.30 / 4),
          carbs: Math.round(dinner * 0.45 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Baked salmon fillet with roasted sweet potato and steamed broccoli"
        },
        snack: {
          name: "Greek Yogurt with Nuts",
          calories: snack,
          protein: Math.round(snack * 0.40 / 4),
          carbs: Math.round(snack * 0.35 / 4),
          fat: Math.round(snack * 0.25 / 9),
          description: "Plain Greek yogurt with mixed nuts and a drizzle of honey"
        }
      },
      // Tuesday
      {
        breakfast: {
          name: "Avocado Toast with Eggs",
          calories: breakfast,
          protein: Math.round(breakfast * 0.25 / 4),
          carbs: Math.round(breakfast * 0.45 / 4),
          fat: Math.round(breakfast * 0.30 / 9),
          description: "Whole grain toast with mashed avocado and poached eggs"
        },
        lunch: {
          name: "Turkey and Hummus Wrap",
          calories: lunch,
          protein: Math.round(lunch * 0.30 / 4),
          carbs: Math.round(lunch * 0.45 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Whole wheat tortilla with lean turkey, hummus, and vegetables"
        },
        dinner: {
          name: "Lean Beef Stir-fry",
          calories: dinner,
          protein: Math.round(dinner * 0.35 / 4),
          carbs: Math.round(dinner * 0.40 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Lean beef strips with mixed vegetables over brown rice"
        },
        snack: {
          name: "Protein Smoothie",
          calories: snack,
          protein: Math.round(snack * 0.50 / 4),
          carbs: Math.round(snack * 0.35 / 4),
          fat: Math.round(snack * 0.15 / 9),
          description: "Protein powder blended with banana and almond milk"
        }
      },
      // Add more days with similar structure...
    ];

    // For demo purposes, we'll repeat the first two days
    return [
      ...weeklyMealPlans,
      weeklyMealPlans[0], weeklyMealPlans[1], weeklyMealPlans[0], weeklyMealPlans[1], weeklyMealPlans[0]
    ];
  }, [targetCalories, goal]);

  const currentPlan = mealPlans[selectedDay];

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee className="w-5 h-5" />;
      case 'lunch':
        return <Sun className="w-5 h-5" />;
      case 'dinner':
        return <Moon className="w-5 h-5" />;
      case 'snack':
        return <Apple className="w-5 h-5" />;
      default:
        return <Utensils className="w-5 h-5" />;
    }
  };

  const renderMeal = (meal: Meal, mealType: string, bgColor: string, textColor: string) => (
    <div className={`${bgColor} rounded-xl p-6`}>
      <div className={`flex items-center gap-3 mb-4`}>
        <div className={`p-2 bg-white rounded-lg ${textColor}`}>
          {getMealIcon(mealType)}
        </div>
        <div>
          <h4 className={`font-semibold ${textColor} capitalize`}>{mealType}</h4>
          <p className={`text-sm ${textColor} opacity-80`}>{meal.calories} calories</p>
        </div>
      </div>
      
      <h5 className={`font-bold ${textColor} mb-2`}>{meal.name}</h5>
      <p className={`text-sm ${textColor} opacity-90 mb-4`}>{meal.description}</p>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className={`text-lg font-bold ${textColor}`}>{meal.protein}g</div>
          <div className={`text-xs ${textColor} opacity-70`}>Protein</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${textColor}`}>{meal.carbs}g</div>
          <div className={`text-xs ${textColor} opacity-70`}>Carbs</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${textColor}`}>{meal.fat}g</div>
          <div className={`text-xs ${textColor} opacity-70`}>Fat</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-xl">
          <Utensils className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Diet Plan</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {days.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDay === index
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {renderMeal(currentPlan.breakfast, 'breakfast', 'bg-gradient-to-br from-yellow-50 to-orange-50', 'text-orange-700')}
        {renderMeal(currentPlan.lunch, 'lunch', 'bg-gradient-to-br from-green-50 to-emerald-50', 'text-green-700')}
        {renderMeal(currentPlan.dinner, 'dinner', 'bg-gradient-to-br from-purple-50 to-indigo-50', 'text-purple-700')}
        {renderMeal(currentPlan.snack, 'snack', 'bg-gradient-to-br from-pink-50 to-rose-50', 'text-pink-700')}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Daily Totals</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{targetCalories}</div>
            <div className="text-sm text-gray-600">Calories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {currentPlan.breakfast.protein + currentPlan.lunch.protein + currentPlan.dinner.protein + currentPlan.snack.protein}g
            </div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {currentPlan.breakfast.carbs + currentPlan.lunch.carbs + currentPlan.dinner.carbs + currentPlan.snack.carbs}g
            </div>
            <div className="text-sm text-gray-600">Carbs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {currentPlan.breakfast.fat + currentPlan.lunch.fat + currentPlan.dinner.fat + currentPlan.snack.fat}g
            </div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;