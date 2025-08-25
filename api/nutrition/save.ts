import type { VercelRequest, VercelResponse } from '@vercel/node';
import { nutritionService } from '../../src/services/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      userId, 
      date, 
      mealType, 
      foodName, 
      calories, 
      protein, 
      carbs, 
      fat,
      fiber,
      sugar,
      sodium,
      quantity,
      unit 
    } = req.body;

    if (!userId || !mealType || !foodName || !calories || !protein || !carbs || !fat) {
      return res.status(400).json({ error: 'Missing required nutrition fields' });
    }

    // Map frontend meal types to database enum
    const mealTypeMap: { [key: string]: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' } = {
      'breakfast': 'BREAKFAST',
      'lunch': 'LUNCH',
      'dinner': 'DINNER',
      'snack': 'SNACK',
    };

    const dbMealType = mealTypeMap[mealType.toLowerCase()];
    if (!dbMealType) {
      return res.status(400).json({ error: 'Invalid meal type' });
    }

    // Save nutrition entry to database
    const nutritionEntry = await nutritionService.addNutritionEntry({
      userId,
      date: date ? new Date(date) : new Date(),
      mealType: dbMealType,
      foodName,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fat: parseFloat(fat),
      fiber: fiber ? parseFloat(fiber) : undefined,
      sugar: sugar ? parseFloat(sugar) : undefined,
      sodium: sodium ? parseFloat(sodium) : undefined,
      quantity: quantity ? parseFloat(quantity) : 1,
      unit: unit || 'serving',
    });

    res.status(201).json({
      success: true,
      nutritionEntry,
      message: 'Nutrition data saved successfully',
    });
  } catch (error) {
    console.error('Nutrition save API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
