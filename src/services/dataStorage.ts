// Data Storage Service - Handles all database operations from the frontend

export interface UserProfileData {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface WorkoutData {
  name: string;
  exercises: any[];
  duration: number;
  caloriesBurned?: number;
  notes?: string;
}

export interface NutritionData {
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity?: number;
  unit?: string;
}

export interface GoalData {
  title: string;
  description?: string;
  category: 'weight_loss' | 'weight_gain' | 'muscle_building' | 'strength' | 'endurance' | 'nutrition';
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  targetDate?: string;
}

class DataStorageService {
  private baseUrl = '/api';

  // Profile Data Storage
  async saveProfile(userId: string, profileData: UserProfileData): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/profile/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          profileData,
        }),
      });

      if (response.ok) {
        console.log('✅ Profile saved to database');
        return true;
      } else {
        console.error('❌ Failed to save profile:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving profile:', error);
      return false;
    }
  }

  async getProfile(userId: string): Promise<UserProfileData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/profile/get?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.profile;
      } else {
        console.error('❌ Failed to get profile:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting profile:', error);
      return null;
    }
  }

  // Workout Data Storage
  async saveWorkout(userId: string, workoutData: WorkoutData): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/workout/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...workoutData,
        }),
      });

      if (response.ok) {
        console.log('✅ Workout saved to database');
        return true;
      } else {
        console.error('❌ Failed to save workout:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving workout:', error);
      return false;
    }
  }

  async getWorkouts(userId: string, limit: number = 20): Promise<WorkoutData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/workout/list?userId=${userId}&limit=${limit}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.workouts || [];
      } else {
        console.error('❌ Failed to get workouts:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('❌ Error getting workouts:', error);
      return [];
    }
  }

  // Nutrition Data Storage
  async saveNutrition(userId: string, nutritionData: NutritionData): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/nutrition/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...nutritionData,
        }),
      });

      if (response.ok) {
        console.log('✅ Nutrition data saved to database');
        return true;
      } else {
        console.error('❌ Failed to save nutrition data:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving nutrition data:', error);
      return false;
    }
  }

  async getNutrition(userId: string, startDate: string, endDate: string): Promise<NutritionData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/nutrition/list?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.nutrition || [];
      } else {
        console.error('❌ Failed to get nutrition data:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('❌ Error getting nutrition data:', error);
      return [];
    }
  }

  // Goals Data Storage
  async saveGoal(userId: string, goalData: GoalData): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/goals/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...goalData,
        }),
      });

      if (response.ok) {
        console.log('✅ Goal saved to database');
        return true;
      } else {
        console.error('❌ Failed to save goal:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving goal:', error);
      return false;
    }
  }

  async getGoals(userId: string): Promise<GoalData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/goals/list?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.goals || [];
      } else {
        console.error('❌ Failed to get goals:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('❌ Error getting goals:', error);
      return [];
    }
  }

  async updateGoalProgress(goalId: string, currentValue: number, isCompleted?: boolean): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/goals/update-progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goalId,
          currentValue,
          isCompleted,
        }),
      });

      if (response.ok) {
        console.log('✅ Goal progress updated');
        return true;
      } else {
        console.error('❌ Failed to update goal progress:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error updating goal progress:', error);
      return false;
    }
  }

  // Activity Logging
  async logActivity(userId: string, type: string, action: string, details?: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/activity/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          type,
          action,
          details,
        }),
      });

      if (response.ok) {
        console.log('✅ Activity logged');
        return true;
      } else {
        console.error('❌ Failed to log activity:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error logging activity:', error);
      return false;
    }
  }
}

// Export singleton instance
export const dataStorage = new DataStorageService();
