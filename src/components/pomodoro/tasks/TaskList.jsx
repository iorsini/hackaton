"use client";

import { Lock, ListTodo, Wind } from "lucide-react";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";

export default function TaskList({
  tasks,
  currentTaskIndex,
  toggleTask,
  deleteTask,
  addTask,
  isLoadingTasks,
  session,
  showAddTask,
  setShowAddTask,
  selectedCategory,
  setSelectedCategory,
  newTaskText,
  setNewTaskText,
  TASK_CATEGORIES,
  getCategoryIcon,
}) {
  return (
    <div className="task-list-card">
      {/* HEADER */}
      <div className="task-header">
        <h2>
          Minhas Tarefas{" "}
          <span className="task-count">({tasks.length})</span>
        </h2>
      </div>

      {/* AVISO DE LOGIN */}
      {!session && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "2rem",
            textAlign: "center",
            border: "2px dashed #fbbf24",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <Lock size={40} color="#fbbf24" />
          </div>

          <p style={{ fontWeight: 600, color: "#1a1a1a" }}>
            Suas tarefas não serão salvas
          </p>

          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Faça login para manter suas tarefas!
          </p>
        </div>
      )}

      {/* LISTA DE TAREFAS */}
      <div className="tasks-container">
        {isLoadingTasks ? (
          <div className="empty-state">
            <Wind size={48} color="#999" />
            <p>Carregando tarefas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <ListTodo size={48} color="#999" />
            <p>Nenhuma tarefa ainda</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>
              Adicione sua primeira tarefa abaixo!
            </p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              currentTaskIndex={currentTaskIndex}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              TASK_CATEGORIES={TASK_CATEGORIES}
              getCategoryIcon={getCategoryIcon}
            />
          ))
        )}
      </div>

      {/* ADD TASK FORM */}
      <div className="add-task-container">
        <AddTaskForm
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
          newTaskText={newTaskText}
          setNewTaskText={setNewTaskText}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addTask={addTask}
          TASK_CATEGORIES={TASK_CATEGORIES}
        />
      </div>
    </div>
  );
}
