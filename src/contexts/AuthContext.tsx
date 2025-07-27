import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authAPI, tokenManager, handleAPIError } from '../services/api';
import { activityLogger } from '../services/activityLogger';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  refreshUserProfile: () => Promise<void>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState(true); // Start optimistic

  // Mock user database (fallback when backend is not available)
  const mockUsers = [
    {
      id: '1',
      email: 'demo@fitlife.com',
      password: 'demo123',
      name: 'Demo User',
      age: 25,
      weight: 70,
      height: 175,
      goal: 'maintain' as const,
      activityLevel: 'moderate' as const,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      role: 'user' as const
    },
    {
      id: 'admin_1',
      email: 'administrator@fitlife.com',
      password: 'admin123!@#',
      name: 'Administrator',
      age: 30,
      weight: 75,
      height: 180,
      goal: 'maintain' as const,
      activityLevel: 'moderate' as const,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      role: 'admin' as const
    }
  ];

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if backend is available and user has valid token
        if (tokenManager.isAuthenticated()) {
          try {
            const user = await authAPI.getProfile();
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
            setIsBackendConnected(true);
            return;
          } catch (error) {
            console.warn('Backend not available, falling back to local storage');
            setIsBackendConnected(false);
            tokenManager.clearTokens(); // Clear invalid tokens
          }
        }

        // Fallback to local storage
        const savedUser = localStorage.getItem('fitlife_user');
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser);
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error('Failed to parse saved user data:', error);
            localStorage.removeItem('fitlife_user');
            setAuthState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setError(null);
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Try backend authentication first
      if (isBackendConnected || !localStorage.getItem('backend_unavailable')) {
        try {
          const response = await authAPI.login(credentials.email, credentials.password);
          tokenManager.setTokens(response.token, response.refreshToken);

          setAuthState({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });

          // Log successful login
          activityLogger.logLogin(
            response.user.id,
            response.user.name,
            response.user.email,
            true
          );

          setIsBackendConnected(true);
          localStorage.removeItem('backend_unavailable');
          return true;
        } catch (error) {
          console.warn('Backend login failed, falling back to mock authentication');
          setIsBackendConnected(false);
          localStorage.setItem('backend_unavailable', 'true');
        }
      }

      // Fallback to mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        // Log failed login attempt
        activityLogger.logLogin(
          'unknown',
          'Unknown',
          credentials.email,
          false,
          'Invalid email or password'
        );
        setError('Invalid email or password');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      const authenticatedUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age,
        weight: user.weight,
        height: user.height,
        goal: user.goal,
        activityLevel: user.activityLevel,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      localStorage.setItem('fitlife_user', JSON.stringify(authenticatedUser));
      setAuthState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false,
      });

      // Log successful login
      activityLogger.logLogin(
        authenticatedUser.id,
        authenticatedUser.name,
        authenticatedUser.email,
        true
      );

      return true;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setError(null);
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      // Validate passwords match
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === credentials.email);
      if (existingUser) {
        setError('An account with this email already exists');
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        createdAt: new Date(),
      };

      // In a real app, you'd save to backend here
      mockUsers.push({
        ...newUser,
        password: credentials.password,
      });

      localStorage.setItem('fitlife_user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = async () => {
    const currentUser = authState.user;

    try {
      if (isBackendConnected && tokenManager.getToken()) {
        await authAPI.logout();
      }
    } catch (error) {
      console.warn('Backend logout failed:', error);
    } finally {
      // Log logout before clearing user data
      if (currentUser) {
        activityLogger.logLogout(
          currentUser.id,
          currentUser.name,
          currentUser.email
        );
      }

      tokenManager.clearTokens();
      localStorage.removeItem('fitlife_user');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      setError(null);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setError(null);

    try {
      if (isBackendConnected && tokenManager.getToken()) {
        const updatedUser = await authAPI.updateProfile(userData);
        setAuthState(prev => ({
          ...prev,
          user: updatedUser
        }));

        // Log profile update
        activityLogger.logProfileUpdate(
          updatedUser.id,
          updatedUser.name,
          updatedUser.email,
          userData
        );

        return true;
      } else {
        // Fallback to local storage update
        const currentUser = authState.user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData, updatedAt: new Date().toISOString() };
          localStorage.setItem('fitlife_user', JSON.stringify(updatedUser));
          setAuthState(prev => ({
            ...prev,
            user: updatedUser
          }));

          // Log profile update
          activityLogger.logProfileUpdate(
            updatedUser.id,
            updatedUser.name,
            updatedUser.email,
            userData
          );

          return true;
        }
        return false;
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      return false;
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    try {
      if (isBackendConnected && tokenManager.getToken()) {
        const user = await authAPI.getProfile();
        setAuthState(prev => ({
          ...prev,
          user
        }));
      }
    } catch (error) {
      console.warn('Failed to refresh user profile:', error);
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
    error,
    clearError,
    isBackendConnected,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};