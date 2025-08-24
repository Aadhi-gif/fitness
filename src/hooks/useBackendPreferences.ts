import { useState, useEffect } from 'react';
import { preferencesAPI, handleAPIError } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { activityLogger } from '../services/activityLogger';

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

export const useBackendPreferences = () => {
  const { isAuthenticated, isBackendConnected, user } = useAuth();
  const [preferences, setPreferences] = useState<FoodPreferences>({
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
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load preferences on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadPreferences();
    }
  }, [isAuthenticated, isBackendConnected]);

  const loadPreferences = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isBackendConnected) {
        // Load from backend
        const backendPreferences = await preferencesAPI.getFoodPreferences();
        setPreferences({
          dietaryRestrictions: backendPreferences.dietaryRestrictions,
          cuisinePreferences: backendPreferences.cuisinePreferences,
          budgetRange: backendPreferences.budgetRange,
          cookingTime: backendPreferences.cookingTime,
          spiceLevel: backendPreferences.spiceLevel,
          mealComplexity: backendPreferences.mealComplexity,
          allergies: backendPreferences.allergies,
          dislikedFoods: backendPreferences.dislikedFoods,
          preferredProteins: backendPreferences.preferredProteins,
          location: backendPreferences.location,
          country: backendPreferences.country,
          region: backendPreferences.region,
          localTastes: backendPreferences.localTastes,
          traditionalFoods: backendPreferences.traditionalFoods
        });
      } else {
        // Load from localStorage as fallback
        const savedPreferences = localStorage.getItem('foodPreferences');
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load preferences from backend, using localStorage');
      // Fallback to localStorage
      const savedPreferences = localStorage.getItem('foodPreferences');
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(parsed);
        } catch (parseError) {
          console.error('Failed to parse saved preferences:', parseError);
          setError('Failed to load saved preferences');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (newPreferences: FoodPreferences): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (isBackendConnected) {
        // Save to backend
        await preferencesAPI.saveFoodPreferences(newPreferences);
      }
      
      // Always save to localStorage as backup
      localStorage.setItem('foodPreferences', JSON.stringify(newPreferences));
      setPreferences(newPreferences);

      // Log food preferences update
      if (user) {
        activityLogger.logFoodPreferencesUpdate(
          user.id,
          user.name,
          user.email,
          newPreferences
        );
      }

      return true;
    } catch (error) {
      console.warn('Failed to save preferences to backend, saved locally only');
      // Still save locally even if backend fails
      localStorage.setItem('foodPreferences', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      return false; // Indicate backend save failed
    } finally {
      setIsLoading(false);
    }
  };

  const syncWithBackend = async (): Promise<boolean> => {
    if (!isBackendConnected) {
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get local preferences
      const localPreferences = localStorage.getItem('foodPreferences');
      if (localPreferences) {
        const parsed = JSON.parse(localPreferences);
        await preferencesAPI.saveFoodPreferences(parsed);
        return true;
      }
      return false;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearPreferences = async (): Promise<void> => {
    const defaultPreferences: FoodPreferences = {
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
    };

    await savePreferences(defaultPreferences);
  };

  const getPreferenceSummary = (): string => {
    const parts: string[] = [];
    
    if (preferences.country) {
      parts.push(`${preferences.country.charAt(0).toUpperCase() + preferences.country.slice(1)} cuisine`);
    }
    
    if (preferences.region) {
      parts.push(preferences.region);
    }
    
    if (preferences.budgetRange) {
      const budgetLabels: { [key: string]: string } = {
        budget: 'Budget-friendly',
        moderate: 'Moderate budget',
        premium: 'Premium',
        luxury: 'Luxury'
      };
      parts.push(budgetLabels[preferences.budgetRange] || preferences.budgetRange);
    }
    
    if (preferences.dietaryRestrictions.length > 0) {
      parts.push(preferences.dietaryRestrictions.join(', '));
    }
    
    return parts.length > 0 ? parts.join(' • ') : 'No preferences set';
  };

  return {
    preferences,
    isLoading,
    error,
    loadPreferences,
    savePreferences,
    syncWithBackend,
    clearPreferences,
    getPreferenceSummary,
    isBackendConnected
  };
};

export default useBackendPreferences;
