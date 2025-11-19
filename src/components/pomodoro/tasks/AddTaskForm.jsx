"use client";

import { Plus, X } from "lucide-react";

export default function AddTaskForm({
  showAddTask,
  setShowAddTask,
  selectedCategory,
  setSelectedCategory,
  newTaskText,
  setNewTaskText,
  addTask,
  TASK_CATEGORIES,
}) {
  if (!showAddTask) {
    return (
      <button
        className="add-task-btn"
        onClick={() => setShowAddTask(true)}
      >
        <Plus size={18} />
        Adicionar Tarefa
      </button>
    );
  }

  return (
    <div>
      {/* CATEGORIAS */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        {Object.values(TASK_CATEGORIES).map((cat) => {
          const CategoryIcon = cat.Icon;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "0.5rem 0.75rem",
                border:
                  selectedCategory === cat.id
                    ? `2px solid ${cat.color}`
                    : "2px solid #e5e7eb",
                background:
                  selectedCategory === cat.id
                    ? `${cat.color}15`
                    : "white",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: selectedCategory === cat.id ? cat.color : "#666",
                transition: "all 0.2s",
              }}
            >
              <CategoryIcon size={16} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="add-task-input-container">
        <input
          type="text"
          className="add-task-input"
          placeholder="Digite sua tarefa..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          autoFocus
        />

        <button className="add-task-submit" onClick={addTask}>
          <Plus size={20} />
        </button>

        <button
          className="control-btn secondary"
          style={{ width: 44, height: 44 }}
          onClick={() => {
            setShowAddTask(false);
            setNewTaskText("");
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
