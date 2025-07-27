import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, CheckCircle, AlertTriangle, Info, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speech recognition methods
  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Text-to-speech method
  const speakText = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const getAssistantResponse = (userMessage: string): { content: string; category: 'success' | 'warning' | 'info' } => {
    const message = userMessage.toLowerCase();

    // Nutrition and Diet Knowledge
    if (message.includes('calorie') || message.includes('diet') || message.includes('food') || message.includes('nutrition')) {
      if (message.includes('too much') || message.includes('overate') || message.includes('binge')) {
        return {
          content: `Don't worry! Overeating happens to everyone. Here's what to do:\n\n🚰 Hydrate: Drink 16-20oz of water to aid digestion\n🚶‍♂️ Light Movement: Take a 10-15 minute walk\n⏰ Next Meal: Return to normal eating - don't skip meals\n🧘‍♀️ Mindset: One meal doesn't define your progress\n\nYour target is ${targetCalories} calories/day. Tomorrow is a fresh start!`,
          category: 'warning'
        };
      }
      if (message.includes('hungry') || message.includes('cravings') || message.includes('snack')) {
        return {
          content: `Smart snacking can support your goals! Here are evidence-based options:\n\n🥜 Protein-Rich: Greek yogurt (15g protein), almonds (6g protein/oz)\n🥕 High-Fiber: Apple with almond butter, carrots with hummus\n💧 Hydration Check: Drink water first - thirst mimics hunger\n⏰ Timing: Eat every 3-4 hours to maintain blood sugar\n\nPortion sizes: Keep snacks under 200 calories between meals.`,
          category: 'info'
        };
      }
      if (message.includes('macro') || message.includes('protein') || message.includes('carb') || message.includes('fat')) {
        return {
          content: `Optimal macro distribution for your ${userProfile?.goal || 'fitness'} goal:\n\n🥩 Protein: ${userProfile?.goal === 'gain' ? '1.6-2.2g' : '1.2-1.6g'}/kg body weight\n🍞 Carbs: ${userProfile?.goal === 'lose' ? '45-65%' : '45-65%'} of total calories\n🥑 Fats: 20-35% of total calories\n\nProtein timing: 20-30g per meal for optimal muscle synthesis. Include leucine-rich sources like eggs, chicken, or Greek yogurt.`,
          category: 'success'
        };
      }
      if (message.includes('meal prep') || message.includes('planning')) {
        return {
          content: `Meal prep success strategies:\n\n📅 Plan: Choose 1-2 days for prep (Sunday/Wednesday)\n🛒 Shop Smart: Stick to your list, shop perimeter first\n⚡ Batch Cook: Proteins, grains, and roasted vegetables\n📦 Storage: Glass containers, 3-4 day portions\n🔄 Variety: Rotate seasonings and sauces\n\nPro tip: Prep ingredients, not just complete meals for flexibility!`,
          category: 'success'
        };
      }
      return {
        content: `Your calorie target: ${targetCalories}/day for ${userProfile?.goal || 'maintenance'}.\n\n🎯 Focus Areas:\n• Whole foods over processed\n• Protein at every meal (${Math.round((targetCalories * 0.25) / 4)}g daily)\n• 5-9 servings fruits/vegetables\n• Adequate hydration (35ml/kg body weight)\n\nNeed specific meal ideas or macro breakdowns?`,
        category: 'success'
      };
    }

    // Exercise and Training Knowledge
    if (message.includes('exercise') || message.includes('workout') || message.includes('training') || message.includes('form')) {
      if (message.includes('sore') || message.includes('pain') || message.includes('doms')) {
        return {
          content: `DOMS (Delayed Onset Muscle Soreness) vs. Injury:\n\n✅ Normal DOMS:\n• Peaks 24-72 hours post-workout\n• Symmetrical muscle stiffness\n• Improves with light movement\n\n⚠️ Concerning Pain:\n• Sharp, shooting, or asymmetrical\n• Worsens with movement\n• Joint pain or swelling\n\n🔧 Recovery Protocol:\n• Light cardio (20-30 min walk)\n• Dynamic stretching\n• Adequate sleep (7-9 hours)\n• Anti-inflammatory foods (tart cherries, turmeric)`,
          category: 'warning'
        };
      }
      if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
        return {
          content: `Welcome to fitness! Evidence-based beginner protocol:\n\n📅 Frequency: 2-3 full-body sessions/week\n⏱️ Duration: 45-60 minutes including warm-up\n🎯 Focus: Movement patterns over weight\n\n🏗️ Foundation Movements:\n• Squat (bodyweight → goblet → barbell)\n• Push-up (wall → knee → full)\n• Plank (15s → 60s progression)\n• Glute bridge\n• Dead bug\n\n📈 Progression: Increase reps before weight. Master form first!`,
          category: 'success'
        };
      }
      if (message.includes('strength') || message.includes('muscle') || message.includes('hypertrophy')) {
        return {
          content: `Muscle Building Science:\n\n🔬 Hypertrophy Requirements:\n• Volume: 10-20 sets per muscle/week\n• Intensity: 6-20 rep range (65-85% 1RM)\n• Frequency: Train each muscle 2-3x/week\n• Progressive overload: +2.5-5lbs weekly\n\n💪 Compound Focus:\n• Squat, Deadlift, Bench, Row\n• 80% compound, 20% isolation\n• Full ROM (range of motion)\n\n⏰ Rest: 48-72 hours between same muscle groups`,
          category: 'success'
        };
      }
      if (message.includes('cardio') || message.includes('running') || message.includes('endurance')) {
        return {
          content: `Cardiovascular Training Guide:\n\n🎯 Training Zones (% Max HR):\n• Zone 1 (50-60%): Active recovery\n• Zone 2 (60-70%): Fat burning, base building\n• Zone 3 (70-80%): Aerobic threshold\n• Zone 4 (80-90%): Lactate threshold\n• Zone 5 (90-100%): VO2 max\n\n📊 Weekly Structure:\n• 80% easy pace (Zone 1-2)\n• 20% moderate-hard (Zone 3-5)\n• 1-2 rest days\n\n🏃‍♂️ Beginner: Start with 20-30 min, 3x/week`,
          category: 'info'
        };
      }
      return {
        content: `Training Fundamentals:\n\n🏋️‍♂️ Strength: 3-5 reps, 85-95% 1RM, 3-5 min rest\n💪 Hypertrophy: 6-12 reps, 65-85% 1RM, 1-3 min rest\n⚡ Power: 1-5 reps, 30-60% 1RM, explosive intent\n🔥 Endurance: 12+ reps, <65% 1RM, <1 min rest\n\n📈 Progressive Overload Methods:\n• Increase weight\n• Add reps/sets\n• Improve form/tempo\n• Reduce rest time\n\nWhat's your primary goal?`,
        category: 'info'
      };
    }

    // Weight Management and Progress Tracking
    if (message.includes('weight') || message.includes('progress') || message.includes('plateau') || message.includes('scale')) {
      if (userProfile?.goal === 'lose' || message.includes('lose') || message.includes('fat loss')) {
        return {
          content: `Evidence-Based Fat Loss Strategy:\n\n🎯 Rate: 0.5-1% body weight/week (sustainable)\n📊 Calorie Deficit: 300-500 calories below maintenance\n⚖️ Tracking: Daily weigh-ins, weekly averages\n\n📈 Progress Metrics:\n• Body measurements (waist, hips, arms)\n• Progress photos (same time, lighting, pose)\n• Performance (strength, endurance)\n• Energy levels and sleep quality\n\n🔄 Plateau Busters:\n• Refeed days (maintenance calories)\n• Change exercise stimulus\n• Check portion creep\n• Stress management`,
          category: 'success'
        };
      }
      if (userProfile?.goal === 'gain' || message.includes('gain') || message.includes('bulk')) {
        return {
          content: `Lean Muscle Gain Protocol:\n\n🎯 Rate: 0.25-0.5 lbs/week (minimize fat gain)\n📊 Calorie Surplus: 200-500 calories above maintenance\n🥩 Protein: 1.6-2.2g/kg body weight\n\n💪 Muscle Building Priorities:\n• Progressive overload in gym\n• Adequate recovery (sleep 7-9 hours)\n• Consistent meal timing\n• Creatine supplementation (3-5g daily)\n\n📏 Track:\n• Strength progression\n• Body measurements\n• Weekly weight trend\n• Body fat percentage (DEXA/BodPod)`,
          category: 'success'
        };
      }
      if (message.includes('plateau') || message.includes('stuck')) {
        return {
          content: `Breaking Through Plateaus:\n\n🔍 Assessment Phase (1-2 weeks):\n• Track everything: food, sleep, stress\n• Measure body composition\n• Review training logs\n\n🔧 Intervention Strategies:\n• Diet Break: 1-2 weeks at maintenance\n• Deload Week: Reduce training volume 40-60%\n• Change training variables (reps, sets, exercises)\n• Address sleep/stress factors\n\n📊 Metabolic Adaptations:\n• NEAT reduction (fidgeting, posture)\n• Hormonal changes (leptin, thyroid)\n• Adaptive thermogenesis\n\nPlateus are normal - your body is adapting!`,
          category: 'warning'
        };
      }
      return {
        content: `Comprehensive Progress Tracking:\n\n📊 Weekly Measurements:\n• Weight (daily, track weekly average)\n• Body fat % (monthly via DEXA/BodPod)\n• Circumferences (waist, hips, arms, thighs)\n• Progress photos (front, side, back)\n\n💪 Performance Metrics:\n• Strength gains (1RM tests quarterly)\n• Endurance improvements\n• Recovery quality (HRV, sleep)\n• Energy levels (1-10 scale)\n\n🧠 Remember: Scale weight fluctuates 2-5 lbs daily due to:\n• Hydration status\n• Glycogen stores\n• Hormonal cycles\n• Sodium intake\n• Bowel movements`,
        category: 'info'
      };
    }

    // Supplements and Recovery
    if (message.includes('supplement') || message.includes('vitamin') || message.includes('creatine') || message.includes('protein powder')) {
      return {
        content: `Evidence-Based Supplementation:\n\n🥇 Tier 1 (Strong Evidence):\n• Creatine Monohydrate: 3-5g daily, any time\n• Whey Protein: 20-40g post-workout if needed\n• Vitamin D3: 1000-4000 IU (test levels first)\n• Omega-3: 1-3g EPA/DHA daily\n\n🥈 Tier 2 (Moderate Evidence):\n• Caffeine: 3-6mg/kg pre-workout\n• Beta-Alanine: 3-5g daily (split doses)\n• Citrulline Malate: 6-8g pre-workout\n\n⚠️ Remember: Supplements supplement a good diet, they don't replace it. Focus on whole foods first!`,
        category: 'info'
      };
    }

    // Sleep and Recovery
    if (message.includes('sleep') || message.includes('recovery') || message.includes('rest') || message.includes('tired')) {
      return {
        content: `Sleep & Recovery Optimization:\n\n😴 Sleep Hygiene:\n• 7-9 hours nightly (consistent schedule)\n• Room temp 65-68°F (18-20°C)\n• Complete darkness (blackout curtains)\n• No screens 1 hour before bed\n• Magnesium glycinate 200-400mg before bed\n\n🔄 Active Recovery:\n• Light walking 20-30 minutes\n• Yoga or gentle stretching\n• Foam rolling 10-15 minutes\n• Sauna/cold therapy (if available)\n\n📊 Recovery Markers:\n• Resting heart rate\n• Heart rate variability (HRV)\n• Sleep quality scores\n• Subjective energy levels`,
        category: 'success'
      };
    }

    // Mental Health and Motivation
    if (message.includes('motivation') || message.includes('quit') || message.includes('mental') || message.includes('stress') || message.includes('anxiety')) {
      return {
        content: `Mental Health & Motivation Strategies:\n\n🧠 Psychology of Habit Formation:\n• Start small (2% rule - improve by 2% daily)\n• Stack habits (after I X, I will Y)\n• Environment design (remove friction)\n• Identity-based goals ("I am someone who...")\n\n💪 Motivation vs. Discipline:\n• Motivation gets you started\n• Systems keep you going\n• Focus on process, not outcomes\n• Celebrate small wins daily\n\n🧘‍♀️ Stress Management:\n• Exercise reduces cortisol by 23%\n• Meditation 10-20 min daily\n• Deep breathing (4-7-8 technique)\n• Social support systems\n\nRemember: Progress isn't linear. Bad days don't erase good days! 💙`,
        category: 'success'
      };
    }

    // Injury Prevention and Mobility
    if (message.includes('injury') || message.includes('mobility') || message.includes('flexibility') || message.includes('stretch')) {
      return {
        content: `Injury Prevention & Mobility:\n\n🛡️ Prevention Strategies:\n• Proper warm-up (5-10 min dynamic)\n• Progressive overload (10% rule)\n• Adequate recovery between sessions\n• Address muscle imbalances\n• Listen to your body\n\n🤸‍♀️ Mobility Routine (Daily 10-15 min):\n• Cat-cow stretch\n• Hip 90/90 stretch\n• Thoracic spine rotation\n• Ankle circles\n• Shoulder dislocations\n\n⚠️ Red Flags (See Professional):\n• Sharp, shooting pain\n• Numbness or tingling\n• Pain that worsens over time\n• Joint instability`,
        category: 'warning'
      };
    }

    // Hormones and Health Markers
    if (message.includes('hormone') || message.includes('testosterone') || message.includes('cortisol') || message.includes('thyroid') || message.includes('blood work')) {
      return {
        content: `Hormonal Health & Biomarkers:\n\n🩸 Essential Blood Work (Annual):\n• Complete Blood Count (CBC)\n• Comprehensive Metabolic Panel\n• Lipid Panel\n• Thyroid Panel (TSH, T3, T4)\n• Vitamin D, B12\n• Testosterone (total & free)\n• Inflammatory markers (CRP)\n\n⚖️ Hormone Optimization:\n• Sleep 7-9 hours (testosterone +15%)\n• Strength training (growth hormone +200%)\n• Healthy fats 20-35% calories\n• Manage stress (cortisol regulation)\n• Maintain healthy body fat (10-18% men, 16-24% women)\n\n🔬 Optimal Ranges vary by lab - work with healthcare provider!`,
        category: 'info'
      };
    }

    // Advanced Training Concepts
    if (message.includes('periodization') || message.includes('program') || message.includes('advanced') || message.includes('athlete')) {
      return {
        content: `Advanced Training Concepts:\n\n📅 Periodization Models:\n• Linear: Gradual intensity increase\n• Undulating: Daily/weekly variation\n• Block: Focused training phases\n• Conjugate: Multiple qualities simultaneously\n\n🎯 Training Phases:\n• Anatomical Adaptation (4-6 weeks)\n• Hypertrophy (4-6 weeks)\n• Strength (4-6 weeks)\n• Power/Peak (2-4 weeks)\n• Recovery/Deload (1 week)\n\n📊 Autoregulation:\n• RPE (Rate of Perceived Exertion)\n• RIR (Reps in Reserve)\n• Velocity-based training\n• HRV-guided training\n\n🏆 Specificity Principle: Train movements and energy systems specific to your goals!`,
        category: 'success'
      };
    }

    // Women's Health and Hormones
    if (message.includes('menstrual') || message.includes('period') || message.includes('pms') || message.includes('menopause') || message.includes('pregnancy')) {
      return {
        content: `Women's Health & Exercise:\n\n🌙 Menstrual Cycle Training:\n• Follicular Phase (Days 1-14): Higher intensity, strength focus\n• Luteal Phase (Days 15-28): Lower intensity, recovery focus\n• During Period: Listen to body, light movement okay\n\n🤰 Pregnancy Guidelines (with MD approval):\n• Maintain pre-pregnancy activities if comfortable\n• Avoid supine positions after 1st trimester\n• Monitor heart rate and exertion\n• Pelvic floor exercises crucial\n• Stay hydrated, avoid overheating\n\n🔥 Menopause Support:\n• Strength training prevents bone loss\n• HIIT maintains metabolism\n• Flexibility for joint health\n• Adequate protein (1.2-1.6g/kg)\n\n⚠️ Always consult healthcare providers for personalized guidance!`,
        category: 'info'
      };
    }

    // Specific Health Conditions
    if (message.includes('diabetes') || message.includes('blood sugar') || message.includes('insulin') || message.includes('pcos') || message.includes('thyroid')) {
      return {
        content: `Exercise & Health Conditions:\n\n🩺 Always consult healthcare providers first!\n\n🍯 Blood Sugar Management:\n• Post-meal walks (15-30 min)\n• Resistance training 2-3x/week\n• HIIT 2-3x/week\n• Monitor glucose response\n• Time carbs around workouts\n\n🔄 PCOS Support:\n• Strength training (insulin sensitivity)\n• Moderate cardio (not excessive)\n• Anti-inflammatory diet\n• Stress management crucial\n• Consider inositol supplementation\n\n⚠️ Modifications may be needed - work with qualified professionals for personalized plans!`,
        category: 'warning'
      };
    }

    // Age-Specific Training
    if (message.includes('older') || message.includes('senior') || message.includes('aging') || message.includes('elderly') || message.includes('50+') || message.includes('60+')) {
      return {
        content: `Training for Mature Adults (50+):\n\n💪 Strength Training (Essential):\n• 2-3x/week, all major muscle groups\n• Focus on functional movements\n• Progressive resistance important\n• Prevents sarcopenia (muscle loss)\n\n⚖️ Balance & Stability:\n• Single-leg stands\n• Tai Chi or yoga\n• Proprioceptive exercises\n• Fall prevention priority\n\n🦴 Bone Health:\n• Weight-bearing exercises\n• Impact activities (if appropriate)\n• Adequate calcium (1200mg) & Vitamin D\n• Resistance training stimulates bone formation\n\n🧠 Cognitive Benefits:\n• Exercise improves memory\n• Reduces dementia risk by 30%\n• Social activities enhance mental health`,
        category: 'success'
      };
    }

    // Youth and Adolescent Training
    if (message.includes('teen') || message.includes('adolescent') || message.includes('youth') || message.includes('kid') || message.includes('child')) {
      return {
        content: `Youth Training Guidelines:\n\n👶 Children (6-12 years):\n• Focus on fun and movement variety\n• Fundamental movement skills\n• 60+ minutes daily physical activity\n• Avoid specialization\n• Bodyweight exercises appropriate\n\n🧑‍🎓 Adolescents (13-18 years):\n• Can begin structured resistance training\n• Proper supervision essential\n• Focus on technique over weight\n• Growth spurts affect coordination\n• Address sport-specific needs\n\n⚠️ Safety Considerations:\n• Qualified supervision required\n• Age-appropriate progressions\n• Avoid maximal lifts until skeletal maturity\n• Emphasize proper form always\n• Monitor for overuse injuries`,
        category: 'warning'
      };
    }

    // Sports-Specific Training
    if (message.includes('sport') || message.includes('athletic') || message.includes('performance') || message.includes('competition')) {
      return {
        content: `Sports Performance Training:\n\n🏃‍♂️ Endurance Sports (Running, Cycling, Swimming):\n• 80/20 rule: 80% easy, 20% hard\n• Periodized training blocks\n• VO2 max intervals (3-8 min)\n• Lactate threshold work\n• Proper taper before events\n\n⚡ Power Sports (Sprinting, Jumping, Throwing):\n• Plyometric training\n• Olympic lift variations\n• Speed development\n• Rate of force development\n• Neural recovery emphasis\n\n🏈 Team Sports:\n• Multi-directional movement\n• Agility and reaction training\n• Sport-specific conditioning\n• Injury prevention protocols\n• In-season maintenance\n\n🎯 Key Principles:\n• Specificity to sport demands\n• Progressive overload\n• Recovery periodization\n• Movement quality first`,
        category: 'success'
      };
    }

    // Rehabilitation and Return to Activity
    if (message.includes('rehab') || message.includes('physical therapy') || message.includes('comeback') || message.includes('return')) {
      return {
        content: `Rehabilitation & Return to Activity:\n\n🏥 Post-Injury Protocol:\n• Phase 1: Pain/inflammation control\n• Phase 2: Range of motion restoration\n• Phase 3: Strength rebuilding\n• Phase 4: Functional movement\n• Phase 5: Sport-specific return\n\n📋 Return-to-Play Criteria:\n• Full pain-free range of motion\n• 90% strength compared to uninjured side\n• Functional movement screen passed\n• Sport-specific skills demonstrated\n• Psychological readiness\n\n🧠 Mental Aspects:\n• Fear of re-injury common\n• Gradual confidence building\n• Visualization techniques\n• Support system important\n\n⚠️ Work with qualified professionals - don't rush the process!`,
        category: 'warning'
      };
    }

    // Nutrition Timing and Advanced Strategies
    if (message.includes('timing') || message.includes('pre workout') || message.includes('post workout') || message.includes('intermittent fasting') || message.includes('keto')) {
      return {
        content: `Advanced Nutrition Strategies:\n\n⏰ Nutrient Timing:\n• Pre-workout (1-3 hours): Carbs + moderate protein\n• During workout (>90 min): 30-60g carbs/hour\n• Post-workout (0-2 hours): Protein + carbs (3:1 ratio)\n• Before bed: Casein protein or Greek yogurt\n\n🕐 Intermittent Fasting:\n• 16:8 most sustainable\n• Maintain protein intake\n• Time eating window around training\n• Not superior for fat loss vs. calorie restriction\n\n🥑 Ketogenic Diet:\n• <50g carbs daily\n• 2-4 week adaptation period\n• May impair high-intensity performance\n• Useful for some medical conditions\n• Requires careful planning\n\n💡 Remember: Timing matters less than total daily intake for most people!`,
        category: 'info'
      };
    }

    // General Knowledge and Conversational AI
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good evening')) {
      const timeGreeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
      return {
        content: `${timeGreeting}, ${userProfile?.name || 'there'}! 👋\n\nI'm your advanced AI fitness assistant, ready to help with anything fitness, health, or wellness related. I have comprehensive knowledge comparable to ChatGPT but specialized in:\n\n💪 **Fitness & Training**\n🍽️ **Nutrition & Diet**\n🧠 **Mental Health & Motivation**\n🩺 **Health & Medical Conditions**\n🏃‍♂️ **Sports Performance**\n\nWhat would you like to know today? I can answer questions, provide detailed explanations, create plans, or just have a conversation about your fitness journey!`,
        category: 'success'
      };
    }

    // Weather and Environment
    if (message.includes('weather') || message.includes('temperature') || message.includes('hot') || message.includes('cold') || message.includes('rain')) {
      return {
        content: `Weather definitely affects your workouts! Here's how to adapt:\n\n🌡️ **Hot Weather Training:**\n• Exercise early morning or evening\n• Increase hydration (add electrolytes)\n• Reduce intensity by 10-20%\n• Wear light, breathable clothing\n• Take frequent breaks in shade\n\n❄️ **Cold Weather Training:**\n• Warm up longer (10-15 minutes)\n• Layer clothing you can remove\n• Stay hydrated (you still sweat!)\n• Protect extremities from frostbite\n• Indoor alternatives: bodyweight circuits\n\n🌧️ **Rainy Day Options:**\n• Home workouts (yoga, HIIT, strength)\n• Mall walking or stair climbing\n• Gym or indoor sports\n• Online fitness classes\n\n💡 **Pro Tip:** Your body adapts to temperature over 10-14 days, so be patient with seasonal transitions!`,
        category: 'info'
      };
    }

    // Technology and Apps
    if (message.includes('app') || message.includes('technology') || message.includes('tracker') || message.includes('smartwatch') || message.includes('phone')) {
      return {
        content: `Technology can supercharge your fitness journey! Here are evidence-based recommendations:\n\n📱 **Best Fitness Apps:**\n• MyFitnessPal: Comprehensive nutrition tracking\n• Strong/Jefit: Workout logging and progression\n• Strava: Running/cycling with social features\n• Headspace: Meditation and mental health\n• Sleep Cycle: Sleep quality optimization\n\n⌚ **Wearable Technology:**\n• Heart rate monitoring for training zones\n• Step counting (aim for 8,000-10,000 daily)\n• Sleep tracking for recovery insights\n• HRV monitoring for training readiness\n\n📊 **Key Metrics to Track:**\n• Resting heart rate (fitness indicator)\n• Heart rate variability (recovery)\n• Sleep quality and duration\n• Daily activity levels\n• Workout performance\n\n⚠️ **Remember:** Technology should enhance, not replace, listening to your body!`,
        category: 'info'
      };
    }

    // Travel and Vacation
    if (message.includes('travel') || message.includes('vacation') || message.includes('hotel') || message.includes('airport') || message.includes('trip')) {
      return {
        content: `Stay fit while traveling with these strategies:\n\n✈️ **Airport/Flight Tips:**\n• Walk terminals instead of sitting\n• Calf raises during long flights\n• Compression socks for circulation\n• Stay hydrated (avoid excess alcohol)\n• Pack resistance bands (TSA-friendly)\n\n🏨 **Hotel Workouts:**\n• Bodyweight circuits (no equipment needed)\n• Stair climbing for cardio\n• Use luggage as weights\n• YouTube workout videos\n• Hotel gym if available\n\n🍽️ **Eating on the Road:**\n• Research restaurants beforehand\n• Pack healthy snacks (nuts, protein bars)\n• Stay hydrated with water\n• Practice portion control\n• Don't stress about perfection\n\n🌍 **Sample 20-Minute Hotel Room Workout:**\n• 5 min warm-up (jumping jacks, arm circles)\n• 10 min circuit (push-ups, squats, lunges, planks)\n• 5 min cool-down (stretching)\n\n💡 **Mindset:** Aim for 80% consistency, not perfection!`,
        category: 'success'
      };
    }

    // Equipment and Gear
    if (message.includes('equipment') || message.includes('gear') || message.includes('shoes') || message.includes('clothes') || message.includes('gym') || message.includes('home gym')) {
      return {
        content: `Smart equipment choices for your fitness journey:\n\n👟 **Athletic Shoes:**\n• Running: Replace every 300-500 miles\n• Cross-training: Stable base, lateral support\n• Weightlifting: Flat, firm sole (Converse, lifting shoes)\n• Get gait analysis for running shoes\n\n🏠 **Home Gym Essentials (Budget-Friendly):**\n• Resistance bands ($20) - Full body workouts\n• Adjustable dumbbells ($100-300)\n• Yoga mat ($30) - Floor exercises, stretching\n• Pull-up bar ($30) - Upper body strength\n• Kettlebell ($50) - Cardio + strength\n\n🏋️ **Gym Membership vs Home:**\n**Gym Pros:** Equipment variety, social motivation, classes\n**Home Pros:** Convenience, no commute, privacy, cost-effective long-term\n\n👕 **Workout Clothing:**\n• Moisture-wicking fabrics (avoid cotton)\n• Proper sports bra for women (high-impact activities)\n• Compression gear for recovery\n• Layers for outdoor activities\n\n💡 **Investment Priority:** Shoes > Basic equipment > Advanced gear`,
        category: 'info'
      };
    }

    // Time Management and Busy Schedules
    if (message.includes('time') || message.includes('busy') || message.includes('schedule') || message.includes('work') || message.includes('quick') || message.includes('short')) {
      return {
        content: `Maximize fitness with minimal time:\n\n⏰ **Time-Efficient Strategies:**\n• HIIT workouts (15-20 minutes)\n• Compound movements (work multiple muscles)\n• Supersets (back-to-back exercises)\n• Active commuting (bike, walk, stairs)\n• Micro-workouts (5-10 min throughout day)\n\n🚀 **15-Minute Express Workouts:**\n**Option 1 - HIIT Cardio:**\n• 3 min warm-up\n• 8 rounds: 30s work, 30s rest\n• 4 min cool-down\n\n**Option 2 - Strength Circuit:**\n• Squats, Push-ups, Planks, Lunges\n• 45s work, 15s rest, 3 rounds\n\n📅 **Weekly Schedule for Busy People:**\n• Monday: 15 min strength\n• Tuesday: Walk/bike commute\n• Wednesday: 15 min HIIT\n• Thursday: Stairs/active breaks\n• Friday: 15 min yoga/stretching\n• Weekend: One longer session (30-45 min)\n\n💡 **Remember:** Consistency beats perfection. 15 minutes daily > 2 hours once weekly!`,
        category: 'success'
      };
    }

    // Default comprehensive response
    return {
      content: `I'm your comprehensive AI fitness assistant with advanced knowledge! I can help with:\n\n🍽️ **Nutrition & Diet:**\n• Macro/calorie calculations • Meal timing strategies\n• Supplement protocols • Special diets (keto, IF)\n• Weight management • Metabolic health\n\n🏋️‍♂️ **Training & Exercise:**\n• Program periodization • Form analysis\n• Sport-specific training • Injury prevention\n• Advanced techniques • Performance optimization\n\n🩺 **Health & Wellness:**\n• Hormone optimization • Sleep protocols\n• Stress management • Recovery strategies\n• Biomarker interpretation • Special populations\n\n🧠 **Psychology & Lifestyle:**\n• Habit formation • Motivation strategies\n• Mental health support • Goal setting\n• Progress tracking • Behavior change\n\n🌟 **Plus General Topics:**\n• Weather adaptations • Technology recommendations\n• Travel fitness • Time management\n• Equipment advice • Injury recovery\n\n💬 **I can also:**\n• Answer any fitness question in detail\n• Explain complex concepts simply\n• Provide personalized recommendations\n• Help troubleshoot problems\n• Offer motivation and support\n\nAsk me anything - I have ChatGPT-level knowledge specialized for fitness and health!`,
      category: 'info'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: userMessageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getAssistantResponse(userMessageText);
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        category: response.category
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Speak the response if voice is enabled
      if (voiceEnabled) {
        speakText(response.content);
      }
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI Fitness Assistant</h2>
            <p className="text-sm text-gray-600">Voice-enabled fitness guidance</p>
          </div>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center gap-2">
          {speechSupported && (
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition-all ${
                voiceEnabled
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={voiceEnabled ? 'Voice responses enabled' : 'Voice responses disabled'}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          )}

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
              title="Stop speaking"
            >
              <VolumeX className="w-5 h-5" />
            </button>
          )}
        </div>
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
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? "Listening..." : "Ask me anything about fitness, diet, or exercise..."}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isTyping || isListening}
          />

          {/* Voice Input Button */}
          {speechSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isTyping}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all ${
                isListening
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
        </div>

        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping || isListening}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Assistant;