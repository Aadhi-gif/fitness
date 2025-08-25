import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userService, activityService } from '../../src/services/database';

// Simple password hashing (use bcrypt in production)
const hashPassword = (password: string): string => {
  return btoa(password); // Simple base64 encoding for demo
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const hashedPassword = hashPassword(password);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
      name,
      role: 'USER',
    });

    // Log successful registration
    await activityService.logActivity({
      userId: newUser.id,
      type: 'AUTH',
      action: 'register_success',
      details: { method: 'api_register' },
      ipAddress: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      token: 'jwt-token-placeholder', // Implement JWT in production
    });
  } catch (error) {
    console.error('Registration API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
