import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { userService, profileService, activityService } from '../services/database';
import { activityLogger } from '../services/activityLogger';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials, rememberMe?: boolean) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  refreshUserProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  loginWithGitHub: () => Promise<boolean>;
  getSavedCredentials: () => { email: string; password: string } | null;
  clearSavedCredentials: () => void;
  error: string | null;
  clearError: () => void;
  isBackendConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const DatabaseAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(true);

  // Credential management functions (defined early for use in useEffect)
  const getSavedCredentials = (): { email: string; password: string } | null => {
    try {
      const saved = localStorage.getItem('fitlife_saved_credentials');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to retrieve saved credentials:', error);
      return null;
    }
  };

  const clearSavedCredentials = () => {
    try {
      localStorage.removeItem('fitlife_saved_credentials');
    } catch (error) {
      console.error('Failed to clear saved credentials:', error);
    }
  };

  // Password hashing utility (simple for demo - use bcrypt in production)
  const hashPassword = (password: string): string => {
    // In production, use proper password hashing like bcrypt
    return btoa(password); // Simple base64 encoding for demo
  };

  const verifyPassword = (password: string, hashedPassword: string): boolean => {
    // In production, use proper password verification
    return btoa(password) === hashedPassword;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check session storage first (current session)
        const savedUser = sessionStorage.getItem('fitlife_user');
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser);
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          } catch (error) {
            console.error('Failed to parse saved user data:', error);
            sessionStorage.removeItem('fitlife_user');
          }
        }

        // Check for saved credentials (persistent login)
        const savedCredentials = getSavedCredentials();
        if (savedCredentials) {
          try {
            // Attempt auto-login with saved credentials
            const success = await login(savedCredentials, true);
            if (success) {
              return; // Successfully logged in
            }
          } catch (error) {
            console.error('Auto-login failed:', error);
            clearSavedCredentials(); // Clear invalid credentials
          }
        }

        setAuthState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    // Auto-logout on tab close/page unload
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Clear session storage when tab is closed
      const currentUser = authState.user;
      if (currentUser) {
        // Log logout activity
        activityLogger.logLogout(
          currentUser.id,
          currentUser.name,
          currentUser.email
        );
        
        // Clear session data
        sessionStorage.removeItem('fitlife_user');
      }
    };

    const handleVisibilityChange = () => {
      // Additional cleanup when page becomes hidden
      if (document.visibilityState === 'hidden') {
        const currentUser = authState.user;
        if (currentUser) {
          // Save logout timestamp for potential cleanup
          sessionStorage.setItem('fitlife_logout_time', Date.now().toString());
        }
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    initializeAuth();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authState.user]); // Include authState.user in dependency array

  const login = async (credentials: LoginCredentials, rememberMe: boolean = false): Promise<boolean> => {
    setError(null);
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // First try database authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const dbUser = data.user;

        // Convert database user to app user format
        const authenticatedUser: User = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          age: dbUser.profile?.age || 25,
          weight: dbUser.profile?.weight || 70,
          height: dbUser.profile?.height || 170,
          goal: mapGoalFromDB(dbUser.profile?.goal) || 'maintain',
          activityLevel: mapActivityLevelFromDB(dbUser.profile?.activityLevel) || 'moderate',
          role: dbUser.role.toLowerCase() as 'user' | 'admin',
          createdAt: dbUser.createdAt,
          updatedAt: dbUser.updatedAt,
        };

        // Save to session storage
        sessionStorage.setItem('fitlife_user', JSON.stringify(authenticatedUser));
        setAuthState({
          user: authenticatedUser,
          isAuthenticated: true,
          isLoading: false,
        });

        // Save credentials if rememberMe is enabled
        if (rememberMe) {
          saveCredentials(credentials.email, credentials.password);
        } else {
          clearSavedCredentials();
        }

        // Save user to saved users list
        saveUserToList(authenticatedUser.email, authenticatedUser.name, authenticatedUser.role);

        setIsBackendConnected(true);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error('Database login error:', error);
      setError('Login failed. Please try again.');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      setIsBackendConnected(false);
      return false;
    }
  };

      // Convert database user to app user format
      const authenticatedUser: User = {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        age: dbUser.profile?.age || 25,
        weight: dbUser.profile?.weight || 70,
        height: dbUser.profile?.height || 170,
        goal: mapGoalFromDB(dbUser.profile?.goal) || 'maintain',
        activityLevel: mapActivityLevelFromDB(dbUser.profile?.activityLevel) || 'moderate',
        role: dbUser.role.toLowerCase() as 'user' | 'admin',
        createdAt: dbUser.createdAt.toISOString(),
        updatedAt: dbUser.updatedAt.toISOString(),
      };

      // Save to session storage
      sessionStorage.setItem('fitlife_user', JSON.stringify(authenticatedUser));
      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
      });

      // Log successful login
      await activityService.logActivity({
        userId: authenticatedUser.id,
        type: 'AUTH',
        action: 'login_success',
        details: { method: 'email_password' },
      });

      // Save credentials if rememberMe is enabled
      if (rememberMe) {
        saveCredentials(credentials.email, credentials.password);
      } else {
        clearSavedCredentials();
      }

      setIsBackendConnected(true);
      return true;
    } catch (error) {
      console.error('Database login error:', error);
      setError('Login failed. Please try again.');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      setIsBackendConnected(false);
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setError(null);
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Try database registration via API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const newUser = data.user;

        // Convert to app user format
        const authenticatedUser: User = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          age: 25,
          weight: 70,
          height: 170,
          goal: 'maintain',
          activityLevel: 'moderate',
          role: newUser.role.toLowerCase() as 'user' | 'admin',
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        };

        // Save to session storage
        sessionStorage.setItem('fitlife_user', JSON.stringify(authenticatedUser));
        setAuthState({
          user: authenticatedUser,
          isAuthenticated: true,
          isLoading: false,
        });

        // Save user to saved users list
        saveUserToList(authenticatedUser.email, authenticatedUser.name, authenticatedUser.role);

        setIsBackendConnected(true);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error('Database registration error:', error);
      setError('Registration failed. Please try again.');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      setIsBackendConnected(false);
      return false;
    }
  };

  // Helper functions to map database enums to app types
  const mapGoalFromDB = (goal: any): 'lose' | 'maintain' | 'gain' => {
    switch (goal) {
      case 'LOSE_WEIGHT': return 'lose';
      case 'GAIN_WEIGHT': return 'gain';
      default: return 'maintain';
    }
  };

  const mapActivityLevelFromDB = (level: any): 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' => {
    switch (level) {
      case 'SEDENTARY': return 'sedentary';
      case 'LIGHT': return 'light';
      case 'MODERATE': return 'moderate';
      case 'ACTIVE': return 'active';
      case 'VERY_ACTIVE': return 'very-active';
      default: return 'moderate';
    }
  };

  // Continue with other methods...
  const logout = async () => {
    const currentUser = authState.user;

    try {
      if (currentUser) {
        // Log logout activity
        await activityService.logActivity({
          userId: currentUser.id,
          type: 'AUTH',
          action: 'logout',
          details: { method: 'manual' },
        });
      }
    } catch (error) {
      console.warn('Failed to log logout activity:', error);
    } finally {
      sessionStorage.removeItem('fitlife_user');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      setError(null);
    }
  };

  // Placeholder implementations for other methods
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    // TODO: Implement database profile update
    return true;
  };

  const refreshUserProfile = async (): Promise<void> => {
    // TODO: Implement profile refresh from database
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // TODO: Implement password reset
    return true;
  };

  const loginWithGitHub = async (): Promise<boolean> => {
    // TODO: Implement GitHub OAuth with database
    return true;
  };

  const saveCredentials = (email: string, password: string) => {
    try {
      const credentials = { email, password };
      localStorage.setItem('fitlife_saved_credentials', JSON.stringify(credentials));
    } catch (error) {
      console.error('Failed to save credentials:', error);
    }
  };

  const saveUserToList = (email: string, name: string, role: 'user' | 'admin' = 'user') => {
    try {
      const savedUsers = JSON.parse(localStorage.getItem('fitlife_saved_users') || '[]');
      const newUser = {
        email,
        name,
        role,
        lastLogin: new Date().toISOString(),
      };

      // Remove existing user with same email and add new one at the beginning
      const updatedUsers = savedUsers.filter((user: any) => user.email !== email);
      updatedUsers.unshift(newUser);

      // Keep only last 5 users
      const limitedUsers = updatedUsers.slice(0, 5);

      localStorage.setItem('fitlife_saved_users', JSON.stringify(limitedUsers));
    } catch (error) {
      console.error('Failed to save user to list:', error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refreshUserProfile,
    resetPassword,
    loginWithGitHub,
    getSavedCredentials,
    clearSavedCredentials,
    error,
    clearError,
    isBackendConnected,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
