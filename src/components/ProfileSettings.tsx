import React, { useState, useRef, useEffect } from 'react';
import { 
  Settings, User, Phone, MapPin, Camera, Mail, Calendar, 
  Shield, Bell, Globe, Palette, Save, Upload, X, Check,
  Flag, Clock, Languages, Heart, Target
} from 'lucide-react';
import { useAuth } from '../contexts/DatabaseAuthContext';

interface UserSettings {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  
  // Location & Regional
  country: string;
  state: string;
  city: string;
  timezone: string;
  language: string;
  
  // Profile & Appearance
  profilePhoto: string;
  bio: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  
  // Preferences
  units: 'metric' | 'imperial';
  theme: 'light' | 'dark' | 'auto';
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  workoutReminders: boolean;
  nutritionReminders: boolean;
  
  // Privacy
  profileVisibility: 'public' | 'friends' | 'private';
  shareProgress: boolean;
  shareWorkouts: boolean;
}

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [successMessage, setSuccessMessage] = useState('');

  const [settings, setSettings] = useState<UserSettings>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    country: '',
    state: '',
    city: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'en',
    profilePhoto: '',
    bio: '',
    fitnessLevel: 'intermediate',
    units: 'metric',
    theme: 'dark',
    emailNotifications: true,
    pushNotifications: true,
    workoutReminders: true,
    nutritionReminders: true,
    profileVisibility: 'public',
    shareProgress: true,
    shareWorkouts: true,
  });

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
    'India', 'Japan', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria',
    'Belgium', 'Portugal', 'Ireland', 'New Zealand', 'South Korea', 'Singapore'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' },
  ];

  // Load user settings on component mount
  useEffect(() => {
    const loadUserSettings = async () => {
      if (!user?.id) return;

      setIsLoadingSettings(true);
      try {
        const response = await fetch(`/api/user/settings?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (error) {
        console.error('Failed to load user settings:', error);
      } finally {
        setIsLoadingSettings(false);
      }
    };

    loadUserSettings();
  }, [user?.id]);

  const handleInputChange = (field: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('profilePhoto', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    if (!user?.id) {
      setSuccessMessage('❌ Please log in to save settings');
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...settings,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('✅ Settings saved successfully!');
        console.log('Settings saved:', data);
      } else {
        const errorData = await response.json();
        setSuccessMessage(`❌ Failed to save: ${errorData.error}`);
      }

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSuccessMessage('❌ Network error. Please try again.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const renderPersonalTab = () => (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
            {settings.profilePhoto ? (
              <img src={settings.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
        <div>
          <h3 className="text-white font-semibold">Profile Photo</h3>
          <p className="text-gray-400 text-sm">Upload a photo to personalize your profile</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">First Name</label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Last Name</label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            placeholder="Enter last name"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 pl-11 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 pl-11 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={settings.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full p-3 pl-11 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Gender</label>
          <select
            value={settings.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-white font-semibold mb-2">Bio</label>
        <textarea
          value={settings.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          rows={4}
          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
          placeholder="Tell us about yourself and your fitness journey..."
        />
      </div>

      {/* Fitness Level */}
      <div>
        <label className="block text-white font-semibold mb-2">Fitness Level</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['beginner', 'intermediate', 'advanced', 'expert'].map((level) => (
            <button
              key={level}
              onClick={() => handleInputChange('fitnessLevel', level)}
              className={`p-3 rounded-lg border-2 transition-all ${
                settings.fitnessLevel === level
                  ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Target className="w-4 h-4" />
                <span className="capitalize font-semibold">{level}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLocationTab = () => (
    <div className="space-y-6">
      {/* Country and Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Country</label>
          <div className="relative">
            <Flag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={settings.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full p-3 pl-11 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">State/Province</label>
          <input
            type="text"
            value={settings.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            placeholder="Enter state or province"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">City</label>
          <input
            type="text"
            value={settings.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            placeholder="Enter city"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Timezone</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full p-3 pl-11 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
              <option value="Europe/Paris">Central European Time (CET)</option>
              <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
              <option value="Asia/Shanghai">China Standard Time (CST)</option>
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-white font-semibold mb-2">Preferred Language</label>
        <div className="relative">
          <Languages className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <select
            value={settings.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full p-3 pl-11 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Units */}
      <div>
        <label className="block text-white font-semibold mb-3">Measurement Units</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleInputChange('units', 'metric')}
            className={`p-4 rounded-lg border-2 transition-all ${
              settings.units === 'metric'
                ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="text-center">
              <Globe className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Metric</div>
              <div className="text-sm opacity-75">kg, cm, °C</div>
            </div>
          </button>
          <button
            onClick={() => handleInputChange('units', 'imperial')}
            className={`p-4 rounded-lg border-2 transition-all ${
              settings.units === 'imperial'
                ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="text-center">
              <Flag className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Imperial</div>
              <div className="text-sm opacity-75">lbs, ft, °F</div>
            </div>
          </button>
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="block text-white font-semibold mb-3">App Theme</label>
        <div className="grid grid-cols-3 gap-4">
          {['light', 'dark', 'auto'].map((theme) => (
            <button
              key={theme}
              onClick={() => handleInputChange('theme', theme)}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.theme === theme
                  ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <Palette className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold capitalize">{theme}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-600/30">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />
          Email Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">General Updates</div>
              <div className="text-gray-400 text-sm">Receive updates about new features and improvements</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-600/30">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-400" />
          Push Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Push Notifications</div>
              <div className="text-gray-400 text-sm">Receive notifications on your device</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Fitness Reminders */}
      <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-600/30">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          Fitness Reminders
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Workout Reminders</div>
              <div className="text-gray-400 text-sm">Get reminded about your scheduled workouts</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.workoutReminders}
                onChange={(e) => handleInputChange('workoutReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Nutrition Reminders</div>
              <div className="text-gray-400 text-sm">Get reminded to log your meals and track nutrition</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.nutritionReminders}
                onChange={(e) => handleInputChange('nutritionReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-600/30">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          Profile Visibility
        </h3>
        <div className="space-y-3">
          {[
            { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
            { value: 'friends', label: 'Friends Only', desc: 'Only your friends can see your profile' },
            { value: 'private', label: 'Private', desc: 'Only you can see your profile' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={settings.profileVisibility === option.value}
                onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
              />
              <div>
                <div className="text-white font-medium">{option.label}</div>
                <div className="text-gray-400 text-sm">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Data Sharing */}
      <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-600/30">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          Data Sharing
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Share Progress</div>
              <div className="text-gray-400 text-sm">Allow others to see your fitness progress</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.shareProgress}
                onChange={(e) => handleInputChange('shareProgress', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Share Workouts</div>
              <div className="text-gray-400 text-sm">Allow others to see your workout routines</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.shareWorkouts}
                onChange={(e) => handleInputChange('shareWorkouts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoadingSettings) {
    return (
      <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading your settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg flex items-center gap-3">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-600/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'personal' && renderPersonalTab()}
        {activeTab === 'location' && renderLocationTab()}
        {activeTab === 'preferences' && renderPreferencesTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'privacy' && renderPrivacyTab()}
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-600/30">
        <button
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
