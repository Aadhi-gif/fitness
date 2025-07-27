import React, { useState, useMemo, useEffect } from 'react';
import { Utensils, Coffee, Sun, Moon, Apple, Settings, DollarSign, Clock } from 'lucide-react';
import FoodPreferencesModal from './FoodPreferencesModal';
import BackendStatus from './BackendStatus';
import useBackendPreferences from '../hooks/useBackendPreferences';

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  cost?: string;
  cookingTime?: string;
  difficulty?: string;
}

interface FoodPreferences {
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  budgetRange: string;
  cookingTime: string;
  spiceLevel: string;
  mealComplexity: string;
  allergies: string[];
  dislikedFoods: string[];
  preferredProteins: string[];
  location: string;
  country: string;
  region: string;
  localTastes: string[];
  traditionalFoods: boolean;
}

interface DietPlanProps {
  targetCalories: number;
  goal: 'lose' | 'maintain' | 'gain';
}

const DietPlan: React.FC<DietPlanProps> = ({ targetCalories, goal }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // Use backend preferences hook
  const {
    preferences: foodPreferences,
    isLoading: preferencesLoading,
    error: preferencesError,
    savePreferences,
    isBackendConnected
  } = useBackendPreferences();

  const hasSetPreferences = foodPreferences.country !== '' || foodPreferences.dietaryRestrictions.length > 0;

  // Show preferences modal on first visit
  useEffect(() => {
    if (!preferencesLoading && !hasSetPreferences) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPreferencesModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [preferencesLoading, hasSetPreferences]);

  const handleSavePreferences = async (preferences: FoodPreferences) => {
    await savePreferences(preferences);
  };

  const getBudgetIcon = (budgetRange: string) => {
    switch (budgetRange) {
      case 'budget': return '💰';
      case 'moderate': return '💵';
      case 'premium': return '💎';
      case 'luxury': return '👑';
      default: return '💵';
    }
  };

  const getCostEstimate = (budgetRange: string) => {
    switch (budgetRange) {
      case 'budget': return '$5-10';
      case 'moderate': return '$10-20';
      case 'premium': return '$20-35';
      case 'luxury': return '$35+';
      default: return '$10-20';
    }
  };

  const getCountrySpecificMeals = (country: string, region: string, localTastes: string[], traditionalFoods: boolean) => {
    const countryMeals: { [key: string]: any } = {
      india: {
        breakfast: [
          { name: "Masala Dosa", description: "Crispy rice crepe with spiced potato filling, served with coconut chutney and sambar" },
          { name: "Poha", description: "Flattened rice with onions, mustard seeds, curry leaves, and fresh coriander" },
          { name: "Upma", description: "Semolina porridge with vegetables, mustard seeds, and curry leaves" },
          { name: "Paratha with Curd", description: "Whole wheat flatbread stuffed with vegetables, served with yogurt and pickle" },
          { name: "Idli Sambar", description: "Steamed rice cakes with lentil curry and coconut chutney" }
        ],
        lunch: [
          { name: "Dal Rice Thali", description: "Complete meal with lentil curry, basmati rice, vegetables, roti, and pickle" },
          { name: "Biryani", description: "Fragrant basmati rice with spiced meat/vegetables, raita, and boiled egg" },
          { name: "Chole Bhature", description: "Spiced chickpea curry with deep-fried bread and onion salad" },
          { name: "Rajma Chawal", description: "Kidney bean curry with steamed rice and fresh salad" },
          { name: "Sambar Rice", description: "South Indian lentil curry with rice, vegetables, and papadum" }
        ],
        dinner: [
          { name: "Paneer Butter Masala", description: "Creamy tomato-based cottage cheese curry with naan and rice" },
          { name: "Chicken Curry", description: "Traditional spiced chicken curry with roti, rice, and vegetables" },
          { name: "Fish Curry", description: "Coconut-based fish curry with rice and steamed vegetables" },
          { name: "Vegetable Korma", description: "Mixed vegetables in rich cashew-coconut gravy with pulao rice" },
          { name: "Mutton Curry", description: "Slow-cooked spiced mutton with basmati rice and raita" }
        ],
        snack: [
          { name: "Samosa with Chutney", description: "Crispy pastry with spiced potato filling and mint-coriander chutney" },
          { name: "Bhel Puri", description: "Mumbai street food with puffed rice, vegetables, and tangy chutneys" },
          { name: "Masala Chai with Biscuits", description: "Spiced tea with ginger and cardamom, served with digestive biscuits" },
          { name: "Fruit Chaat", description: "Mixed seasonal fruits with chaat masala, lemon, and mint" }
        ]
      },
      usa: {
        breakfast: [
          { name: "Pancakes with Syrup", description: "Fluffy buttermilk pancakes with maple syrup, butter, and fresh berries" },
          { name: "Eggs Benedict", description: "English muffin with poached eggs, ham, and hollandaise sauce" },
          { name: "Avocado Toast", description: "Multigrain toast with smashed avocado, tomatoes, and everything seasoning" },
          { name: "Breakfast Burrito", description: "Scrambled eggs, cheese, bacon, and hash browns in a flour tortilla" },
          { name: "Oatmeal Bowl", description: "Steel-cut oats with fresh fruits, nuts, and honey" }
        ],
        lunch: [
          { name: "Classic Burger", description: "Beef patty with lettuce, tomato, cheese, and fries" },
          { name: "Caesar Salad", description: "Romaine lettuce with grilled chicken, croutons, and Caesar dressing" },
          { name: "BBQ Pulled Pork", description: "Slow-cooked pulled pork sandwich with coleslaw and sweet potato fries" },
          { name: "Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce, tomato, and mayo" },
          { name: "Mac and Cheese", description: "Creamy cheese pasta with breadcrumb topping and side salad" }
        ],
        dinner: [
          { name: "Grilled Steak", description: "Ribeye steak with mashed potatoes, green beans, and dinner roll" },
          { name: "Fried Chicken", description: "Crispy fried chicken with mac and cheese and cornbread" },
          { name: "Salmon Fillet", description: "Grilled salmon with quinoa pilaf and roasted asparagus" },
          { name: "Meatloaf", description: "Classic meatloaf with mashed potatoes, gravy, and steamed broccoli" },
          { name: "Shrimp and Grits", description: "Southern-style shrimp over creamy grits with andouille sausage" }
        ],
        snack: [
          { name: "Trail Mix", description: "Mixed nuts, dried fruits, and dark chocolate chips" },
          { name: "Apple with Peanut Butter", description: "Fresh apple slices with natural peanut butter" },
          { name: "Protein Smoothie", description: "Banana, berries, protein powder, and almond milk" },
          { name: "Cheese and Crackers", description: "Assorted cheeses with whole grain crackers and grapes" }
        ]
      },
      italy: {
        breakfast: [
          { name: "Cappuccino e Cornetto", description: "Italian coffee with flaky pastry filled with jam or cream" },
          { name: "Frittata", description: "Italian omelet with vegetables, herbs, and Parmigiano cheese" },
          { name: "Ricotta Pancakes", description: "Light pancakes with ricotta, lemon zest, and fresh berries" },
          { name: "Bruschetta", description: "Toasted bread with tomatoes, basil, garlic, and olive oil" },
          { name: "Yogurt Parfait", description: "Greek yogurt with honey, nuts, and seasonal fruits" }
        ],
        lunch: [
          { name: "Pasta Carbonara", description: "Spaghetti with eggs, pancetta, Pecorino Romano, and black pepper" },
          { name: "Margherita Pizza", description: "Classic pizza with tomato sauce, mozzarella, and fresh basil" },
          { name: "Risotto Milanese", description: "Creamy saffron risotto with Parmigiano and white wine" },
          { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, basil, and balsamic reduction" },
          { name: "Minestrone Soup", description: "Vegetable soup with beans, pasta, and fresh herbs" }
        ],
        dinner: [
          { name: "Osso Buco", description: "Braised veal shanks with saffron risotto and gremolata" },
          { name: "Chicken Parmigiana", description: "Breaded chicken with tomato sauce, mozzarella, and pasta" },
          { name: "Seafood Linguine", description: "Linguine with mixed seafood in white wine and garlic sauce" },
          { name: "Eggplant Parmigiana", description: "Layered eggplant with tomato sauce, mozzarella, and basil" },
          { name: "Veal Piccata", description: "Pan-seared veal with lemon, capers, and angel hair pasta" }
        ],
        snack: [
          { name: "Gelato", description: "Artisanal Italian ice cream with seasonal flavors" },
          { name: "Antipasto Plate", description: "Cured meats, cheeses, olives, and marinated vegetables" },
          { name: "Espresso with Biscotti", description: "Strong Italian coffee with almond biscotti" },
          { name: "Bruschetta Trio", description: "Three varieties of bruschetta with different toppings" }
        ]
      }
    };

    return countryMeals[country] || countryMeals.usa; // Default to USA if country not found
  };

  const customizeMealForPreferences = (meal: Meal, preferences: FoodPreferences): Meal => {
    let customizedMeal = { ...meal };

    // Add cost and cooking time based on preferences
    customizedMeal.cost = getCostEstimate(preferences.budgetRange);
    customizedMeal.cookingTime = preferences.cookingTime.includes('-')
      ? preferences.cookingTime
      : preferences.cookingTime + ' min';

    // If country is selected, use country-specific meals
    if (preferences.country && preferences.traditionalFoods) {
      const countryMeals = getCountrySpecificMeals(preferences.country, preferences.region, preferences.localTastes, preferences.traditionalFoods);

      // Randomly select a meal from the country-specific options
      const mealType = meal.name.toLowerCase().includes('breakfast') ? 'breakfast' :
                      meal.name.toLowerCase().includes('lunch') ? 'lunch' :
                      meal.name.toLowerCase().includes('dinner') ? 'dinner' : 'snack';

      if (countryMeals[mealType] && countryMeals[mealType].length > 0) {
        const randomMeal = countryMeals[mealType][Math.floor(Math.random() * countryMeals[mealType].length)];
        customizedMeal.name = randomMeal.name;
        customizedMeal.description = randomMeal.description;
      }
    }

    // Adjust meal based on dietary restrictions
    if (preferences.dietaryRestrictions.includes('Vegetarian') &&
        (customizedMeal.description.toLowerCase().includes('chicken') ||
         customizedMeal.description.toLowerCase().includes('beef') ||
         customizedMeal.description.toLowerCase().includes('fish') ||
         customizedMeal.description.toLowerCase().includes('meat'))) {
      customizedMeal.name = customizedMeal.name.replace(/Chicken|Beef|Fish|Salmon|Cod|Turkey|Lamb|Meat/gi, 'Paneer');
      customizedMeal.description = customizedMeal.description.replace(/chicken|beef|fish|salmon|cod|turkey|lamb|meat/gi, 'paneer');
    }

    if (preferences.dietaryRestrictions.includes('Vegan')) {
      customizedMeal.description = customizedMeal.description
        .replace(/cheese|yogurt|milk|eggs|paneer/gi, 'plant-based alternatives');
    }

    // Adjust spice level based on local tastes
    if (preferences.localTastes.includes('Spicy & Hot') || preferences.localTastes.includes('Spicy Sichuan')) {
      customizedMeal.description += ' (extra spicy)';
    } else if (preferences.localTastes.includes('Mild & Balanced') || preferences.spiceLevel === 'mild') {
      customizedMeal.description += ' (mild spices)';
    }

    // Add regional style if specified
    if (preferences.region) {
      customizedMeal.description += ` (${preferences.region} style)`;
    }

    return customizedMeal;
  };

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

  const currentPlan = useMemo(() => {
    const plan = mealPlans[selectedDay];
    if (!plan) return null;

    return {
      breakfast: customizeMealForPreferences(plan.breakfast, foodPreferences),
      lunch: customizeMealForPreferences(plan.lunch, foodPreferences),
      dinner: customizeMealForPreferences(plan.dinner, foodPreferences),
      snack: customizeMealForPreferences(plan.snack, foodPreferences)
    };
  }, [mealPlans, selectedDay, foodPreferences]);

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
      <div className={`flex items-center justify-between mb-4`}>
        <div className={`flex items-center gap-3`}>
          <div className={`p-2 bg-white rounded-lg ${textColor}`}>
            {getMealIcon(mealType)}
          </div>
          <div>
            <h4 className={`font-semibold ${textColor} capitalize`}>{mealType}</h4>
            <p className={`text-sm ${textColor} opacity-80`}>{meal.calories} calories</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {meal.cost && (
            <div className={`flex items-center gap-1 px-2 py-1 bg-white rounded-lg ${textColor}`}>
              <DollarSign className="w-3 h-3" />
              <span className="text-xs font-medium">{meal.cost}</span>
            </div>
          )}
          {meal.cookingTime && (
            <div className={`flex items-center gap-1 px-2 py-1 bg-white rounded-lg ${textColor}`}>
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">{meal.cookingTime}</span>
            </div>
          )}
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

  if (!currentPlan) return null;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Utensils className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Personalized Diet Plan</h2>
              <p className="text-gray-600">
                {hasSetPreferences ? (
                  <>
                    {foodPreferences.country && (
                      <span className="mr-4">
                        🌍 {foodPreferences.country.charAt(0).toUpperCase() + foodPreferences.country.slice(1)}
                        {foodPreferences.region && ` (${foodPreferences.region})`}
                      </span>
                    )}
                    Budget: {getBudgetIcon(foodPreferences.budgetRange)} {getCostEstimate(foodPreferences.budgetRange)}/meal
                  </>
                ) : (
                  'Customize your meal preferences for better recommendations'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BackendStatus />
            <button
              onClick={() => setShowPreferencesModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Food Preferences</span>
            </button>
          </div>
        </div>

        {!hasSetPreferences && (
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800">Customize Your Experience</h3>
                <p className="text-orange-700 text-sm">
                  Set your food preferences, budget, and dietary restrictions to get personalized meal recommendations!
                </p>
              </div>
            </div>
          </div>
        )}

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

      <FoodPreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSave={handleSavePreferences}
        currentPreferences={foodPreferences}
      />
    </>
  );
};

export default DietPlan;