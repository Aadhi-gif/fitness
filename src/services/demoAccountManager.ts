// Demo Account Manager - Controls first-time use of demo account
interface DemoAccountUsage {
  email: string;
  firstUsed: string;
  sessionId: string;
  usageCount: number;
  lastUsed: string;
  isExpired: boolean;
}

class DemoAccountManager {
  private static instance: DemoAccountManager;
  private readonly DEMO_EMAIL = 'demo@fitlife.com';
  private readonly STORAGE_KEY = 'fitlife_demo_usage';
  private readonly SESSION_KEY = 'fitlife_session_id';
  
  private constructor() {}

  public static getInstance(): DemoAccountManager {
    if (!DemoAccountManager.instance) {
      DemoAccountManager.instance = new DemoAccountManager();
    }
    return DemoAccountManager.instance;
  }

  /**
   * Generate a unique session ID for tracking
   */
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  /**
   * Get current session ID or create new one
   */
  private getCurrentSessionId(): string {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  /**
   * Get demo account usage data
   */
  private getDemoUsage(): DemoAccountUsage | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  /**
   * Save demo account usage data
   */
  private saveDemoUsage(usage: DemoAccountUsage): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usage));
  }

  /**
   * Check if demo account can be used
   */
  public canUseDemoAccount(): { allowed: boolean; reason?: string; isFirstTime?: boolean } {
    const currentSessionId = this.getCurrentSessionId();
    const usage = this.getDemoUsage();

    // First time user - allow demo
    if (!usage) {
      return { allowed: true, isFirstTime: true };
    }

    // Same session - allow continued use
    if (usage.sessionId === currentSessionId && !usage.isExpired) {
      return { allowed: true, isFirstTime: false };
    }

    // Different session - demo already used
    if (usage.sessionId !== currentSessionId) {
      return { 
        allowed: false, 
        reason: 'Demo account has already been used. Please create your own account to continue.',
        isFirstTime: false
      };
    }

    // Session expired
    if (usage.isExpired) {
      return { 
        allowed: false, 
        reason: 'Demo session has expired. Please create your own account to continue.',
        isFirstTime: false
      };
    }

    return { allowed: false, reason: 'Demo account is no longer available.' };
  }

  /**
   * Record demo account usage
   */
  public recordDemoUsage(): void {
    const currentSessionId = this.getCurrentSessionId();
    const now = new Date().toISOString();
    const existing = this.getDemoUsage();

    if (existing && existing.sessionId === currentSessionId) {
      // Update existing usage
      existing.usageCount += 1;
      existing.lastUsed = now;
      this.saveDemoUsage(existing);
    } else {
      // Create new usage record
      const usage: DemoAccountUsage = {
        email: this.DEMO_EMAIL,
        firstUsed: now,
        sessionId: currentSessionId,
        usageCount: 1,
        lastUsed: now,
        isExpired: false
      };
      this.saveDemoUsage(usage);
    }
  }

  /**
   * Expire demo account (called on logout or session end)
   */
  public expireDemoAccount(): void {
    const usage = this.getDemoUsage();
    if (usage) {
      usage.isExpired = true;
      usage.lastUsed = new Date().toISOString();
      this.saveDemoUsage(usage);
    }
  }

  /**
   * Check if email is demo email
   */
  public isDemoEmail(email: string): boolean {
    return email.toLowerCase() === this.DEMO_EMAIL.toLowerCase();
  }

  /**
   * Get demo account status for display
   */
  public getDemoStatus(): {
    hasBeenUsed: boolean;
    isCurrentlyActive: boolean;
    firstUsed?: string;
    usageCount?: number;
    sessionId?: string;
  } {
    const usage = this.getDemoUsage();
    const currentSessionId = this.getCurrentSessionId();

    if (!usage) {
      return { hasBeenUsed: false, isCurrentlyActive: false };
    }

    return {
      hasBeenUsed: true,
      isCurrentlyActive: usage.sessionId === currentSessionId && !usage.isExpired,
      firstUsed: usage.firstUsed,
      usageCount: usage.usageCount,
      sessionId: usage.sessionId
    };
  }

  /**
   * Reset demo account (for development/testing only)
   */
  public resetDemoAccount(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.SESSION_KEY);
    console.log('[DemoManager] Demo account reset - available for first-time use again');
  }

  /**
   * Get demo account info for new users
   */
  public getDemoAccountInfo(): {
    email: string;
    password: string;
    isAvailable: boolean;
    message: string;
  } {
    const { allowed, reason, isFirstTime } = this.canUseDemoAccount();
    
    return {
      email: this.DEMO_EMAIL,
      password: 'demo123',
      isAvailable: allowed,
      message: allowed 
        ? (isFirstTime ? 'Try our demo account (first-time use)' : 'Continue with demo account')
        : reason || 'Demo account not available'
    };
  }

  /**
   * Show demo expiration warning
   */
  public shouldShowExpirationWarning(): boolean {
    const usage = this.getDemoUsage();
    const currentSessionId = this.getCurrentSessionId();
    
    if (!usage || usage.sessionId !== currentSessionId) {
      return false;
    }

    // Show warning after 5 minutes of usage or 3+ logins
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    return usage.usageCount >= 3 || usage.firstUsed < fiveMinutesAgo;
  }

  /**
   * Get time until demo expires (for display)
   */
  public getTimeUntilExpiration(): string | null {
    const usage = this.getDemoUsage();
    const currentSessionId = this.getCurrentSessionId();
    
    if (!usage || usage.sessionId !== currentSessionId || usage.isExpired) {
      return null;
    }

    // Demo expires after 30 minutes or when session ends
    const expirationTime = new Date(usage.firstUsed).getTime() + (30 * 60 * 1000);
    const now = Date.now();
    
    if (now >= expirationTime) {
      this.expireDemoAccount();
      return null;
    }

    const remainingMs = expirationTime - now;
    const remainingMinutes = Math.floor(remainingMs / (60 * 1000));
    
    if (remainingMinutes <= 0) {
      return 'Expires soon';
    } else if (remainingMinutes === 1) {
      return '1 minute remaining';
    } else {
      return `${remainingMinutes} minutes remaining`;
    }
  }
}

// Export singleton instance
export const demoAccountManager = DemoAccountManager.getInstance();
export default demoAccountManager;
