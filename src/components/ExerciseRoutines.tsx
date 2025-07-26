import React, { useState } from 'react';
import { Dumbbell, Play, Clock, Target, Flame } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
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
          difficulty: 'Beginner'
        },
        {
          name: 'Bench Press',
          sets: 4,
          reps: '8-10',
          rest: '90s',
          description: 'Fundamental compound movement for chest development',
          difficulty: 'Intermediate'
        },
        {
          name: 'Incline Dumbbell Press',
          sets: 3,
          reps: '10-12',
          rest: '75s',
          description: 'Targets upper chest with adjustable resistance',
          difficulty: 'Intermediate'
        },
        {
          name: 'Chest Flyes',
          sets: 3,
          reps: '12-15',
          rest: '60s',
          description: 'Isolation exercise for chest muscle definition',
          difficulty: 'Beginner'
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
          difficulty: 'Advanced'
        },
        {
          name: 'Bent-over Rows',
          sets: 4,
          reps: '8-12',
          rest: '75s',
          description: 'Builds thickness in the middle back and rear delts',
          difficulty: 'Intermediate'
        },
        {
          name: 'Lat Pulldowns',
          sets: 3,
          reps: '10-12',
          rest: '60s',
          description: 'Machine exercise for lat width and back strength',
          difficulty: 'Beginner'
        },
        {
          name: 'Deadlifts',
          sets: 3,
          reps: '5-8',
          rest: '120s',
          description: 'King of compound movements, works entire posterior chain',
          difficulty: 'Advanced'
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
          difficulty: 'Beginner'
        },
        {
          name: 'Lunges',
          sets: 3,
          reps: '12 each leg',
          rest: '60s',
          description: 'Unilateral exercise for leg strength and stability',
          difficulty: 'Beginner'
        },
        {
          name: 'Romanian Deadlifts',
          sets: 3,
          reps: '10-12',
          rest: '75s',
          description: 'Targets hamstrings and glutes with hip hinge movement',
          difficulty: 'Intermediate'
        },
        {
          name: 'Bulgarian Split Squats',
          sets: 3,
          reps: '10 each leg',
          rest: '60s',
          description: 'Single-leg exercise for quad and glute development',
          difficulty: 'Intermediate'
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
          difficulty: 'Beginner'
        },
        {
          name: 'Tricep Dips',
          sets: 3,
          reps: '10-12',
          rest: '60s',
          description: 'Bodyweight exercise targeting triceps',
          difficulty: 'Intermediate'
        },
        {
          name: 'Hammer Curls',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Targets both biceps and forearms',
          difficulty: 'Beginner'
        },
        {
          name: 'Close-Grip Push-ups',
          sets: 3,
          reps: '8-12',
          rest: '60s',
          description: 'Push-up variation emphasizing triceps',
          difficulty: 'Intermediate'
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
          difficulty: 'Intermediate'
        },
        {
          name: 'Lateral Raises',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Isolation exercise for side deltoids',
          difficulty: 'Beginner'
        },
        {
          name: 'Front Raises',
          sets: 3,
          reps: '12-15',
          rest: '45s',
          description: 'Targets front deltoids',
          difficulty: 'Beginner'
        },
        {
          name: 'Rear Delt Flyes',
          sets: 3,
          reps: '15-20',
          rest: '45s',
          description: 'Isolation for rear deltoids and upper back',
          difficulty: 'Beginner'
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
          difficulty: 'Beginner'
        },
        {
          name: 'Russian Twists',
          sets: 3,
          reps: '20-30',
          rest: '45s',
          description: 'Rotational movement for obliques',
          difficulty: 'Beginner'
        },
        {
          name: 'Mountain Climbers',
          sets: 3,
          reps: '20-30',
          rest: '60s',
          description: 'Dynamic core exercise with cardio benefits',
          difficulty: 'Intermediate'
        },
        {
          name: 'Dead Bug',
          sets: 3,
          reps: '10 each side',
          rest: '45s',
          description: 'Core stability exercise with limb movement',
          difficulty: 'Beginner'
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
              <div className="p-2 bg-white rounded-lg">
                <Play className="w-5 h-5 text-gray-600" />
              </div>
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

            <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all font-medium">
              Start Exercise
            </button>
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