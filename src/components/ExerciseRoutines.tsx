import React, { useState } from 'react';
import { Dumbbell, Play, Clock, Target, Flame, ExternalLink } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl: string;
  tips: string[];
}

interface MuscleGroup {
  name: string;
  icon: React.ReactNode;
  color: string;
  exercises: Exercise[];
}

const ExerciseRoutines: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState(0);

  const muscleGroups: MuscleGroup[] = [
    {
      name: 'Chest',
      icon: <Dumbbell className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      exercises: [
        {
          name: 'Push-ups',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
          tips: [
            'Keep your body in a straight line from head to heels',
            'Lower your chest to within an inch of the floor',
            'Push through your palms, not fingertips',
            'Engage your core throughout the movement'
          ]
        },
        {
          name: 'Bench Press',
          sets: 4,
          reps: '8-10',
          rest: '90s',
          description: 'Fundamental compound movement for chest development',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
          tips: [
            'Retract shoulder blades and maintain arch',
            'Lower the bar to your chest with control',
            'Drive through your feet and press explosively',
            'Keep wrists straight and grip width consistent'
          ]
        },
        {
          name: 'Incline Dumbbell Press',
          sets: 3,
          reps: '10-12',
          rest: '75s',
          description: 'Targets upper chest with adjustable resistance',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
          tips: [
            'Set bench to 30-45 degree incline',
            'Start with dumbbells at chest level',
            'Press up and slightly inward',
            'Control the negative portion of the lift'
          ]
        },
        {
          name: 'Chest Flyes',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          description: 'Isolation exercise for chest muscle definition',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
          tips: [
            'Use a slight bend in your elbows throughout',
            'Focus on squeezing your chest at the top',
            'Control the weight on the way down',
            'Feel the stretch at the bottom position'
          ]
        }
      ]
    },
    {
      name: 'Back',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      exercises: [
        {
          name: 'Pull-ups',
          sets: 3,
          reps: '6-10',
          rest: '90s',
          description: 'Compound exercise for upper back and lat development',
          difficulty: 'Advanced',
          videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
          tips: [
            'Start from a dead hang with arms fully extended',
            'Pull your chest to the bar, not your chin',
            'Engage your lats and squeeze shoulder blades',
            'Control the descent for maximum benefit'
          ]
        },
        {
          name: 'Bent-over Rows',
          sets: 4,
          reps: '8-12',
          rest: '75s',
          description: 'Builds thickness in the middle back and rear delts',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
          tips: [
            'Hinge at the hips, keep chest up',
            'Pull the bar to your lower chest/upper abdomen',
            'Squeeze shoulder blades together at the top',
            'Keep your core tight throughout'
          ]
        },
        {
          name: 'Lat Pulldowns',
          sets: 3,
          reps: '10-12',
          rest: '60s',
          description: 'Machine exercise for lat width and back strength',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
          tips: [
            'Lean back slightly and stick your chest out',
            'Pull the bar to your upper chest',
            'Focus on pulling with your lats, not arms',
            'Control the weight back to starting position'
          ]
        },
        {
          name: 'Deadlifts',
          sets: 3,
          reps: '5-8',
          rest: '120s',
          description: 'King of compound movements, works entire posterior chain',
          difficulty: 'Advanced',
          videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
          tips: [
            'Keep the bar close to your body throughout',
            'Drive through your heels and engage glutes',
            'Maintain neutral spine, chest up',
            'Hip hinge movement, not a squat'
          ]
        }
      ]
    },
    {
      name: 'Legs',
      icon: <Flame className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      exercises: [
        {
          name: 'Squats',
          sets: 4,
          reps: '10-15',
          rest: '90s',
          description: 'Fundamental lower body compound movement',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
          tips: [
            'Feet shoulder-width apart, toes slightly out',
            'Keep your chest up and core engaged',
            'Descend until thighs are parallel to floor',
            'Drive through your heels to stand up'
          ]
        },
        {
          name: 'Lunges',
          sets: 3,
          reps: '12 each leg',
          rest: '60s',
          description: 'Unilateral exercise for leg strength and stability',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
          tips: [
            'Step forward with a long stride',
            'Lower until both knees are at 90 degrees',
            'Keep your torso upright throughout',
            'Push off front foot to return to start'
          ]
        },
        {
          name: 'Romanian Deadlifts',
          sets: 3,
          reps: '10-12',
          rest: '75s',
          description: 'Targets hamstrings and glutes with hip hinge movement',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=jEy_czb3RKA',
          tips: [
            'Start with feet hip-width apart',
            'Hinge at hips, push them back',
            'Keep knees slightly bent throughout',
            'Feel the stretch in your hamstrings'
          ]
        },
        {
          name: 'Bulgarian Split Squats',
          sets: 3,
          reps: '10 each leg',
          rest: '60s',
          description: 'Single-leg exercise for quad and glute development',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
          tips: [
            'Place rear foot on bench behind you',
            'Keep most weight on front leg',
            'Lower until front thigh is parallel',
            'Drive through front heel to return'
          ]
        }
      ]
    },
    {
      name: 'Arms',
      icon: <Dumbbell className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      exercises: [
        {
          name: 'Bicep Curls',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Classic isolation exercise for bicep development',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
          tips: ['Keep elbows at your sides', 'Control the weight down slowly', 'Squeeze at the top', 'Avoid swinging']
        },
        {
          name: 'Tricep Dips',
          sets: 3,
          reps: '10-12',
          rest: '60s',
          description: 'Bodyweight exercise targeting triceps',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
          tips: ['Keep body close to bench', 'Lower until elbows at 90 degrees', 'Push through palms', 'Keep legs straight']
        },
        {
          name: 'Hammer Curls',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Targets both biceps and forearms',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
          tips: ['Keep neutral wrist position', 'Thumbs pointing up', 'Control the movement', 'Squeeze at the top']
        },
        {
          name: 'Close-Grip Push-ups',
          sets: 3,
          reps: '8-12',
          rest: '60s',
          description: 'Push-up variation emphasizing triceps',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=42nBhKWyDEE',
          tips: ['Hands closer than shoulder width', 'Keep elbows close to body', 'Maintain straight body line', 'Focus on tricep engagement']
        }
      ]
    },
    {
      name: 'Shoulders',
      icon: <Target className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      exercises: [
        {
          name: 'Shoulder Press',
          sets: 3,
          reps: '10-12',
          rest: '75s',
          description: 'Compound movement for overall shoulder development',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
          tips: ['Press straight up overhead', 'Keep core tight', 'Don\'t arch your back', 'Control the descent']
        },
        {
          name: 'Lateral Raises',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Isolation exercise for side deltoids',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
          tips: ['Raise arms to shoulder height', 'Lead with pinkies', 'Control the weight down', 'Slight forward lean']
        },
        {
          name: 'Front Raises',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Targets front deltoids',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=qzaKUHI8Gl0',
          tips: ['Raise to shoulder height', 'Keep slight bend in elbow', 'Control the movement', 'Don\'t use momentum']
        },
        {
          name: 'Rear Delt Flyes',
          sets: 3,
          reps: '15-20',
          rest: '45s',
          description: 'Isolation for rear deltoids and upper back',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=EA7u4Q_8HQ0',
          tips: ['Bend forward at hips', 'Squeeze shoulder blades', 'Lead with pinkies', 'Keep slight elbow bend']
        }
      ]
    },
    {
      name: 'Core',
      icon: <Flame className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      exercises: [
        {
          name: 'Plank',
          sets: 3,
          reps: '30-60s',
          rest: '45s',
          description: 'Isometric exercise for core stability',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
          tips: ['Keep body in straight line', 'Engage core muscles', 'Don\'t let hips sag', 'Breathe normally']
        },
        {
          name: 'Russian Twists',
          sets: 3,
          reps: '20-30',
          rest: '45s',
          description: 'Rotational movement for obliques',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
          tips: ['Lean back slightly', 'Keep feet off ground', 'Rotate from core', 'Control the movement']
        },
        {
          name: 'Mountain Climbers',
          sets: 3,
          reps: '20-30',
          rest: '60s',
          description: 'Dynamic core exercise with cardio benefits',
          difficulty: 'Intermediate',
          videoUrl: 'https://www.youtube.com/watch?v=kLh-uczlPLg',
          tips: ['Start in plank position', 'Drive knees to chest', 'Keep hips level', 'Maintain quick pace']
        },
        {
          name: 'Dead Bug',
          sets: 3,
          reps: '10 each side',
          rest: '45s',
          description: 'Core stability exercise with limb movement',
          difficulty: 'Beginner',
          videoUrl: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws',
          tips: ['Keep lower back pressed down', 'Move slowly and controlled', 'Breathe throughout', 'Don\'t let back arch']
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentGroup = muscleGroups[selectedGroup];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-xl">
          <Dumbbell className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Exercise Routines</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {muscleGroups.map((group, index) => (
          <button
            key={group.name}
            onClick={() => setSelectedGroup(index)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedGroup === index
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${group.color} text-white mb-2`}>
              {group.icon}
            </div>
            <div className="font-medium text-gray-800">{group.name}</div>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className={`inline-flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${currentGroup.color} text-white`}>
          {currentGroup.icon}
          <h3 className="text-xl font-bold">{currentGroup.name} Workout</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {currentGroup.exercises.map((exercise, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{exercise.name}</h4>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors group"
                title="Watch demonstration video"
              >
                <Play className="w-5 h-5 text-white" />
              </a>
            </div>

            <p className="text-gray-600 mb-4 text-sm">{exercise.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-500">Sets</span>
                </div>
                <div className="font-bold text-blue-600">{exercise.sets}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Dumbbell className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-500">Reps</span>
                </div>
                <div className="font-bold text-green-600">{exercise.reps}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-gray-500">Rest</span>
                </div>
                <div className="font-bold text-orange-600">{exercise.rest}</div>
              </div>
            </div>

            {/* Exercise Tips */}
            <div className="mb-4 p-3 bg-white rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2 text-sm">Form Tips:</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {exercise.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all font-medium">
                Start Exercise
              </button>
              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                title="Watch video tutorial"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Video</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Workout Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>• Warm up for 5-10 minutes before starting</div>
          <div>• Focus on proper form over heavy weights</div>
          <div>• Rest 48-72 hours between training same muscle groups</div>
          <div>• Stay hydrated throughout your workout</div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseRoutines;