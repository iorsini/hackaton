import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

export default function TimerControls({
  timer,
  isBreak,
  setIsBreak,
  focusTime,
  breakTime,
  handleStart,
  selectedMood
}) {
  return (
    <div className="timer-controls">
      <button
        className="control-btn secondary"
        onClick={() => timer.reset(isBreak ? breakTime : focusTime)}
      >
        <RotateCcw size={20} />
      </button>

      <button
        className="control-btn primary"
        onClick={timer.isActive ? timer.pause : handleStart}
        disabled={!selectedMood}
      >
        {timer.isActive ? (
          <Pause size={28} />
        ) : (
          <Play size={28} style={{ marginLeft: 2 }} />
        )}
      </button>

      <button
        className="control-btn secondary"
        onClick={() => {
          setIsBreak(!isBreak);
          timer.reset(isBreak ? focusTime : breakTime);
        }}
      >
        <SkipForward size={20} />
      </button>
    </div>
  );
}
