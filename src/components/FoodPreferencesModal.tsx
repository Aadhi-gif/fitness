import React, { useState } from 'react';
import { X, DollarSign, Heart, Utensils, Clock, MapPin, AlertCircle, Globe, Flag } from 'lucide-react';

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

interface FoodPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: FoodPreferences) => void;
  currentPreferences?: FoodPreferences;
}

const FoodPreferencesModal: React.FC<FoodPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentPreferences
}) => {
  const [preferences, setPreferences] = useState<FoodPreferences>(
    currentPreferences || {
      dietaryRestrictions: [],
      cuisinePreferences: [],
      budgetRange: 'moderate',
      cookingTime: '30-45',
      spiceLevel: 'medium',
      mealComplexity: 'moderate',
      allergies: [],
      dislikedFoods: [],
      preferredProteins: [],
      location: 'global',
      country: '',
      region: '',
      localTastes: [],
      traditionalFoods: true
    }
  );

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Mediterranean',
    'Low-Carb', 'Low-Fat', 'Gluten-Free', 'Dairy-Free', 'Halal', 'Kosher'
  ];

  const cuisineOptions = [
    'Mediterranean', 'Asian', 'Mexican', 'Italian', 'Indian', 'American',
    'Middle Eastern', 'French', 'Thai', 'Japanese', 'Greek', 'Spanish'
  ];

  const allergyOptions = [
    'Nuts', 'Shellfish', 'Fish', 'Eggs', 'Dairy', 'Soy', 'Gluten', 'Sesame'
  ];

  const proteinOptions = [
    'Chicken', 'Fish', 'Beef', 'Pork', 'Turkey', 'Tofu', 'Legumes', 'Eggs'
  ];

  const countryOptions = [
    { value: 'india', label: 'India 🇮🇳', flag: '🇮🇳' },
    { value: 'usa', label: 'United States 🇺🇸', flag: '🇺🇸' },
    { value: 'italy', label: 'Italy 🇮🇹', flag: '🇮🇹' },
    { value: 'mexico', label: 'Mexico 🇲🇽', flag: '🇲🇽' },
    { value: 'japan', label: 'Japan 🇯🇵', flag: '🇯🇵' },
    { value: 'china', label: 'China 🇨🇳', flag: '🇨🇳' },
    { value: 'thailand', label: 'Thailand 🇹🇭', flag: '🇹🇭' },
    { value: 'france', label: 'France 🇫🇷', flag: '🇫🇷' },
    { value: 'greece', label: 'Greece 🇬🇷', flag: '🇬🇷' },
    { value: 'spain', label: 'Spain 🇪🇸', flag: '🇪🇸' },
    { value: 'lebanon', label: 'Lebanon 🇱🇧', flag: '🇱🇧' },
    { value: 'morocco', label: 'Morocco 🇲🇦', flag: '🇲🇦' },
    { value: 'brazil', label: 'Brazil 🇧🇷', flag: '🇧🇷' },
    { value: 'korea', label: 'South Korea 🇰🇷', flag: '🇰🇷' },
    { value: 'vietnam', label: 'Vietnam 🇻🇳', flag: '🇻🇳' },
    { value: 'global', label: 'International Mix 🌍', flag: '🌍' }
  ];

  const getRegionalOptions = (country: string) => {
    const regions: { [key: string]: string[] } = {
      india: ['North Indian', 'South Indian', 'Bengali', 'Gujarati', 'Punjabi', 'Maharashtrian', 'Rajasthani', 'Kerala'],
      usa: ['Southern', 'Tex-Mex', 'California', 'New York', 'Midwest', 'Pacific Northwest', 'Cajun', 'BBQ'],
      italy: ['Northern Italian', 'Southern Italian', 'Tuscan', 'Sicilian', 'Roman', 'Venetian', 'Neapolitan'],
      mexico: ['Yucatecan', 'Oaxacan', 'Jalisco', 'Pueblan', 'Veracruz', 'Northern Mexican', 'Central Mexican'],
      japan: ['Kansai', 'Kanto', 'Kyushu', 'Hokkaido', 'Okinawan', 'Traditional', 'Modern Fusion'],
      china: ['Sichuan', 'Cantonese', 'Hunan', 'Jiangsu', 'Zhejiang', 'Fujian', 'Beijing', 'Shanghai'],
      thailand: ['Central Thai', 'Northern Thai', 'Northeastern (Isaan)', 'Southern Thai', 'Royal Thai'],
      france: ['Provence', 'Normandy', 'Burgundy', 'Alsace', 'Loire Valley', 'Brittany', 'Parisian'],
      global: ['Fusion', 'International', 'Modern', 'Traditional', 'Street Food', 'Fine Dining']
    };
    return regions[country] || [];
  };

  const getLocalTastes = (country: string) => {
    const tastes: { [key: string]: string[] } = {
      india: ['Spicy & Hot', 'Sweet & Savory', 'Tangy & Sour', 'Rich & Creamy', 'Aromatic Spices', 'Street Food Style', 'Home-style Comfort', 'Festival Special'],
      usa: ['BBQ & Smoky', 'Sweet & Savory', 'Comfort Food', 'Fresh & Light', 'Bold Flavors', 'Fusion Style', 'Classic American', 'Regional Specialties'],
      italy: ['Fresh & Simple', 'Rich & Creamy', 'Herb-infused', 'Wine-paired', 'Rustic Traditional', 'Modern Italian', 'Seasonal Ingredients'],
      mexico: ['Spicy & Vibrant', 'Fresh & Zesty', 'Smoky & Earthy', 'Traditional Authentic', 'Street Food', 'Festive & Colorful'],
      japan: ['Umami Rich', 'Fresh & Clean', 'Delicate & Subtle', 'Traditional Washoku', 'Modern Fusion', 'Seasonal Harmony'],
      china: ['Spicy Sichuan', 'Sweet & Sour', 'Savory Umami', 'Fresh Cantonese', 'Bold & Aromatic', 'Traditional Flavors'],
      thailand: ['Spicy & Sour', 'Sweet & Savory', 'Fresh Herbs', 'Coconut Rich', 'Street Food Style', 'Royal Thai'],
      france: ['Rich & Buttery', 'Wine-infused', 'Herb-crusted', 'Classic Techniques', 'Regional Specialties', 'Elegant Presentation'],
      global: ['Mild & Balanced', 'Bold & Adventurous', 'Fresh & Healthy', 'Comfort Food', 'Exotic Flavors', 'Fusion Style']
    };
    return tastes[country] || tastes.global;
  };

  const budgetRanges = [
    { value: 'budget', label: 'Budget-Friendly ($5-10/meal)', icon: '💰' },
    { value: 'moderate', label: 'Moderate ($10-20/meal)', icon: '💵' },
    { value: 'premium', label: 'Premium ($20-35/meal)', icon: '💎' },
    { value: 'luxury', label: 'Luxury ($35+/meal)', icon: '👑' }
  ];

  const handleArrayToggle = (array: string[], value: string, setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Utensils className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Food Preferences</h2>
                <p className="text-gray-600">Customize your meal recommendations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Budget Range */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Budget Range</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetRanges.map((budget) => (
                <button
                  key={budget.value}
                  onClick={() => setPreferences(prev => ({ ...prev, budgetRange: budget.value }))}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    preferences.budgetRange === budget.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{budget.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{budget.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Country & Regional Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Country & Regional Preferences</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flag className="w-4 h-4 inline mr-1" />
                  Your Country/Region
                </label>
                <select
                  value={preferences.country}
                  onChange={(e) => {
                    setPreferences(prev => ({
                      ...prev,
                      country: e.target.value,
                      region: '', // Reset region when country changes
                      localTastes: [] // Reset local tastes
                    }));
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your country...</option>
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>

              {preferences.country && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Regional Style
                  </label>
                  <select
                    value={preferences.region}
                    onChange={(e) => setPreferences(prev => ({ ...prev, region: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select regional style...</option>
                    {getRegionalOptions(preferences.country).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {preferences.country && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Local Taste Preferences
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getLocalTastes(preferences.country).map((taste) => (
                    <button
                      key={taste}
                      onClick={() => handleArrayToggle(
                        preferences.localTastes,
                        taste,
                        (arr) => setPreferences(prev => ({ ...prev, localTastes: arr }))
                      )}
                      className={`p-2 rounded-lg border-2 transition-all text-xs ${
                        preferences.localTastes.includes(taste)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {taste}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {preferences.country && (
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.traditionalFoods}
                    onChange={(e) => setPreferences(prev => ({ ...prev, traditionalFoods: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Prefer traditional/authentic recipes from this region
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Dietary Restrictions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">Dietary Preferences</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dietaryOptions.map((diet) => (
                <button
                  key={diet}
                  onClick={() => handleArrayToggle(
                    preferences.dietaryRestrictions,
                    diet,
                    (arr) => setPreferences(prev => ({ ...prev, dietaryRestrictions: arr }))
                  )}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    preferences.dietaryRestrictions.includes(diet)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine Preferences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Favorite Cuisines</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleArrayToggle(
                    preferences.cuisinePreferences,
                    cuisine,
                    (arr) => setPreferences(prev => ({ ...prev, cuisinePreferences: arr }))
                  )}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    preferences.cuisinePreferences.includes(cuisine)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking Time & Complexity */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Cooking Time</h3>
              </div>
              <select
                value={preferences.cookingTime}
                onChange={(e) => setPreferences(prev => ({ ...prev, cookingTime: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="15-30">Quick (15-30 minutes)</option>
                <option value="30-45">Moderate (30-45 minutes)</option>
                <option value="45-60">Extended (45-60 minutes)</option>
                <option value="60+">Elaborate (60+ minutes)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Spice Level</h3>
              </div>
              <select
                value={preferences.spiceLevel}
                onChange={(e) => setPreferences(prev => ({ ...prev, spiceLevel: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="mild">Mild 🌶️</option>
                <option value="medium">Medium 🌶️🌶️</option>
                <option value="hot">Hot 🌶️🌶️🌶️</option>
                <option value="very-hot">Very Hot 🌶️🌶️🌶️🌶️</option>
              </select>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">Allergies & Restrictions</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allergyOptions.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => handleArrayToggle(
                    preferences.allergies,
                    allergy,
                    (arr) => setPreferences(prev => ({ ...prev, allergies: arr }))
                  )}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    preferences.allergies.includes(allergy)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Proteins */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Preferred Proteins</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {proteinOptions.map((protein) => (
                <button
                  key={protein}
                  onClick={() => handleArrayToggle(
                    preferences.preferredProteins,
                    protein,
                    (arr) => setPreferences(prev => ({ ...prev, preferredProteins: arr }))
                  )}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    preferences.preferredProteins.includes(protein)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {protein}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-medium"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPreferencesModal;
