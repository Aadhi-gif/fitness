// API service for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api';

// Types for API requests/responses
export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: 'lose' | 'maintain' | 'gain';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface FoodPreferences {
  userId: string;
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
  updatedAt: string;
}

export interface WorkoutProgress {
  userId: string;
  date: string;
  exerciseType: string;
  duration: number;
  caloriesBurned: number;
  notes?: string;
}

export interface NutritionLog {
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItems: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity: number;
  }[];
  totalCalories: number;
}

// API utility functions
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    age?: number;
    weight?: number;
    height?: number;
    goal?: string;
    activityLevel?: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    return handleResponse(response);
  },

  // Logout user
  logout: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  }
};

// Food Preferences API calls
export const preferencesAPI = {
  // Get user food preferences
  getFoodPreferences: async (): Promise<FoodPreferences> => {
    const response = await fetch(`${API_BASE_URL}/preferences/food`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Save/update food preferences
  saveFoodPreferences: async (preferences: Omit<FoodPreferences, 'userId' | 'updatedAt'>): Promise<FoodPreferences> => {
    const response = await fetch(`${API_BASE_URL}/preferences/food`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(preferences)
    });
    return handleResponse(response);
  }
};

// Progress Tracking API calls
export const progressAPI = {
  // Log workout
  logWorkout: async (workout: Omit<WorkoutProgress, 'userId'>): Promise<WorkoutProgress> => {
    const response = await fetch(`${API_BASE_URL}/progress/workout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(workout)
    });
    return handleResponse(response);
  },

  // Get workout history
  getWorkoutHistory: async (startDate?: string, endDate?: string): Promise<WorkoutProgress[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_BASE_URL}/progress/workouts?${params}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Log nutrition
  logNutrition: async (nutrition: Omit<NutritionLog, 'userId'>): Promise<NutritionLog> => {
    const response = await fetch(`${API_BASE_URL}/progress/nutrition`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(nutrition)
    });
    return handleResponse(response);
  },

  // Get nutrition history
  getNutritionHistory: async (startDate?: string, endDate?: string): Promise<NutritionLog[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_BASE_URL}/progress/nutrition?${params}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get dashboard stats
  getDashboardStats: async (): Promise<{
    totalWorkouts: number;
    totalCaloriesBurned: number;
    averageWorkoutDuration: number;
    currentStreak: number;
    weeklyProgress: {
      date: string;
      workouts: number;
      calories: number;
    }[];
  }> => {
    const response = await fetch(`${API_BASE_URL}/progress/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Error handling utility
export const handleAPIError = (error: any) => {
  console.error('API Error:', error);
  
  if (error.message.includes('401') || error.message.includes('Unauthorized')) {
    // Token expired, redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return;
  }
  
  // Show user-friendly error message
  return error.message || 'Something went wrong. Please try again.';
};

// Token management
export const tokenManager = {
  setTokens: (token: string, refreshToken: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getToken: () => localStorage.getItem('authToken'),
  
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  
  clearTokens: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      // Basic token validation (you might want to decode JWT and check expiry)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

export default {
  authAPI,
  preferencesAPI,
  progressAPI,
  handleAPIError,
  tokenManager
};
