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

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: 'lose' | 'maintain' | 'gain';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
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