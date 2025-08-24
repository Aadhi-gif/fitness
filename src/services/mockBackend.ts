// Mock backend server for development and testing
import { demoAccountManager } from './demoAccountManager';

interface MockResponse {
  data?: any;
  status: number;
  statusText: string;
  ok: boolean;
}

interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: 'lose' | 'maintain' | 'gain';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  role?: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

class MockBackendServer {
  private users: MockUser[] = [
    {
      id: '1',
      email: 'demo@fitlife.com',
      password: 'demo123',
      name: 'Demo User',
      age: 25,
      weight: 70,
      height: 175,
      goal: 'maintain',
      activityLevel: 'moderate',
      role: 'user',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'admin_1',
      email: 'administrator@fitlife.com',
      password: 'admin123!@#',
      name: 'Administrator',
      age: 30,
      weight: 75,
      height: 180,
      goal: 'maintain',
      activityLevel: 'moderate',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ];

  private tokens: Map<string, { userId: string; expires: number }> = new Map();
  private preferences: Map<string, any> = new Map();

  private generateToken(): string {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  private validateToken(token: string): MockUser | null {
    const tokenData = this.tokens.get(token);
    if (!tokenData || tokenData.expires < Date.now()) {
      this.tokens.delete(token);
      return null;
    }
    return this.users.find(u => u.id === tokenData.userId) || null;
  }

  private delay(ms: number = 100): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async handleRequest(url: string, options: RequestInit = {}): Promise<MockResponse> {
    await this.delay(); // Simulate network delay

    const method = options.method || 'GET';
    const headers = options.headers as Record<string, string> || {};
    const body = options.body ? JSON.parse(options.body as string) : null;
    const authHeader = headers['Authorization'];
    const token = authHeader?.replace('Bearer ', '');

    // Parse URL
    const urlObj = new URL(url, 'https://mock-backend.com');
    const pathname = urlObj.pathname.replace('/api', '');

    console.log(`[MockBackend] ${method} ${pathname}`);

    try {
      // Health check endpoints
      if (pathname === '/health' || pathname === '/status' || pathname === '/ping') {
        return {
          data: { 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            uptime: Math.floor(Math.random() * 86400) // Random uptime in seconds
          },
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      // Base API endpoint
      if (pathname === '' || pathname === '/') {
        return {
          data: { 
            message: 'FitLife Pro API Mock Server',
            version: '1.0.0',
            endpoints: ['/health', '/auth/login', '/auth/profile', '/preferences/food']
          },
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      // Authentication endpoints
      if (pathname === '/auth/login' && method === 'POST') {
        const { email, password } = body;

        // Check demo account availability
        if (demoAccountManager.isDemoEmail(email)) {
          const { allowed, reason } = demoAccountManager.canUseDemoAccount();
          if (!allowed) {
            return {
              data: { message: reason || 'Demo account is no longer available' },
              status: 403,
              statusText: 'Forbidden',
              ok: false
            };
          }
        }

        const user = this.users.find(u => u.email === email && u.password === password);

        if (!user) {
          return {
            data: { message: 'Invalid credentials' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const token = this.generateToken();
        const refreshToken = this.generateToken();
        
        this.tokens.set(token, { userId: user.id, expires: Date.now() + 3600000 }); // 1 hour
        this.tokens.set(refreshToken, { userId: user.id, expires: Date.now() + 86400000 }); // 24 hours

        const { password: _, ...userWithoutPassword } = user;
        
        return {
          data: {
            user: userWithoutPassword,
            token,
            refreshToken
          },
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      if (pathname === '/auth/register' && method === 'POST') {
        const { email, password, name, ...userData } = body;
        
        if (this.users.find(u => u.email === email)) {
          return {
            data: { message: 'Email already exists' },
            status: 409,
            statusText: 'Conflict',
            ok: false
          };
        }

        const newUser: MockUser = {
          id: 'user_' + Date.now(),
          email,
          password,
          name,
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...userData
        };

        this.users.push(newUser);

        const token = this.generateToken();
        const refreshToken = this.generateToken();
        
        this.tokens.set(token, { userId: newUser.id, expires: Date.now() + 3600000 });
        this.tokens.set(refreshToken, { userId: newUser.id, expires: Date.now() + 86400000 });

        const { password: _, ...userWithoutPassword } = newUser;
        
        return {
          data: {
            user: userWithoutPassword,
            token,
            refreshToken
          },
          status: 201,
          statusText: 'Created',
          ok: true
        };
      }

      if (pathname === '/auth/profile' && method === 'GET') {
        if (!token) {
          return {
            data: { message: 'Authorization required' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const user = this.validateToken(token);
        if (!user) {
          return {
            data: { message: 'Invalid or expired token' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const { password: _, ...userWithoutPassword } = user;
        
        return {
          data: userWithoutPassword,
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      if (pathname === '/auth/profile' && method === 'PUT') {
        if (!token) {
          return {
            data: { message: 'Authorization required' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const user = this.validateToken(token);
        if (!user) {
          return {
            data: { message: 'Invalid or expired token' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        // Update user
        Object.assign(user, body, { updatedAt: new Date().toISOString() });
        
        const { password: _, ...userWithoutPassword } = user;
        
        return {
          data: userWithoutPassword,
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      if (pathname === '/auth/logout' && method === 'POST') {
        if (token) {
          this.tokens.delete(token);
        }
        
        return {
          data: { message: 'Logged out successfully' },
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      // Food preferences endpoints
      if (pathname === '/preferences/food' && method === 'GET') {
        if (!token) {
          return {
            data: { message: 'Authorization required' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const user = this.validateToken(token);
        if (!user) {
          return {
            data: { message: 'Invalid or expired token' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const userPreferences = this.preferences.get(user.id) || {
          userId: user.id,
          dietaryRestrictions: [],
          cuisinePreferences: [],
          budgetRange: 'moderate',
          cookingTime: '30-45',
          spiceLevel: 'medium',
          mealComplexity: 'moderate',
          allergies: [],
          dislikedFoods: [],
          preferredProteins: [],
          location: 'global',
          country: '',
          region: '',
          localTastes: [],
          traditionalFoods: true,
          updatedAt: new Date().toISOString()
        };

        return {
          data: userPreferences,
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      if (pathname === '/preferences/food' && method === 'POST') {
        if (!token) {
          return {
            data: { message: 'Authorization required' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const user = this.validateToken(token);
        if (!user) {
          return {
            data: { message: 'Invalid or expired token' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const preferences = {
          userId: user.id,
          ...body,
          updatedAt: new Date().toISOString()
        };

        this.preferences.set(user.id, preferences);

        return {
          data: preferences,
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      // Progress tracking endpoints
      if (pathname === '/progress/stats' && method === 'GET') {
        if (!token) {
          return {
            data: { message: 'Authorization required' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        const user = this.validateToken(token);
        if (!user) {
          return {
            data: { message: 'Invalid or expired token' },
            status: 401,
            statusText: 'Unauthorized',
            ok: false
          };
        }

        return {
          data: {
            totalWorkouts: Math.floor(Math.random() * 50) + 10,
            totalCaloriesBurned: Math.floor(Math.random() * 5000) + 1000,
            averageWorkoutDuration: Math.floor(Math.random() * 60) + 30,
            currentStreak: Math.floor(Math.random() * 14) + 1,
            weeklyProgress: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              workouts: Math.floor(Math.random() * 3),
              calories: Math.floor(Math.random() * 500) + 200
            }))
          },
          status: 200,
          statusText: 'OK',
          ok: true
        };
      }

      // Default 404 response
      return {
        data: { message: 'Endpoint not found' },
        status: 404,
        statusText: 'Not Found',
        ok: false
      };

    } catch (error) {
      console.error('[MockBackend] Error:', error);
      return {
        data: { message: 'Internal server error' },
        status: 500,
        statusText: 'Internal Server Error',
        ok: false
      };
    }
  }
}

export const mockBackend = new MockBackendServer();
export default mockBackend;
