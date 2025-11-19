"use client";

import { Check, Trash2 } from "lucide-react";

export default function TaskItem({
  task,
  index,
  currentTaskIndex,
  toggleTask,
  deleteTask,
  getCategoryIcon,
  TASK_CATEGORIES,
}) {
  return (
    <div
      key={task.id}
      className={`task-item ${task.completed ? "completed" : ""} ${
        index === currentTaskIndex && !task.completed ? "current" : ""
      }`}
      onClick={() => toggleTask(task.id)}
    >
      <div className="task-checkbox">
        {task.completed && <Check size={14} />}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getCategoryIcon(task.category)}
      </div>

      <div className="task-content">
        <div className="task-text">{task.text}</div>

        {TASK_CATEGORIES[task.category] && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "#888",
              marginTop: 6,
            }}
          >
            {TASK_CATEGORIES[task.category].label}
          </div>
        )}
      </div>

      <button
        className="delete-task-btn"
        onClick={(e) => deleteTask(task.id, e)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
