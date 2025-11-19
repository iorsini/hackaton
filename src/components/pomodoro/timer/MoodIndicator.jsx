import React from "react";
import { Sparkles } from "lucide-react";

export default function MoodIndicator({ selectedMood, setShowMoodSelector }) {
  return selectedMood ? (
    <div className="mood-display" onClick={() => setShowMoodSelector(true)}>
      {selectedMood.icon && React.createElement(selectedMood.icon, { size: 20 })}
      <span>Humor: {selectedMood.label}</span>
    </div>
  ) : (
    <div
      className="mood-display mood-display-pulse"
      onClick={() => setShowMoodSelector(true)}
    >
      <Sparkles size={20} />
      <span>Selecione seu humor para começar!</span>
    </div>
  );
}
