import { prisma } from '../lib/prisma';
import type { User, UserProfile, UserPreferences } from '@prisma/client';

// User authentication functions
export const userService = {
  // Create new user
  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: 'USER' | 'ADMIN';
  }) {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // In production, hash this password
        name: data.name,
        role: data.role || 'USER',
      },
      include: {
        profile: true,
        preferences: true,
      },
    });
  },

  // Find user by email
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        preferences: true,
      },
    });
  },

  // Find user by ID
  async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        preferences: true,
      },
    });
  },

  // Update user
  async updateUser(id: string, data: Partial<User>) {
    return await prisma.user.update({
      where: { id },
      data,
      include: {
        profile: true,
        preferences: true,
      },
    });
  },

  // Delete user
  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};

// User profile functions
export const profileService = {
  // Create or update profile
  async upsertProfile(userId: string, data: {
    age?: number;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    height?: number;
    weight?: number;
    goal?: 'LOSE_WEIGHT' | 'GAIN_WEIGHT' | 'MAINTAIN_WEIGHT' | 'BUILD_MUSCLE' | 'IMPROVE_ENDURANCE' | 'GENERAL_FITNESS';
    activityLevel?: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'ACTIVE' | 'VERY_ACTIVE';
    bodyFat?: number;
    muscleMass?: number;
    bmr?: number;
    tdee?: number;
    targetCalories?: number;
  }) {
    return await prisma.userProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  },

  // Get profile by user ID
  async getProfile(userId: string) {
    return await prisma.userProfile.findUnique({
      where: { userId },
    });
  },

  // Delete profile
  async deleteProfile(userId: string) {
    return await prisma.userProfile.delete({
      where: { userId },
    });
  },
};

// User preferences functions
export const preferencesService = {
  // Create or update preferences
  async upsertPreferences(userId: string, data: {
    dietaryRestrictions?: string[];
    cuisinePreferences?: string[];
    allergies?: string[];
    dislikedFoods?: string[];
    preferredProteins?: string[];
    budgetRange?: string;
    cookingTime?: string;
    spiceLevel?: string;
    mealComplexity?: string;
    location?: string;
    country?: string;
    region?: string;
    localTastes?: string[];
    traditionalFoods?: boolean;
    units?: string;
    theme?: string;
    language?: string;
    notifications?: boolean;
  }) {
    return await prisma.userPreferences.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  },

  // Get preferences by user ID
  async getPreferences(userId: string) {
    return await prisma.userPreferences.findUnique({
      where: { userId },
    });
  },
};

// Activity logging functions
export const activityService = {
  // Log activity
  async logActivity(data: {
    userId: string;
    type: 'AUTH' | 'PROFILE' | 'WORKOUT' | 'NUTRITION' | 'GOAL' | 'SYSTEM';
    action: string;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return await prisma.activityLog.create({
      data: {
        userId: data.userId,
        type: data.type,
        action: data.action,
        details: data.details,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  },

  // Get user activities
  async getUserActivities(userId: string, limit: number = 50) {
    return await prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },
};

// Workout functions
export const workoutService = {
  // Create workout session
  async createWorkoutSession(data: {
    userId: string;
    name: string;
    exercises: any;
    duration: number;
    caloriesBurned?: number;
    notes?: string;
  }) {
    return await prisma.workoutSession.create({
      data,
    });
  },

  // Get user workouts
  async getUserWorkouts(userId: string, limit: number = 20) {
    return await prisma.workoutSession.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: limit,
    });
  },
};

// Nutrition functions
export const nutritionService = {
  // Add nutrition entry
  async addNutritionEntry(data: {
    userId: string;
    date?: Date;
    mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    quantity?: number;
    unit?: string;
  }) {
    return await prisma.nutritionEntry.create({
      data: {
        ...data,
        date: data.date || new Date(),
        quantity: data.quantity || 1,
        unit: data.unit || 'serving',
      },
    });
  },

  // Get nutrition entries for a date range
  async getNutritionEntries(userId: string, startDate: Date, endDate: Date) {
    return await prisma.nutritionEntry.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'desc' },
    });
  },
};

// Goals functions
export const goalService = {
  // Create goal
  async createGoal(data: {
    userId: string;
    title: string;
    description?: string;
    category: 'WEIGHT_LOSS' | 'WEIGHT_GAIN' | 'MUSCLE_BUILDING' | 'STRENGTH' | 'ENDURANCE' | 'FLEXIBILITY' | 'NUTRITION' | 'HABIT';
    targetValue?: number;
    currentValue?: number;
    unit?: string;
    targetDate?: Date;
  }) {
    return await prisma.goal.create({
      data,
    });
  },

  // Get user goals
  async getUserGoals(userId: string) {
    return await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  // Update goal progress
  async updateGoalProgress(goalId: string, currentValue: number, isCompleted?: boolean) {
    return await prisma.goal.update({
      where: { id: goalId },
      data: {
        currentValue,
        isCompleted: isCompleted || false,
        completedAt: isCompleted ? new Date() : null,
      },
    });
  },
};
