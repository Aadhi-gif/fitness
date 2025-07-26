import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'success' | 'warning' | 'info';
}

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
}

interface AssistantProps {
  userProfile: UserProfile;
  targetCalories: number;
}

const Assistant: React.FC<AssistantProps> = ({ userProfile, targetCalories }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: `Hello ${userProfile?.name || 'there'}! I'm your fitness assistant. I can help you with diet corrections, exercise form tips, and answer any questions about your fitness journey. What would you like to know?`,
      timestamp: new Date(),
      category: 'info'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAssistantResponse = (userMessage: string): { content: string; category: 'success' | 'warning' | 'info' } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('calorie') || message.includes('diet') || message.includes('food')) {
      if (message.includes('too much') || message.includes('overate')) {
        return {
          content: `Don't worry! Everyone has days where they eat more than planned. Here are some tips: drink plenty of water, get back on track with your next meal, and consider adding 10-15 minutes of light exercise. Your target is ${targetCalories} calories per day, so tomorrow just focus on staying within that range.`,
          category: 'warning'
        };
      }
      if (message.includes('hungry') || message.includes('cravings')) {
        return {
          content: `Feeling hungry between meals is normal! Try these healthy snacks: Greek yogurt with berries, a handful of nuts, or vegetable sticks with hummus. Make sure you're drinking enough water too - sometimes thirst feels like hunger!`,
          category: 'info'
        };
      }
      return {
        content: `Your current calorie target is ${targetCalories} per day. Focus on balanced meals with protein, complex carbs, and healthy fats. Would you like specific meal suggestions or help with portion sizes?`,
        category: 'success'
      };
    }
    
    if (message.includes('exercise') || message.includes('workout') || message.includes('form')) {
      if (message.includes('sore') || message.includes('pain')) {
        return {
          content: `Muscle soreness after workouts is normal, but sharp pain isn't. For soreness: stay hydrated, get adequate sleep, and do light stretching. If you experience sharp or persistent pain, rest and consider consulting a healthcare professional.`,
          category: 'warning'
        };
      }
      if (message.includes('beginner') || message.includes('start')) {
        return {
          content: `Great that you're starting! Begin with 2-3 workouts per week, focus on basic movements, and prioritize proper form over heavy weights. Start with bodyweight exercises and gradually progress. Remember: consistency beats intensity!`,
          category: 'success'
        };
      }
      return {
        content: `For best results, aim for 3-4 workouts per week with rest days between sessions targeting the same muscle groups. Focus on compound movements like squats, deadlifts, and push-ups. Need help with specific exercise form?`,
        category: 'info'
      };
    }
    
    if (message.includes('weight') || message.includes('progress')) {
      if (userProfile?.goal === 'lose') {
        return {
          content: `For sustainable weight loss, aim for 1-2 pounds per week. Track your progress through measurements, photos, and how you feel - not just the scale! Weight can fluctuate daily due to water retention, hormones, and other factors.`,
          category: 'success'
        };
      }
      if (userProfile?.goal === 'gain') {
        return {
          content: `For healthy weight gain, focus on gaining 0.5-1 pound per week through strength training and a calorie surplus. Prioritize protein (aim for 1g per lb bodyweight) and compound exercises to build muscle rather than just fat.`,
          category: 'success'
        };
      }
      return {
        content: `Track progress through multiple metrics: weight, body measurements, progress photos, strength gains, and energy levels. The scale doesn't tell the whole story - muscle weighs more than fat!`,
        category: 'info'
      };
    }
    
    if (message.includes('motivation') || message.includes('tired') || message.includes('quit')) {
      return {
        content: `It's completely normal to feel this way sometimes! Remember why you started and focus on small, achievable goals. Celebrate every victory, no matter how small. Consider finding a workout buddy or tracking your progress to stay motivated. You've got this! 💪`,
        category: 'success'
      };
    }
    
    // Default response
    return {
      content: `I'm here to help with your fitness journey! I can assist with:\n\n• Diet and nutrition questions\n• Exercise form and routines\n• Calorie and macro guidance\n• Motivation and progress tracking\n• General fitness advice\n\nWhat specific area would you like help with?`,
      category: 'info'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getAssistantResponse(inputMessage);
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        category: response.category
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getMessageIcon = (category?: string) => {
    switch (category) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-xl">
          <MessageCircle className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Fitness Assistant</h2>
      </div>

      <div className="h-96 overflow-y-auto mb-6 space-y-4 p-4 bg-gray-50 rounded-xl">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'assistant' && (
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}
            >
              {message.type === 'assistant' && message.category && (
                <div className="flex items-center gap-2 mb-2">
                  {getMessageIcon(message.category)}
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {message.category}
                  </span>
                </div>
              )}
              
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              <div className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-sm border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything about fitness, diet, or exercise..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isTyping}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Assistant;