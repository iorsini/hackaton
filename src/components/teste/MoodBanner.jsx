'use client'

import { useState } from "react";
const MOTIVATIONAL_MESSAGES = [
  'Deixe as ideias fluírem! 🎨',
  'Você consegue! Um passo de cada vez 💪',
  'Respire fundo. Você está indo bem 🧘',
  'Foco impecável! Continue assim 🎯',
  'Descanse. Você merece 😴',
  'Energia máxima! Você está voando! ⚡',
  'Pequenos passos, grandes conquistas 🌟',
  'Sua energia transforma o mundo 💜'
];  


const MOODS = {
  CREATIVE: { 
    id: 'creative',
    label: 'Criativo', 
    emoji: '🎨',
    color: 'mood-creative',
    gradient: 'from-purple-400 to-indigo-500'
  },
  UNMOTIVATED: { 
    id: 'unmotivated',
    label: 'Desmotivado', 
    emoji: '😔',
    color: 'mood-unmotivated',
    gradient: 'from-gray-400 to-gray-500'
  },
  STRESSED: { 
    id: 'stressed',
    label: 'Estressado', 
    emoji: '😰',
    color: 'mood-stressed',
    gradient: 'from-red-400 to-pink-500'
  },
  FOCUSED: { 
    id: 'focused',
    label: 'Focado', 
    emoji: '🎯',
    color: 'mood-focused',
    gradient: 'from-blue-400 to-cyan-500'
  },
  TIRED: { 
    id: 'tired',
    label: 'Cansado', 
    emoji: '😴',
    color: 'mood-tired',
    gradient: 'from-orange-400 to-amber-500'
  },
  ENERGIZED: { 
    id: 'energized',
    label: 'Energizado', 
    emoji: '⚡',
    color: 'mood-energized',
    gradient: 'from-green-400 to-teal-500'
  }
};


const MoodBanner = ({ selectedMood }) => {
  const [message] = useState(() => 
    MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
  );
  
  const mood = selectedMood || MOODS.FOCUSED;
  
  return (
    <div className={`mood-banner bg-gradient-to-r ${mood.gradient}`}>
      <span className="mood-emoji">{mood.emoji}</span>
      <p>{message}</p>
    </div>
  );
};

export default MoodBanner