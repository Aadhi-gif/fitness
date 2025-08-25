import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userService } from '../../src/services/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Save user settings
    try {
      const { 
        userId,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        gender,
        country,
        state,
        city,
        timezone,
        language,
        profilePhoto,
        bio,
        fitnessLevel,
        units,
        theme,
        emailNotifications,
        pushNotifications,
        workoutReminders,
        nutritionReminders,
        profileVisibility,
        shareProgress,
        shareWorkouts
      } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Update user basic info
      const updatedUser = await userService.updateUser(userId, {
        name: `${firstName} ${lastName}`.trim(),
        email: email,
      });

      // Update or create user profile with extended settings
      const profileData = {
        userId,
        age: dateOfBirth ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear() : undefined,
        gender: gender?.toUpperCase() as 'MALE' | 'FEMALE' | 'OTHER',
        phone,
        country,
        state,
        city,
        timezone,
        language,
        profilePhoto,
        bio,
        fitnessLevel: fitnessLevel?.toUpperCase() as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT',
        units: units?.toUpperCase() as 'METRIC' | 'IMPERIAL',
        theme: theme?.toUpperCase() as 'LIGHT' | 'DARK' | 'AUTO',
        emailNotifications,
        pushNotifications,
        workoutReminders,
        nutritionReminders,
        profileVisibility: profileVisibility?.toUpperCase() as 'PUBLIC' | 'FRIENDS' | 'PRIVATE',
        shareProgress,
        shareWorkouts,
      };

      // Remove undefined values
      const cleanProfileData = Object.fromEntries(
        Object.entries(profileData).filter(([_, value]) => value !== undefined)
      );

      const profile = await userService.updateUserProfile(userId, cleanProfileData);

      res.status(200).json({
        success: true,
        message: 'Settings saved successfully',
        user: updatedUser,
        profile: profile,
      });
    } catch (error) {
      console.error('Settings save API error:', error);
      res.status(500).json({ error: 'Failed to save settings' });
    }
  } else if (req.method === 'GET') {
    // Get user settings
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = await userService.findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const profile = await userService.getUserProfile(userId);

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        settings: {
          // Personal Information
          firstName: user.name?.split(' ')[0] || '',
          lastName: user.name?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          phone: profile?.phone || '',
          dateOfBirth: profile?.age ? new Date(new Date().getFullYear() - profile.age, 0, 1).toISOString().split('T')[0] : '',
          gender: profile?.gender?.toLowerCase() || 'male',
          
          // Location & Regional
          country: profile?.country || '',
          state: profile?.state || '',
          city: profile?.city || '',
          timezone: profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: profile?.language || 'en',
          
          // Profile & Appearance
          profilePhoto: profile?.profilePhoto || '',
          bio: profile?.bio || '',
          fitnessLevel: profile?.fitnessLevel?.toLowerCase() || 'intermediate',
          
          // Preferences
          units: profile?.units?.toLowerCase() || 'metric',
          theme: profile?.theme?.toLowerCase() || 'dark',
          
          // Notifications
          emailNotifications: profile?.emailNotifications ?? true,
          pushNotifications: profile?.pushNotifications ?? true,
          workoutReminders: profile?.workoutReminders ?? true,
          nutritionReminders: profile?.nutritionReminders ?? true,
          
          // Privacy
          profileVisibility: profile?.profileVisibility?.toLowerCase() || 'public',
          shareProgress: profile?.shareProgress ?? true,
          shareWorkouts: profile?.shareWorkouts ?? true,
        },
      });
    } catch (error) {
      console.error('Settings get API error:', error);
      res.status(500).json({ error: 'Failed to get settings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
