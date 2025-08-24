# Backend Integration Guide

This document explains how to integrate FitLife Pro with a backend server for user data storage, authentication, and synchronization.

## 🏗️ Backend Architecture

### Required Backend Endpoints

#### Authentication Endpoints
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
POST /api/auth/logout       - User logout
POST /api/auth/refresh      - Refresh JWT token
GET  /api/auth/profile      - Get user profile
PUT  /api/auth/profile      - Update user profile
```

#### Food Preferences Endpoints
```
GET  /api/preferences/food  - Get user food preferences
POST /api/preferences/food  - Save/update food preferences
```

#### Progress Tracking Endpoints
```
POST /api/progress/workout     - Log workout session
GET  /api/progress/workouts    - Get workout history
POST /api/progress/nutrition   - Log nutrition data
GET  /api/progress/nutrition   - Get nutrition history
GET  /api/progress/stats       - Get dashboard statistics
```

## 🔧 Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure your backend URL:

```bash
cp .env.example .env
```

Update the API URL in `.env`:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

### 2. Backend Requirements

Your backend should implement the following data models:

#### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: 'lose' | 'maintain' | 'gain';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  createdAt: string;
  updatedAt: string;
}
```

#### Food Preferences Model
```typescript
interface FoodPreferences {
  userId: string;
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  budgetRange: string;
  cookingTime: string;
  spiceLevel: string;
  mealComplexity: string;
  allergies: string[];
  dislikedFoods: string[];
  preferredProteins: string[];
  location: string;
  country: string;
  region: string;
  localTastes: string[];
  traditionalFoods: boolean;
  updatedAt: string;
}
```

#### Workout Progress Model
```typescript
interface WorkoutProgress {
  userId: string;
  date: string;
  exerciseType: string;
  duration: number;
  caloriesBurned: number;
  notes?: string;
}
```

#### Nutrition Log Model
```typescript
interface NutritionLog {
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItems: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity: number;
  }[];
  totalCalories: number;
}
```

## 🚀 Backend Technology Recommendations

### Option 1: Node.js + Express + PostgreSQL
```bash
# Dependencies
npm install express cors helmet bcryptjs jsonwebtoken
npm install pg sequelize
npm install @types/node @types/express typescript ts-node
```

### Option 2: Python + FastAPI + PostgreSQL
```bash
# Dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary
pip install python-jose[cryptography] passlib[bcrypt]
pip install python-multipart
```

### Option 3: Firebase (Serverless)
- Firebase Authentication
- Firestore Database
- Firebase Functions

### Option 4: Supabase (Backend-as-a-Service)
- Built-in authentication
- PostgreSQL database
- Real-time subscriptions
- Auto-generated APIs

## 🔐 Authentication Flow

### JWT Token Management
1. User logs in with email/password
2. Backend validates credentials and returns JWT token + refresh token
3. Frontend stores tokens securely
4. All API requests include `Authorization: Bearer <token>` header
5. Token refresh handled automatically when expired

### Security Best Practices
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use secure password hashing (bcrypt)
- Implement CORS properly
- Store sensitive data in environment variables

## 📊 Data Synchronization

### Offline-First Approach
The app works offline and syncs when connection is restored:

1. **Local Storage**: All data stored locally as backup
2. **Background Sync**: Automatic sync when backend becomes available
3. **Conflict Resolution**: Last-write-wins strategy
4. **Status Indicator**: Shows online/offline status to users

### Sync Strategy
```typescript
// Example sync implementation
const syncData = async () => {
  try {
    // Sync user preferences
    await syncPreferences();
    
    // Sync workout logs
    await syncWorkouts();
    
    // Sync nutrition data
    await syncNutrition();
    
    console.log('Data synchronized successfully');
  } catch (error) {
    console.error('Sync failed:', error);
  }
};
```

## 🧪 Testing Backend Integration

### 1. Mock Backend Testing
The app includes mock data for testing without a backend:
- Demo user: `demo@fitlife.com` / `demo123`
- All features work offline
- Data persisted in localStorage

### 2. Backend Health Check
```typescript
const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
```

### 3. Error Handling
- Graceful fallback to offline mode
- User-friendly error messages
- Automatic retry mechanisms
- Connection status monitoring

## 🚀 Deployment Options

### Frontend Deployment
- **Vercel** (recommended): Automatic deployments from Git
- **Netlify**: JAMstack hosting with serverless functions
- **AWS S3 + CloudFront**: Static hosting with CDN
- **Firebase Hosting**: Google's hosting platform

### Backend Deployment
- **Railway**: Simple backend deployment
- **Heroku**: Platform-as-a-Service
- **DigitalOcean App Platform**: Managed hosting
- **AWS ECS/Lambda**: Scalable cloud deployment
- **Google Cloud Run**: Containerized applications

## 📈 Monitoring and Analytics

### Recommended Tools
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and debugging
- **Google Analytics**: User behavior tracking
- **Mixpanel**: Event tracking and user analytics

### Health Monitoring
```typescript
// Backend health monitoring
const monitorBackend = () => {
  setInterval(async () => {
    const isHealthy = await checkBackendHealth();
    updateBackendStatus(isHealthy);
  }, 30000); // Check every 30 seconds
};
```

## 🔧 Development Workflow

### 1. Local Development
```bash
# Start frontend
npm start

# Start backend (example with Node.js)
npm run dev

# Database migrations
npm run migrate
```

### 2. Environment Setup
- Development: Local database + local API
- Staging: Staging database + staging API
- Production: Production database + production API

### 3. CI/CD Pipeline
```yaml
# Example GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Configure backend CORS settings
   - Add frontend domain to allowed origins

2. **Authentication Failures**
   - Check JWT token expiry
   - Verify API endpoint URLs
   - Validate request headers

3. **Data Sync Issues**
   - Check network connectivity
   - Verify API response formats
   - Monitor browser console for errors

### Debug Mode
Enable debug mode in `.env`:
```
REACT_APP_DEBUG_MODE=true
```

This will log all API requests and responses to the console.

## 📞 Support

For backend integration support:
1. Check the browser console for errors
2. Verify API endpoint responses
3. Test with mock data first
4. Review network requests in DevTools
5. Check backend logs for server errors

The app is designed to work seamlessly with or without a backend, ensuring a great user experience in all scenarios.
