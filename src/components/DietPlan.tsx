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
      // Monday - Mediterranean Theme
      {
        breakfast: {
          name: "Greek Protein Parfait",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Greek yogurt layered with fresh berries, granola, chia seeds, and honey drizzle"
        },
        lunch: {
          name: "Mediterranean Quinoa Bowl",
          calories: lunch,
          protein: Math.round(lunch * 0.35 / 4),
          carbs: Math.round(lunch * 0.40 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Quinoa with grilled chicken, cucumber, tomatoes, olives, feta cheese, and tzatziki"
        },
        dinner: {
          name: "Herb-Crusted Salmon",
          calories: dinner,
          protein: Math.round(dinner * 0.30 / 4),
          carbs: Math.round(dinner * 0.45 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Baked salmon with herbs, roasted sweet potato, and Mediterranean vegetables"
        },
        snack: {
          name: "Hummus & Veggie Plate",
          calories: snack,
          protein: Math.round(snack * 0.40 / 4),
          carbs: Math.round(snack * 0.35 / 4),
          fat: Math.round(snack * 0.25 / 9),
          description: "Homemade hummus with carrot sticks, bell peppers, and whole grain pita"
        }
      },
      // Tuesday - Asian Fusion Theme
      {
        breakfast: {
          name: "Matcha Protein Bowl",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Matcha-infused overnight oats with protein powder, sliced banana, and almonds"
        },
        lunch: {
          name: "Teriyaki Tofu Buddha Bowl",
          calories: lunch,
          protein: Math.round(lunch * 0.30 / 4),
          carbs: Math.round(lunch * 0.45 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Teriyaki tofu with brown rice, edamame, shredded cabbage, and sesame seeds"
        },
        dinner: {
          name: "Miso-Glazed Cod",
          calories: dinner,
          protein: Math.round(dinner * 0.35 / 4),
          carbs: Math.round(dinner * 0.40 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Miso-glazed cod with jasmine rice, bok choy, and shiitake mushrooms"
        },
        snack: {
          name: "Green Tea Smoothie",
          calories: snack,
          protein: Math.round(snack * 0.50 / 4),
          carbs: Math.round(snack * 0.35 / 4),
          fat: Math.round(snack * 0.15 / 9),
          description: "Matcha powder, protein powder, spinach, pineapple, and coconut milk"
        }
      },
      // Wednesday - Mexican Theme
      {
        breakfast: {
          name: "Breakfast Burrito Bowl",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Scrambled eggs with black beans, avocado, salsa, and whole grain tortilla strips"
        },
        lunch: {
          name: "Chicken Fajita Salad",
          calories: lunch,
          protein: Math.round(lunch * 0.35 / 4),
          carbs: Math.round(lunch * 0.40 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Grilled chicken with peppers, onions, mixed greens, corn, and lime-cilantro dressing"
        },
        dinner: {
          name: "Fish Tacos with Quinoa",
          calories: dinner,
          protein: Math.round(dinner * 0.30 / 4),
          carbs: Math.round(dinner * 0.45 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Grilled white fish in corn tortillas with cabbage slaw and cilantro-lime quinoa"
        },
        snack: {
          name: "Guacamole & Chips",
          calories: snack,
          protein: Math.round(snack * 0.20 / 4),
          carbs: Math.round(snack * 0.45 / 4),
          fat: Math.round(snack * 0.35 / 9),
          description: "Fresh guacamole with baked sweet potato chips and lime"
        }
      },
      // Thursday - Italian Theme
      {
        breakfast: {
          name: "Ricotta Berry Toast",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Whole grain toast with ricotta cheese, fresh berries, and balsamic drizzle"
        },
        lunch: {
          name: "Caprese Chicken Salad",
          calories: lunch,
          protein: Math.round(lunch * 0.35 / 4),
          carbs: Math.round(lunch * 0.35 / 4),
          fat: Math.round(lunch * 0.30 / 9),
          description: "Grilled chicken with fresh mozzarella, tomatoes, basil, and balsamic reduction"
        },
        dinner: {
          name: "Zucchini Noodle Bolognese",
          calories: dinner,
          protein: Math.round(dinner * 0.35 / 4),
          carbs: Math.round(dinner * 0.35 / 4),
          fat: Math.round(dinner * 0.30 / 9),
          description: "Lean turkey bolognese over spiralized zucchini with parmesan cheese"
        },
        snack: {
          name: "Antipasto Plate",
          calories: snack,
          protein: Math.round(snack * 0.35 / 4),
          carbs: Math.round(snack * 0.30 / 4),
          fat: Math.round(snack * 0.35 / 9),
          description: "Prosciutto, fresh mozzarella, olives, and cherry tomatoes"
        }
      },
      // Friday - Indian Theme
      {
        breakfast: {
          name: "Spiced Quinoa Porridge",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Quinoa cooked with turmeric, cinnamon, topped with yogurt, nuts, and mango"
        },
        lunch: {
          name: "Tandoori Chicken Bowl",
          calories: lunch,
          protein: Math.round(lunch * 0.35 / 4),
          carbs: Math.round(lunch * 0.40 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Tandoori-spiced chicken with basmati rice, roasted vegetables, and mint chutney"
        },
        dinner: {
          name: "Lentil Dal with Naan",
          calories: dinner,
          protein: Math.round(dinner * 0.25 / 4),
          carbs: Math.round(dinner * 0.50 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Red lentil dal with whole wheat naan, cucumber raita, and steamed spinach"
        },
        snack: {
          name: "Masala Chai & Almonds",
          calories: snack,
          protein: Math.round(snack * 0.30 / 4),
          carbs: Math.round(snack * 0.35 / 4),
          fat: Math.round(snack * 0.35 / 9),
          description: "Homemade masala chai with roasted almonds and dates"
        }
      },
      // Saturday - American Comfort Theme
      {
        breakfast: {
          name: "Protein Pancakes",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Whole grain protein pancakes with Greek yogurt, berries, and sugar-free syrup"
        },
        lunch: {
          name: "Turkey Club Salad",
          calories: lunch,
          protein: Math.round(lunch * 0.35 / 4),
          carbs: Math.round(lunch * 0.35 / 4),
          fat: Math.round(lunch * 0.30 / 9),
          description: "Roasted turkey, bacon bits, tomatoes, lettuce, and avocado with ranch dressing"
        },
        dinner: {
          name: "Bison Burger Bowl",
          calories: dinner,
          protein: Math.round(dinner * 0.35 / 4),
          carbs: Math.round(dinner * 0.40 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Lean bison patty over sweet potato fries with roasted Brussels sprouts"
        },
        snack: {
          name: "Trail Mix",
          calories: snack,
          protein: Math.round(snack * 0.25 / 4),
          carbs: Math.round(snack * 0.40 / 4),
          fat: Math.round(snack * 0.35 / 9),
          description: "Mixed nuts, seeds, dried fruit, and dark chocolate chips"
        }
      },
      // Sunday - Middle Eastern Theme
      {
        breakfast: {
          name: "Shakshuka with Feta",
          calories: breakfast,
          protein: Math.round(breakfast * proteinRatio / 4),
          carbs: Math.round(breakfast * carbRatio / 4),
          fat: Math.round(breakfast * fatRatio / 9),
          description: "Poached eggs in spiced tomato sauce with feta cheese and whole grain pita"
        },
        lunch: {
          name: "Falafel Power Bowl",
          calories: lunch,
          protein: Math.round(lunch * 0.30 / 4),
          carbs: Math.round(lunch * 0.45 / 4),
          fat: Math.round(lunch * 0.25 / 9),
          description: "Baked falafel with tabbouleh, hummus, cucumber, and tahini dressing"
        },
        dinner: {
          name: "Moroccan Lamb Tagine",
          calories: dinner,
          protein: Math.round(dinner * 0.35 / 4),
          carbs: Math.round(dinner * 0.40 / 4),
          fat: Math.round(dinner * 0.25 / 9),
          description: "Slow-cooked lamb with apricots, almonds, and aromatic spices over couscous"
        },
        snack: {
          name: "Dates & Pistachios",
          calories: snack,
          protein: Math.round(snack * 0.20 / 4),
          carbs: Math.round(snack * 0.50 / 4),
          fat: Math.round(snack * 0.30 / 9),
          description: "Medjool dates stuffed with pistachios and a sprinkle of sea salt"
        }
      }
    ];

    return weeklyMealPlans;
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