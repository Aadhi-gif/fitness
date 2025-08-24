# 🏆 Elite Fitness App - Login Guide

## 🔐 Login Options

### **1. Standard Login with Remember Me**
- **Email**: `demo@fitlife.com`
- **Password**: `demo123`
- ✅ **Check "Remember my credentials"** to save login info
- Your credentials will be auto-filled on next visit

### **2. Admin Access**
- **Email**: `administrator@fitlife.com`
- **Password**: `admin123!@#`
- Full admin privileges with enhanced features

### **3. GitHub Login** (Demo)
- Click **"Continue with GitHub"** button
- Simulates GitHub OAuth flow
- Creates a demo GitHub user account

## 🌐 Access via GitHub

### **Live Application**
- **Production URL**: `https://fitness-xi-jet.vercel.app`
- **GitHub Repository**: Access the code and deploy your own version

### **Local Development**
```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## 🔒 Security Features

### **Auto-Logout on Tab Close**
- Sessions automatically expire when browser tab is closed
- Enhanced security for shared computers
- No persistent sessions between browser restarts

### **Remember Me Feature**
- Saves credentials securely in localStorage
- Auto-fills login form on return visits
- Can be disabled by unchecking the option

### **Session Management**
- Active sessions use sessionStorage (cleared on tab close)
- Saved credentials use localStorage (persistent until cleared)
- Clear separation between session and persistent data

## 📱 App Features

### **Your Profile**
- Set up body metrics and fitness goals
- Personalized recommendations based on your data

### **Your Calorie Plan**
- Precision BMR and TDEE calculations
- Goal-based calorie targets (lose/maintain/gain weight)

### **Your Personalized Diet Plan**
- 7-day rotating meal plans
- Food preferences and dietary restrictions
- Macro breakdowns and meal timing

### **Exercise Routines**
- Muscle group-specific workouts
- Video demonstrations and form tips
- Progressive training programs

## 🚀 Quick Start

1. **Visit the app**: `https://fitness-xi-jet.vercel.app`
2. **Login with demo credentials** or **use GitHub login**
3. **Check "Remember me"** for easy future access
4. **Complete your profile** to unlock personalized features
5. **Follow the guided flow**: Profile → Calories → Diet → Exercise

## 🛠️ Technical Details

### **Authentication System**
- JWT-based authentication with fallback to mock system
- Dual storage strategy (session + persistent)
- GitHub OAuth integration (demo implementation)

### **Data Persistence**
- **Session Data**: Cleared on tab close (sessionStorage)
- **Saved Credentials**: Persistent across sessions (localStorage)
- **Profile Data**: Follows session storage pattern

### **Security Measures**
- Automatic session cleanup on tab close
- Secure credential storage
- Activity logging for security auditing
- Demo account usage tracking

## 🎯 Elite Features

- **Champion-themed UI** with elite athlete branding
- **Motivational quotes** and competitive messaging
- **Progressive enhancement** from basic to advanced features
- **Mobile-responsive design** for all devices

---

**Ready to dominate your fitness journey? Login now and join the elite ranks!** 🏆
