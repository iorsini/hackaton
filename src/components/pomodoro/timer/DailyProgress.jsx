export default function DailyProgress({ progress, completedTasks, totalTasks }) {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <h3>Progresso Diário</h3>
        <div className="progress-percentage">{progress}%</div>
      </div>

      <div className="progress-info">
        <div>
          {completedTasks}/{totalTasks} tarefas
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
