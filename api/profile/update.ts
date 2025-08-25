import type { VercelRequest, VercelResponse } from '@vercel/node';
import { profileService, activityService } from '../../src/services/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Map frontend data to database format
    const dbProfileData = {
      age: profileData.age,
      gender: profileData.gender?.toUpperCase(),
      height: profileData.height,
      weight: profileData.weight,
      goal: mapGoalToDB(profileData.goal),
      activityLevel: mapActivityLevelToDB(profileData.activityLevel),
      bodyFat: profileData.bodyFat,
      muscleMass: profileData.muscleMass,
      bmr: profileData.bmr,
      tdee: profileData.tdee,
      targetCalories: profileData.targetCalories,
    };

    // Update profile in database
    const updatedProfile = await profileService.upsertProfile(userId, dbProfileData);

    // Log profile update
    await activityService.logActivity({
      userId,
      type: 'PROFILE',
      action: 'profile_updated',
      details: { updatedFields: Object.keys(profileData) },
      ipAddress: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    res.status(200).json({
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Profile update API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper functions to map frontend types to database enums
const mapGoalToDB = (goal: string) => {
  switch (goal) {
    case 'lose': return 'LOSE_WEIGHT';
    case 'gain': return 'GAIN_WEIGHT';
    case 'maintain': return 'MAINTAIN_WEIGHT';
    default: return 'GENERAL_FITNESS';
  }
};

const mapActivityLevelToDB = (level: string) => {
  switch (level) {
    case 'sedentary': return 'SEDENTARY';
    case 'light': return 'LIGHT';
    case 'moderate': return 'MODERATE';
    case 'active': return 'ACTIVE';
    case 'very-active': return 'VERY_ACTIVE';
    default: return 'MODERATE';
  }
};
