
const MoodSelector = ({ selectedMood, onSelect }) => {
  
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
  
  
  return (
    <div className="mood-selector-container">
      <h3 className="mood-title">Como você está se sentindo?</h3>
      <div className="mood-grid">
        {Object.values(MOODS).map((mood) => {
          const isSelected = selectedMood?.id === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood)}
              className={`mood-card ${isSelected ? 'selected' : ''} ${mood.color}`}
            >
              <span className="mood-emoji-large">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector