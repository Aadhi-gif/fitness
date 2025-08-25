import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userService, activityService } from '../../src/services/database';

// Simple password verification (use bcrypt in production)
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return btoa(password) === hashedPassword;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user in database
    const user = await userService.findUserByEmail(email);
    
    if (!user || !verifyPassword(password, user.password)) {
      // Log failed login attempt
      await activityService.logActivity({
        userId: 'unknown',
        type: 'AUTH',
        action: 'login_failed',
        details: { email, reason: 'Invalid credentials' },
        ipAddress: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      });

      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Log successful login
    await activityService.logActivity({
      userId: user.id,
      type: 'AUTH',
      action: 'login_success',
      details: { method: 'api_login' },
      ipAddress: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      token: 'jwt-token-placeholder', // Implement JWT in production
    });
  } catch (error) {
    console.error('Login API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
