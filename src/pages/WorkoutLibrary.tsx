import React, { useState } from 'react';
import { Search, Filter, Play, Clock, Target, Zap, Dumbbell, Heart } from 'lucide-react';

const WorkoutLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const categories = [
    { id: 'all', name: 'All Exercises', icon: Dumbbell },
    { id: 'chest', name: 'Chest', icon: Target },
    { id: 'back', name: 'Back', icon: Target },
    { id: 'shoulders', name: 'Shoulders', icon: Target },
    { id: 'arms', name: 'Arms', icon: Target },
    { id: 'legs', name: 'Legs', icon: Target },
    { id: 'core', name: 'Core', icon: Target },
    { id: 'cardio', name: 'Cardio', icon: Heart }
  ];

  const exercises = [
    {
      id: 1,
      name: 'Barbell Bench Press',
      category: 'chest',
      difficulty: 'intermediate',
      equipment: 'barbell',
      duration: '3-4 sets',
      calories: 120,
      description: 'The king of upper body exercises for building chest strength and mass.',
      instructions: [
        'Lie flat on bench with feet firmly on ground',
        'Grip bar slightly wider than shoulder width',
        'Lower bar to chest with control',
        'Press bar up explosively to starting position'
      ],
      tips: [
        'Keep shoulder blades retracted',
        'Maintain slight arch in lower back',
        'Control the negative portion'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg'
    },
    {
      id: 2,
      name: 'Deadlift',
      category: 'back',
      difficulty: 'advanced',
      equipment: 'barbell',
      duration: '3-5 sets',
      calories: 150,
      description: 'The ultimate full-body strength exercise targeting posterior chain.',
      instructions: [
        'Stand with feet hip-width apart, bar over mid-foot',
        'Bend at hips and knees to grip bar',
        'Keep chest up and back straight',
        'Drive through heels to stand up straight'
      ],
      tips: [
        'Keep bar close to body throughout movement',
        'Engage core throughout lift',
        'Don\'t round your back'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE'
    },
    {
      id: 3,
      name: 'Pull-ups',
      category: 'back',
      difficulty: 'intermediate',
      equipment: 'bodyweight',
      duration: '3-4 sets',
      calories: 100,
      description: 'Elite bodyweight exercise for building back width and strength.',
      instructions: [
        'Hang from bar with palms facing away',
        'Pull body up until chin clears bar',
        'Lower with control to full extension',
        'Repeat for desired reps'
      ],
      tips: [
        'Engage lats throughout movement',
        'Avoid swinging or kipping',
        'Focus on pulling elbows down'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
    },
    {
      id: 4,
      name: 'Squats',
      category: 'legs',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '3-4 sets',
      calories: 110,
      description: 'Fundamental lower body exercise for building leg strength and power.',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower body by bending knees and hips',
        'Keep chest up and knees tracking over toes',
        'Return to standing position'
      ],
      tips: [
        'Keep weight on heels',
        'Don\'t let knees cave inward',
        'Go as deep as mobility allows'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM'
    },
    {
      id: 5,
      name: 'Overhead Press',
      category: 'shoulders',
      difficulty: 'intermediate',
      equipment: 'barbell',
      duration: '3-4 sets',
      calories: 90,
      description: 'Elite shoulder builder and core stabilizer exercise.',
      instructions: [
        'Stand with feet hip-width apart',
        'Hold bar at shoulder level',
        'Press bar straight overhead',
        'Lower with control to starting position'
      ],
      tips: [
        'Keep core tight throughout',
        'Don\'t arch back excessively',
        'Press in straight line'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI'
    },
    {
      id: 6,
      name: 'Plank',
      category: 'core',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '30-60 seconds',
      calories: 50,
      description: 'Isometric core exercise for building stability and endurance.',
      instructions: [
        'Start in push-up position',
        'Lower to forearms',
        'Keep body in straight line',
        'Hold position for time'
      ],
      tips: [
        'Don\'t let hips sag',
        'Breathe normally',
        'Engage entire core'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c'
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesEquipment = selectedEquipment === 'all' || exercise.equipment === selectedEquipment;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'advanced': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Exercise Library</h1>
              <p className="text-blue-300 text-lg">Master every movement like a champion</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-blue-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-black/50 border border-blue-500/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
            >
              <option value="all">All Categories</option>
              <option value="chest">Chest</option>
              <option value="back">Back</option>
              <option value="shoulders">Shoulders</option>
              <option value="arms">Arms</option>
              <option value="legs">Legs</option>
              <option value="core">Core</option>
              <option value="cardio">Cardio</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 bg-black/50 border border-blue-500/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Equipment Filter */}
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="px-4 py-3 bg-black/50 border border-blue-500/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
            >
              <option value="all">All Equipment</option>
              <option value="bodyweight">Bodyweight</option>
              <option value="barbell">Barbell</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="machine">Machine</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white border border-gray-600'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all"
            >
              {/* Exercise Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Exercise Info */}
              <p className="text-gray-300 text-sm mb-4">{exercise.description}</p>

              {/* Exercise Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-blue-400">
                  <Clock className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <Zap className="w-4 h-4" />
                  <span>{exercise.calories} cal</span>
                </div>
              </div>

              {/* Instructions Preview */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Quick Steps:</h4>
                <ol className="text-gray-400 text-sm space-y-1">
                  {exercise.instructions.slice(0, 2).map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                  {exercise.instructions.length > 2 && (
                    <li className="text-blue-400 text-xs">+{exercise.instructions.length - 2} more steps...</li>
                  )}
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
                <button className="px-4 py-2 border border-blue-500/50 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-all">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-600/20 rounded-2xl inline-block mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No exercises found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLibrary;
