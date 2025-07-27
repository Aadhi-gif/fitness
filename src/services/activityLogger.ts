// Activity logging service for admin monitoring
interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  sessionId: string;
  metadata?: any;
}

interface LoginRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  loginTime: string;
  logoutTime?: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  success: boolean;
  failureReason?: string;
  sessionDuration?: number;
}

class ActivityLogger {
  private static instance: ActivityLogger;
  private sessionId: string;
  private ipAddress: string;
  private userAgent: string;
  private location: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.ipAddress = this.getClientIP();
    this.userAgent = navigator.userAgent;
    this.location = this.getLocation();
  }

  public static getInstance(): ActivityLogger {
    if (!ActivityLogger.instance) {
      ActivityLogger.instance = new ActivityLogger();
    }
    return ActivityLogger.instance;
  }

  private generateSessionId(): string {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  private getClientIP(): string {
    // In a real application, you would get this from the server
    // For demo purposes, we'll use a mock IP
    return '192.168.1.' + Math.floor(Math.random() * 255);
  }

  private getLocation(): string {
    // In a real application, you would use geolocation API or IP-based location
    const locations = [
      'New York, USA',
      'Los Angeles, USA',
      'London, UK',
      'Tokyo, Japan',
      'Sydney, Australia',
      'Mumbai, India',
      'Berlin, Germany',
      'Toronto, Canada'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  }

  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
  }

  public logActivity(
    userId: string,
    userName: string,
    userEmail: string,
    action: string,
    details: string,
    metadata?: any
  ): void {
    const activity: UserActivity = {
      id: 'act_' + Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      userEmail,
      action,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      location: this.location,
      sessionId: this.sessionId,
      metadata
    };

    this.storeActivity(activity);
    this.updateUserStats(action);
  }

  public logLogin(
    userId: string,
    userName: string,
    userEmail: string,
    success: boolean,
    failureReason?: string
  ): void {
    const loginRecord: LoginRecord = {
      id: 'login_' + Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      userEmail,
      loginTime: new Date().toISOString(),
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      location: this.location,
      deviceType: this.getDeviceType(),
      browser: this.getBrowser(),
      success,
      failureReason
    };

    this.storeLoginRecord(loginRecord);
    this.updateLoginStats(success);

    // Also log as activity
    this.logActivity(
      userId,
      userName,
      userEmail,
      success ? 'LOGIN' : 'LOGIN_FAILED',
      success ? 'User logged in successfully' : `Login failed: ${failureReason}`,
      { deviceType: loginRecord.deviceType, browser: loginRecord.browser }
    );
  }

  public logLogout(userId: string, userName: string, userEmail: string): void {
    // Update the login record with logout time
    const loginRecords = this.getLoginRecords();
    const activeLogin = loginRecords.find(
      record => record.userId === userId && !record.logoutTime
    );

    if (activeLogin) {
      activeLogin.logoutTime = new Date().toISOString();
      activeLogin.sessionDuration = Math.floor(
        (new Date().getTime() - new Date(activeLogin.loginTime).getTime()) / 1000
      );
      this.storeLoginRecords(loginRecords);
    }

    // Log as activity
    this.logActivity(
      userId,
      userName,
      userEmail,
      'LOGOUT',
      'User logged out',
      { sessionDuration: activeLogin?.sessionDuration }
    );
  }

  public logProfileUpdate(userId: string, userName: string, userEmail: string, changes: any): void {
    this.logActivity(
      userId,
      userName,
      userEmail,
      'PROFILE_UPDATED',
      `Profile updated: ${Object.keys(changes).join(', ')}`,
      changes
    );
  }

  public logFoodPreferencesUpdate(
    userId: string,
    userName: string,
    userEmail: string,
    preferences: any
  ): void {
    this.logActivity(
      userId,
      userName,
      userEmail,
      'FOOD_PREFERENCES_UPDATED',
      `Food preferences updated: ${preferences.country || 'Global'} cuisine`,
      preferences
    );
  }

  public logWorkout(
    userId: string,
    userName: string,
    userEmail: string,
    workoutType: string,
    duration: number
  ): void {
    this.logActivity(
      userId,
      userName,
      userEmail,
      'WORKOUT_LOGGED',
      `Completed ${workoutType} workout (${duration} minutes)`,
      { workoutType, duration }
    );
  }

  public logError(
    userId: string,
    userName: string,
    userEmail: string,
    error: string,
    context?: any
  ): void {
    this.logActivity(
      userId,
      userName,
      userEmail,
      'ERROR',
      `Error occurred: ${error}`,
      { error, context }
    );
  }

  private storeActivity(activity: UserActivity): void {
    const activities = this.getActivities();
    activities.unshift(activity); // Add to beginning
    
    // Keep only last 1000 activities
    if (activities.length > 1000) {
      activities.splice(1000);
    }
    
    localStorage.setItem('admin_user_activities', JSON.stringify(activities));
  }

  private storeLoginRecord(loginRecord: LoginRecord): void {
    const loginRecords = this.getLoginRecords();
    loginRecords.unshift(loginRecord); // Add to beginning
    
    // Keep only last 500 login records
    if (loginRecords.length > 500) {
      loginRecords.splice(500);
    }
    
    localStorage.setItem('admin_login_records', JSON.stringify(loginRecords));
  }

  private storeLoginRecords(loginRecords: LoginRecord[]): void {
    localStorage.setItem('admin_login_records', JSON.stringify(loginRecords));
  }

  private getActivities(): UserActivity[] {
    const stored = localStorage.getItem('admin_user_activities');
    return stored ? JSON.parse(stored) : [];
  }

  private getLoginRecords(): LoginRecord[] {
    const stored = localStorage.getItem('admin_login_records');
    return stored ? JSON.parse(stored) : [];
  }

  private updateUserStats(action: string): void {
    const stats = this.getUserStats();
    
    // Update stats based on action
    if (action === 'LOGIN') {
      stats.totalLogins++;
    }
    
    localStorage.setItem('admin_user_stats', JSON.stringify(stats));
  }

  private updateLoginStats(success: boolean): void {
    const stats = this.getUserStats();
    
    if (success) {
      stats.totalLogins++;
    } else {
      stats.failedLogins++;
    }
    
    localStorage.setItem('admin_user_stats', JSON.stringify(stats));
  }

  private getUserStats(): any {
    const stored = localStorage.getItem('admin_user_stats');
    return stored ? JSON.parse(stored) : {
      totalUsers: 0,
      activeUsers: 0,
      newUsersToday: 0,
      totalLogins: 0,
      failedLogins: 0,
      averageSessionDuration: 0
    };
  }

  // Public methods for admin dashboard
  public getRecentActivities(limit: number = 50): UserActivity[] {
    return this.getActivities().slice(0, limit);
  }

  public getRecentLogins(limit: number = 50): LoginRecord[] {
    return this.getLoginRecords().slice(0, limit);
  }

  public getStats(): any {
    return this.getUserStats();
  }

  public clearLogs(): void {
    localStorage.removeItem('admin_user_activities');
    localStorage.removeItem('admin_login_records');
    localStorage.removeItem('admin_user_stats');
  }
}

// Export singleton instance
export const activityLogger = ActivityLogger.getInstance();
export default activityLogger;
