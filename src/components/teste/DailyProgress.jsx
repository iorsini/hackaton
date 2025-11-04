const DailyProgress = ({ pomodorosCompleted, goal = 8 }) => {
  const percentage = Math.min((pomodorosCompleted / goal) * 100, 100);

  return (
    <div className="daily-progress">
      <div className="progress-header">
        <h3>Progresso Diário</h3>
        <div className="progress-percentage">{Math.round(percentage)}%</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="progress-stats">
        <span className="progress-count">{pomodorosCompleted}/{goal} Pomodoros</span>
        <span className="progress-date">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
        </span>
      </div>
    </div>
  );
};

export default DailyProgress