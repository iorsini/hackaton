
const TimerDisplay = ({ seconds, isBreak, progress }) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return (
    <div className="timer-display">
      <svg className="timer-circle" viewBox="0 0 200 200">
        <circle className="timer-bg" cx="100" cy="100" r="90" />
        <circle
          className="timer-progress"
          cx="100"
          cy="100"
          r="90"
          style={{
            strokeDashoffset: 565 - (565 * progress) / 100,
          }}
        />
      </svg>
      <div className="timer-content">
        <div className="timer-time">
          {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
        <div className="timer-label">
          {isBreak ? '☕ Pausa' : '🎯 Foco'}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay