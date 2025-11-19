import { MOODS } from "@/components/constants/moods";

export default function MoodSelector({ 
  selectedMood, 
  onMoodChange, 
  onClose,
  showCustomConfig,
  setShowCustomConfig 
}) {
  return (
    <>
      <div className="mood-overlay" onClick={onClose} />
      <div className={`mood-selector-card ${showCustomConfig ? "expanded" : ""}`}>
        <div className="mood-selector-header">
          <h2>Como você está se sentindo?</h2>
          <p>Vamos ajustar o timer para seu estado de espírito</p>
        </div>

        {!showCustomConfig ? (
          <div className="mood-grid">
            {Object.values(MOODS).map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => onMoodChange(mood)}
                  className={`mood-btn ${selectedMood?.id === mood.id ? "selected" : ""}`}
                  style={selectedMood?.id === mood.id ? { background: mood.gradient } : {}}
                >
                  <Icon size={28} />
                  <span className="mood-label">{mood.label}</span>
                  <span className="mood-time">
                    {mood.id === "custom" ? "Personalize" : `${mood.focusTime}min foco`}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          {/* Conteúdo do CustomMoodConfig */}
        )}
      </div>
    </>
  );
}