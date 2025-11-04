import { useState } from "react";

import { Play, Pause, RotateCcw, Plus, X, Menu, Calendar, TrendingUp, Users, Trophy, LogOut, Settings, CheckCircle2, ChevronRight } from 'lucide-react';


const TaskListDesktop = ({ tasks, onAdd, onToggle, onDelete }) => {
  const [newTask, setNewTask] = useState('');

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="card">
      <div className="task-header">
        <h2>Tarefas ({tasks.length})</h2>
      </div>
      
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nova tarefa..."
          className="task-input"
        />
        <button onClick={handleAdd} className="btn-add">
          <Plus size={20} />
        </button>
      </div>

      <div className="tasks">
        {tasks.length === 0 ? (
          <p className="task-empty">Nenhuma tarefa ainda</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <button 
                className="task-check"
                onClick={() => onToggle(task.id)}
              >
                {task.completed && '✓'}
              </button>
              <span className="task-icon">{task.icon}</span>
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                {task.time && <span className="task-time">{task.time}</span>}
              </div>
              <button onClick={() => onDelete(task.id)} className="task-delete">
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default TaskListDesktop