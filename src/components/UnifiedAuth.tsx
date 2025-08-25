import React, { useState, useEffect } from 'react';
import {
  Mail, Lock, Eye, EyeOff, User, Dumbbell,
  Heart, Zap, Target, ArrowRight, Sparkles, Trophy,
  Flame, Medal, Crown, Sword, Shield, Info
} from 'lucide-react';
import { useAuth } from '../contexts/DatabaseAuthContext';
import DemoAccountStatus from './DemoAccountStatus';
import SavedUsersManager from './SavedUsersManager';

const UnifiedAuth: React.FC = () => {
  const { login, register, resetPassword, loginWithGitHub, getSavedCredentials, error, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Auto-fill saved credentials on component mount
  useEffect(() => {
    const savedCredentials = getSavedCredentials();
    if (savedCredentials && isLogin) {
      setFormData(prev => ({
        ...prev,
        email: savedCredentials.email,
        password: savedCredentials.password
      }));
      setRememberMe(true);
    }
  }, [isLogin, getSavedCredentials]);

  // Elite male athlete-inspired background images and motivational content
  const backgroundImages = [
    {
      url: 'https://images.unsplash.com/photo-1583500178690-f7d24c6d17b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'DOMINATE THE IRON',
      description: 'Forge strength like champions',
      icon: Dumbbell,
      stats: '95% of elite athletes train with weights',
      quote: '"Champions are made in the gym when nobody is watching"'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'CARDIO WARRIOR',
      description: 'Unleash unstoppable endurance',
      icon: Lightning,
      stats: 'Elite athletes: 40-60 VO2 max',
      quote: '"Pain is temporary, quitting lasts forever"'
    },
    {
      url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'COMBAT READY',
      description: 'Train like a gladiator',
      icon: Sword,
      stats: 'MMA fighters train 6+ hours daily',
      quote: '"I fear not the man who has practiced 10,000 kicks once"'
    },
    {
      url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'OUTDOOR BEAST',
      description: 'Conquer nature\'s challenges',
      icon: Shield,
      stats: 'Navy SEALs train in all environments',
      quote: '"The only easy day was yesterday"'
    },
    {
      url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'FUEL THE MACHINE',
      description: 'Elite nutrition protocols',
      icon: Flame,
      stats: 'Pro athletes: 3000-6000 calories/day',
      quote: '"Abs are made in the kitchen, legends in the mind"'
    }
  ];

  // Dynamic motivational quotes that rotate
  const motivationalQuotes = [
    "Champions train when they don't feel like it",
    "Your only competition is who you were yesterday",
    "Pain is weakness leaving the body",
    "Discipline is choosing between what you want now and what you want most",
    "The body achieves what the mind believes"
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  // Rotate background images and quotes
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return { isValid: errors.length === 0, errors };
  };

  const handleGitHubLogin = async () => {
    const success = await loginWithGitHub();
    if (success) {
      console.log('GitHub login successful');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = await login({ email: formData.email, password: formData.password }, rememberMe);
      if (success) {
        // Login successful, user will be redirected by App.tsx
        console.log('Login successful');
      }
    } else {
      // Registration validation
      if (!formData.name.trim()) {
        alert('Please enter your full name');
        return;
      }

      if (!formData.email.trim()) {
        alert('Please enter your email address');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        alert('Password requirements:\n' + passwordValidation.errors.join('\n'));
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (success) {
        // Registration successful, user will be redirected by App.tsx
        console.log('Registration successful');
      }
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setShowForgotPassword(false);
    setResetEmailSent(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    const success = await resetPassword(resetEmail);
    if (success) {
      setResetEmailSent(true);
    }
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetEmailSent(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with Overlay */}
      <div className="absolute inset-0">
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBg ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${bg.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-red-900/60 to-orange-900/70" />

        {/* Animated Energy Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-pulse"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Floating Achievement Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[Trophy, Medal, Crown, Target, Lightning].map((Icon, i) => (
            <Icon
              key={i}
              className="absolute text-white/10 animate-bounce"
              size={24 + Math.random() * 16}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Elite Athlete Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
          <div className="max-w-lg">
            {/* Elite Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl">
                  <Dumbbell className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                  <Crown className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  FITLIFE
                </h1>
                <p className="text-orange-300 font-bold text-lg tracking-wider">ELITE EDITION</p>
              </div>
            </div>

            {/* Dynamic Training Focus */}
            <div className="mb-8 p-6 bg-gradient-to-r from-black/40 to-red-900/40 backdrop-blur-sm rounded-2xl border border-orange-500/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(backgroundImages[currentBg].icon, {
                  className: "w-6 h-6 text-orange-400"
                })}
                <h3 className="text-2xl font-black text-white tracking-wide">
                  {backgroundImages[currentBg].title}
                </h3>
              </div>
              <p className="text-orange-200 font-semibold mb-3">
                {backgroundImages[currentBg].description}
              </p>
              <div className="text-sm text-gray-300 mb-2">
                <span className="text-orange-400 font-bold">ELITE STAT:</span> {backgroundImages[currentBg].stats}
              </div>
              <div className="text-sm italic text-yellow-300 border-l-2 border-orange-500 pl-3">
                {backgroundImages[currentBg].quote}
              </div>
            </div>

            {/* Rotating Motivational Quote */}
            <div className="mb-8 p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-xl border border-orange-400/30">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 font-bold text-sm">DAILY MOTIVATION</span>
              </div>
              <p className="text-white font-semibold text-lg">
                "{motivationalQuotes[currentQuote]}"
              </p>
            </div>

            {/* Elite Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-red-500/30">
                <div className="p-2 bg-red-500/30 rounded-lg">
                  <Target className="w-6 h-6 text-red-300" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white">PRECISION TARGETING</span>
                  <p className="text-sm text-gray-300">Elite athlete protocols</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl border border-orange-500/30">
                <div className="p-2 bg-orange-500/30 rounded-lg">
                  <Heart className="w-6 h-6 text-orange-300" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white">CHAMPION NUTRITION</span>
                  <p className="text-sm text-gray-300">Pro-level meal planning</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-yellow-600/20 to-red-600/20 rounded-xl border border-yellow-500/30">
                <div className="p-2 bg-yellow-500/30 rounded-lg">
                  <Lightning className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white">PERFORMANCE ANALYTICS</span>
                  <p className="text-sm text-gray-300">Real-time optimization</p>
                </div>
              </div>
            </div>

            {/* Training Mode Indicators */}
            <div className="flex gap-3 mt-8">
              {backgroundImages.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBg(index)}
                  className={`group relative transition-all duration-300 ${
                    index === currentBg
                      ? 'scale-125'
                      : 'hover:scale-110'
                  }`}
                  title={bg.title}
                >
                  <div className={`w-4 h-4 rounded-full transition-all ${
                    index === currentBg
                      ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-lg shadow-orange-500/50'
                      : 'bg-white/40 hover:bg-white/60'
                  }`} />
                  {index === currentBg && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 animate-ping opacity-75" />
                  )}
                </button>
              ))}
            </div>

            {/* Achievement Badge */}
            <div className="mt-8 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-yellow-300 font-bold">ELITE STATUS</p>
                  <p className="text-sm text-gray-300">Join the top 1% of athletes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Elite Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl space-y-6">
            {/* Saved Users Manager (Login Only) */}
            {isLogin && (
              <div className="mb-6">
                <SavedUsersManager />
              </div>
            )}

            {/* Elite Form Container */}
            <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-orange-500/30">
              {/* Elite Form Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4 lg:hidden">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 p-1 bg-yellow-500 rounded-full">
                      <Crown className="w-3 h-3 text-yellow-900" />
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {isLogin ? 'WELCOME BACK, CHAMPION!' : 'JOIN THE ELITE'}
                </h2>
                <p className="text-orange-300 font-semibold">
                  {isLogin
                    ? 'Continue dominating your goals'
                    : 'Begin your legendary transformation'
                  }
                </p>
                <div className="mt-4 p-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl border border-orange-500/30">
                  <p className="text-yellow-300 text-sm font-bold">
                    🏆 ELITE ATHLETE EDITION
                  </p>
                </div>
              </div>

              {/* Demo Account Status */}
              <DemoAccountStatus showInLogin={true} className="mb-6" />

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300 text-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {error}
                  </div>
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field (Register Only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-bold text-orange-300 mb-2">
                      CHAMPION NAME
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-orange-500/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all bg-black/50 text-white placeholder-gray-400 backdrop-blur-sm"
                        placeholder="Enter your champion name"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-bold text-orange-300 mb-2">
                    ELITE EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-orange-500/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all bg-black/50 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Enter your elite email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-bold text-orange-300 mb-2">
                    ELITE PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-orange-500/50 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all bg-black/50 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Enter your elite password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Forgot Password Link (Login Only) */}
                  {isLogin && (
                    <div className="text-right mt-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </div>

                {/* Elite Password Strength Indicator (Register Only) */}
                {!isLogin && formData.password && (
                  <div className="space-y-3 p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl border border-orange-500/30">
                    <div className="text-sm text-orange-300 font-bold flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      ELITE PASSWORD REQUIREMENTS:
                    </div>
                    <div className="space-y-2">
                      <div className={`text-xs flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${formData.password.length >= 8 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}`} />
                        <span className="font-semibold">At least 8 characters</span>
                      </div>
                      <div className={`text-xs flex items-center gap-2 ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${/(?=.*[a-z])/.test(formData.password) ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}`} />
                        <span className="font-semibold">One lowercase letter</span>
                      </div>
                      <div className={`text-xs flex items-center gap-2 ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${/(?=.*[A-Z])/.test(formData.password) ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}`} />
                        <span className="font-semibold">One uppercase letter</span>
                      </div>
                      <div className={`text-xs flex items-center gap-2 ${/(?=.*\d)/.test(formData.password) ? 'text-green-400' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${/(?=.*\d)/.test(formData.password) ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}`} />
                        <span className="font-semibold">One number</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirm Elite Password (Register Only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-bold text-orange-300 mb-2">
                      CONFIRM ELITE PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all bg-black/50 text-white placeholder-gray-400 backdrop-blur-sm ${
                          formData.confirmPassword && formData.password !== formData.confirmPassword
                            ? 'border-red-500/70'
                            : 'border-orange-500/50'
                        }`}
                        placeholder="Confirm your elite password"
                        required={!isLogin}
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Elite passwords must match
                      </p>
                    )}
                  </div>
                )}

                {/* Remember Me Checkbox (Login only) */}
                {isLogin && (
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-black/50 border-orange-500/50 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <label htmlFor="rememberMe" className="text-gray-300 text-sm cursor-pointer">
                      Remember my credentials for easy access
                    </label>
                  </div>
                )}

                {/* GitHub Login Button (Login only) */}
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleGitHubLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 border border-gray-600/50 mb-4"
                  >
                    <User className="w-5 h-5" />
                    Continue with GitHub
                  </button>
                )}

                {/* Divider */}
                {isLogin && (
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                  </div>
                )}

                {/* Elite Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-black text-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 border border-orange-500/30"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Trophy className="w-5 h-5" />
                      {isLogin ? 'ENTER THE ARENA' : 'JOIN THE ELITE'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Auto-Logout Notice */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 font-semibold text-sm">Security Notice</span>
                </div>
                <p className="text-gray-300 text-xs">
                  For your security, you'll be automatically logged out when you close this browser tab.
                  Your session data will not persist between browser sessions.
                </p>
              </div>

              {/* Switch Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-300">
                  {isLogin ? "New to the elite ranks?" : "Already a champion?"}
                </p>
                <button
                  onClick={switchMode}
                  className="mt-2 text-orange-400 hover:text-orange-300 font-bold transition-colors flex items-center gap-2 mx-auto"
                >
                  <Medal className="w-4 h-4" />
                  {isLogin ? 'JOIN THE ELITE' : 'RETURN TO ARENA'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl inline-block mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h3>
              <p className="text-gray-600">
                {resetEmailSent
                  ? "Check your email for reset instructions"
                  : "Enter your email to receive reset instructions"
                }
              </p>
            </div>

            {error && showForgotPassword && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!resetEmailSent ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeForgotPassword}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-700 text-sm">
                    Password reset instructions have been sent to <strong>{resetEmail}</strong>
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </p>
                <button
                  onClick={closeForgotPassword}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedAuth;
