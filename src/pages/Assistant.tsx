import React from 'react';
import { Bot, MessageCircle, Mic, Volume2, Brain } from 'lucide-react';
import Assistant from '../components/Assistant';

const AssistantPage: React.FC = () => {
  const features = [
    {
      title: 'Voice Interaction',
      description: 'Speak naturally and get voice responses',
      icon: Mic,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Expert Knowledge',
      description: 'ChatGPT-level fitness and nutrition expertise',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Real-time Guidance',
      description: 'Instant form corrections and workout tips',
      icon: MessageCircle,
      color: 'from-pink-500 to-red-500'
    },
    {
      title: 'Audio Responses',
      description: 'Hands-free coaching during workouts',
      icon: Volume2,
      color: 'from-red-500 to-orange-500'
    }
  ];

  const quickQuestions = [
    "How many calories should I eat today?",
    "What's the best exercise for building chest muscles?",
    "I'm feeling tired, should I still workout?",
    "How much protein do I need for muscle growth?",
    "What supplements should I consider?",
    "How to improve my squat form?",
    "Best pre-workout meal recommendations?",
    "How to stay motivated when progress is slow?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Elite AI Coach</h1>
              <p className="text-blue-300 text-lg">Your personal fitness expert, available 24/7</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Assistant Component */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <Assistant userProfile={null} targetCalories={2400} />
            </div>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                Quick Questions
              </h3>
              <div className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg border border-blue-500/20 text-gray-300 hover:text-white hover:border-blue-400/40 transition-all text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Capabilities
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-semibold">Nutrition Science</p>
                    <p className="text-gray-400">Macro calculations, meal timing, supplements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-semibold">Exercise Physiology</p>
                    <p className="text-gray-400">Form analysis, program design, periodization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-semibold">Sports Psychology</p>
                    <p className="text-gray-400">Motivation, habit formation, mental training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-semibold">Recovery Science</p>
                    <p className="text-gray-400">Sleep optimization, stress management</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Commands */}
            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-400" />
                Voice Commands
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">"How should I train today?"</p>
                <p className="text-gray-300">"What's my protein target?"</p>
                <p className="text-gray-300">"Analyze my squat form"</p>
                <p className="text-gray-300">"I need motivation"</p>
                <p className="text-gray-300">"Plan my cutting phase"</p>
                <p className="text-gray-300">"Explain muscle hypertrophy"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
