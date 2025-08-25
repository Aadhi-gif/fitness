import type { VercelRequest, VercelResponse } from '@vercel/node';
import { goalService } from '../../src/services/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      userId, 
      title, 
      description, 
      category, 
      targetValue, 
      currentValue, 
      unit, 
      targetDate 
    } = req.body;

    if (!userId || !title || !category) {
      return res.status(400).json({ error: 'Missing required goal fields' });
    }

    // Map frontend categories to database enum
    const categoryMap: { [key: string]: 'WEIGHT_LOSS' | 'WEIGHT_GAIN' | 'MUSCLE_BUILDING' | 'STRENGTH' | 'ENDURANCE' | 'FLEXIBILITY' | 'NUTRITION' | 'HABIT' } = {
      'weight_loss': 'WEIGHT_LOSS',
      'weight_gain': 'WEIGHT_GAIN',
      'muscle_building': 'MUSCLE_BUILDING',
      'strength': 'STRENGTH',
      'endurance': 'ENDURANCE',
      'flexibility': 'FLEXIBILITY',
      'nutrition': 'NUTRITION',
      'habit': 'HABIT',
    };

    const dbCategory = categoryMap[category.toLowerCase()];
    if (!dbCategory) {
      return res.status(400).json({ error: 'Invalid goal category' });
    }

    // Save goal to database
    const goal = await goalService.createGoal({
      userId,
      title,
      description,
      category: dbCategory,
      targetValue: targetValue ? parseFloat(targetValue) : undefined,
      currentValue: currentValue ? parseFloat(currentValue) : undefined,
      unit,
      targetDate: targetDate ? new Date(targetDate) : undefined,
    });

    res.status(201).json({
      success: true,
      goal,
      message: 'Goal saved successfully',
    });
  } catch (error) {
    console.error('Goal save API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
