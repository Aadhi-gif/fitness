# 🏋️‍♂️ FitLife Pro - Complete Fitness & Nutrition Application

A comprehensive React-based fitness and nutrition application with personalized diet plans, exercise routines, calorie tracking, and AI assistance.

![FitLife Pro](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-cyan)

## ✨ Features

### 🔐 Multiple Authentication Access Methods
- **Enhanced Welcome Landing Page** - Prominent sign-up/sign-in buttons with demo credentials
- **Welcome Banner** - Top-of-page dismissible banner with quick access
- **Floating Action Button (FAB)** - Bottom-right expandable menu
- **Quick Auth Sidebar** - Slide-in sidebar from the left
- **Sticky Auth Bar** - Bottom sticky bar that appears on scroll
- **Traditional Header Buttons** - Classic navigation authentication

### 🎯 Core Functionality
- **User Authentication** - Secure login/registration system with demo account
- **Profile Management** - Comprehensive user profile with body metrics
- **Calorie Calculator** - BMR-based calculations using Mifflin-St Jeor Equation
- **Personalized Diet Plans** - Goal-based meal planning (lose/maintain/gain weight)
- **Exercise Routines** - Targeted workouts for different muscle groups
- **AI Fitness Assistant** - Interactive chat for form corrections and tips
- **Progress Tracking** - Visual progress indicators and analytics

### 🎨 Design Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI/UX** - Gradient backgrounds, smooth animations, and intuitive navigation
- **Accessibility** - Proper contrast ratios and keyboard navigation
- **Dark/Light Theme Support** - Consistent branding across all components

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aadhi-gif/fitness.git
   cd fitness
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Account
- **Email:** demo@fitlife.com
- **Password:** demo123

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Assistant.tsx    # AI fitness assistant
│   ├── AuthModal.tsx    # Authentication modal
│   ├── CalorieCalculator.tsx
│   ├── DietPlan.tsx     # Meal planning component
│   ├── ExerciseRoutines.tsx
│   ├── FloatingAuthButton.tsx
│   ├── Header.tsx       # Navigation header
│   ├── ProtectedRoute.tsx
│   ├── QuickAuthSidebar.tsx
│   ├── StickyAuthBar.tsx
│   ├── UserProfileForm.tsx
│   └── WelcomeBanner.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── types/               # TypeScript type definitions
│   └── auth.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Key Components

### Authentication System
- **Multiple Access Points** - 6 different ways to access authentication
- **Mock Backend** - Local storage-based user management
- **Session Persistence** - Automatic login on app reload

### Calorie & Nutrition
- **BMR Calculation** - Gender and activity level specific
- **Goal-Based Planning** - Customized macros for weight goals
- **Meal Suggestions** - Weekly meal plans with nutritional info

### Exercise & Fitness
- **Muscle Group Targeting** - Organized workout routines
- **Form Guidance** - AI assistant for exercise tips
- **Progress Tracking** - Visual indicators and analytics

## 🔧 Technologies Used

- **Frontend Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Icons:** Lucide React 0.344.0
- **Linting:** ESLint with TypeScript support
- **State Management:** React Context API

## 🌟 Authentication Access Methods

1. **Enhanced Landing Page** - Main content area with large CTA buttons
2. **Welcome Banner** - Dismissible top banner with gradient design
3. **Floating Action Button** - Bottom-right expandable menu
4. **Quick Auth Sidebar** - Left-side slide-in panel
5. **Sticky Auth Bar** - Bottom sticky bar on scroll
6. **Header Navigation** - Traditional top navigation buttons

## 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Tablet Support** - Responsive layouts for tablets
- **Desktop Enhanced** - Full-featured desktop experience
- **Cross-Browser** - Compatible with modern browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- Vite for the lightning-fast build tool

---

**Built with ❤️ for fitness enthusiasts worldwide**
