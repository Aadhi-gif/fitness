import React, { useState } from 'react';
import { Database, Save, Activity, Target, Utensils, Dumbbell, CheckCircle } from 'lucide-react';
import { dataStorage } from '../services/dataStorage';
import { useAuth } from '../contexts/DatabaseAuthContext';

const DataStorageDemo: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testProfileStorage = async () => {
    if (!user?.id) {
      addResult('❌ No user logged in');
      return;
    }

    setIsLoading(true);
    try {
      const profileData = {
        age: 28,
        gender: 'male' as const,
        height: 175,
        weight: 75,
        activityLevel: 'active' as const,
        goal: 'gain' as const,
      };

      const success = await dataStorage.saveProfile(user.id, profileData);
      if (success) {
        addResult('✅ Profile data saved to database');
      } else {
        addResult('❌ Failed to save profile data');
      }
    } catch (error) {
      addResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWorkoutStorage = async () => {
    if (!user?.id) {
      addResult('❌ No user logged in');
      return;
    }

    setIsLoading(true);
    try {
      const workoutData = {
        name: 'Upper Body Strength',
        exercises: [
          { name: 'Bench Press', sets: 3, reps: 10, weight: 80 },
          { name: 'Pull-ups', sets: 3, reps: 8, weight: 0 },
          { name: 'Shoulder Press', sets: 3, reps: 12, weight: 25 },
        ],
        duration: 45,
        caloriesBurned: 320,
        notes: 'Great workout, felt strong today!',
      };

      const success = await dataStorage.saveWorkout(user.id, workoutData);
      if (success) {
        addResult('✅ Workout data saved to database');
      } else {
        addResult('❌ Failed to save workout data');
      }
    } catch (error) {
      addResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testNutritionStorage = async () => {
    if (!user?.id) {
      addResult('❌ No user logged in');
      return;
    }

    setIsLoading(true);
    try {
      const nutritionData = {
        date: new Date().toISOString().split('T')[0],
        mealType: 'lunch' as const,
        foodName: 'Grilled Chicken Breast',
        calories: 250,
        protein: 45,
        carbs: 0,
        fat: 5,
        quantity: 1,
        unit: 'serving',
      };

      const success = await dataStorage.saveNutrition(user.id, nutritionData);
      if (success) {
        addResult('✅ Nutrition data saved to database');
      } else {
        addResult('❌ Failed to save nutrition data');
      }
    } catch (error) {
      addResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGoalStorage = async () => {
    if (!user?.id) {
      addResult('❌ No user logged in');
      return;
    }

    setIsLoading(true);
    try {
      const goalData = {
        title: 'Gain 5kg Muscle Mass',
        description: 'Build lean muscle through consistent training and proper nutrition',
        category: 'muscle_building' as const,
        targetValue: 80,
        currentValue: 75,
        unit: 'kg',
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
      };

      const success = await dataStorage.saveGoal(user.id, goalData);
      if (success) {
        addResult('✅ Goal data saved to database');
      } else {
        addResult('❌ Failed to save goal data');
      }
    } catch (error) {
      addResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testActivityLogging = async () => {
    if (!user?.id) {
      addResult('❌ No user logged in');
      return;
    }

    setIsLoading(true);
    try {
      const success = await dataStorage.logActivity(
        user.id,
        'SYSTEM',
        'data_storage_demo',
        { component: 'DataStorageDemo', action: 'test_activity_logging' }
      );

      if (success) {
        addResult('✅ Activity logged to database');
      } else {
        addResult('❌ Failed to log activity');
      }
    } catch (error) {
      addResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30">
        <div className="text-center">
          <Database className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Database Storage Demo</h3>
          <p className="text-gray-300">Please log in to test database storage functionality</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-8 h-8 text-blue-400" />
        <h3 className="text-2xl font-bold text-white">Database Storage Demo</h3>
      </div>

      <p className="text-gray-300 mb-6">
        Test all database storage capabilities. Each button will save real data to your Prisma database.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={testProfileStorage}
          disabled={isLoading}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all disabled:opacity-50"
        >
          <Activity className="w-5 h-5 text-blue-400" />
          <span className="text-white font-semibold">Test Profile Storage</span>
        </button>

        <button
          onClick={testWorkoutStorage}
          disabled={isLoading}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/30 hover:from-orange-600/30 hover:to-red-600/30 transition-all disabled:opacity-50"
        >
          <Dumbbell className="w-5 h-5 text-orange-400" />
          <span className="text-white font-semibold">Test Workout Storage</span>
        </button>

        <button
          onClick={testNutritionStorage}
          disabled={isLoading}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all disabled:opacity-50"
        >
          <Utensils className="w-5 h-5 text-green-400" />
          <span className="text-white font-semibold">Test Nutrition Storage</span>
        </button>

        <button
          onClick={testGoalStorage}
          disabled={isLoading}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all disabled:opacity-50"
        >
          <Target className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold">Test Goal Storage</span>
        </button>

        <button
          onClick={testActivityLogging}
          disabled={isLoading}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30 hover:from-yellow-600/30 hover:to-orange-600/30 transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-semibold">Test Activity Logging</span>
        </button>

        <button
          onClick={clearResults}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-xl border border-gray-500/30 hover:from-gray-600/30 hover:to-gray-700/30 transition-all"
        >
          <CheckCircle className="w-5 h-5 text-gray-400" />
          <span className="text-white font-semibold">Clear Results</span>
        </button>
      </div>

      {/* Results Display */}
      {results.length > 0 && (
        <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
          <h4 className="text-white font-semibold mb-3">Database Operation Results:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index} className="text-sm font-mono text-gray-300 bg-black/20 p-2 rounded">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span>Saving to database...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataStorageDemo;
