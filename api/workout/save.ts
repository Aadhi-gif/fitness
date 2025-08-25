import type { VercelRequest, VercelResponse } from '@vercel/node';
import { workoutService } from '../../src/services/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, name, exercises, duration, caloriesBurned, notes } = req.body;

    if (!userId || !name || !exercises || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save workout to database
    const workout = await workoutService.createWorkoutSession({
      userId,
      name,
      exercises,
      duration,
      caloriesBurned,
      notes,
    });

    res.status(201).json({
      success: true,
      workout,
      message: 'Workout saved successfully',
    });
  } catch (error) {
    console.error('Workout save API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
