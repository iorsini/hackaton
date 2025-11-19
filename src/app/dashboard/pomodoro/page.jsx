"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import NotificationPopup from "@/components/pomodoro/notifications/NotificationPopup";
import "@/styles/pomodoro/notifications.css";
import MoodSelector from "@/components/pomodoro/mood/MoodSelector";
import "@/styles/pomodoro/mood.css";
import Timer from "@/components/pomodoro/timer/Timer";

import TaskList from "@/components/pomodoro/tasks/TaskList";

import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Sparkle,
  X,
  Coffee,
  Brain,
  Battery,
  Zap,
  Frown,
  Smile,
  SkipForward,
  LogIn,
  Check,
  Trash2,
  Briefcase,
  Dumbbell,
  Heart,
  BookOpen,
  Home,
  Pin,
  Sparkles,
  Target,
  Wind,
  Lock,
  ListTodo,
  Settings,
} from "lucide-react";
import { useTimer } from "@/hooks/useTimer";
import { MOODS, TASK_CATEGORIES } from "@/components/constants/moods";
import Sidebar from "@/components/teste/Sidebar";
import LofiPlayer from "@/components/teste/LoFiPlayer";
import RoomsPage from "@/components/pomodoro/RoomsPage";
import RoomModal from "@/components/pomodoro/RoomModal";
// ============================================
// MAIN APP
// ============================================
export default function PomodoroApp() {
  const { data: session, status } = useSession();
  const audioRef = useRef(null);

  // Navigation states
  const [activePage, setActivePage] = useState("timer");
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Task states
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("outros");
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // Timer states
  const [selectedMood, setSelectedMood] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showCustomConfig, setShowCustomConfig] = useState(false);
  const [customFocusTime, setCustomFocusTime] = useState(25);
  const [customBreakTime, setCustomBreakTime] = useState(5);

  // Notification states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const focusTime = selectedMood?.focusTime || 25;
  const breakTime = selectedMood?.breakTime || 5;

  // Helper para renderizar ícones de categoria
  const getCategoryIcon = (categoryId) => {
    const IconComponent = TASK_CATEGORIES[categoryId]?.Icon || Pin;
    return (
      <IconComponent
        size={20}
        color={TASK_CATEGORIES[categoryId]?.color || "#6b7280"}
      />
    );
  };

  const showNotif = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Pomodoro Timer", { body: message });
    }
  };

  const handleTimerComplete = async () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Erro ao tocar áudio:", err);
      });
    }

    if (!isBreak) {
      // ========================================
      // COMPLETOU UM CICLO DE FOCO
      // ========================================

      // 1. Marcar task atual como completa
      if (tasks[currentTaskIndex] && !tasks[currentTaskIndex].completed) {
        const newTasks = [...tasks];
        newTasks[currentTaskIndex].completed = true;
        setTasks(newTasks);
      }

      // 2. Registrar o pomodoro no backend
      if (session?.user) {
        try {
          const response = await fetch("/api/users/pomodoro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              focusTimeMinutes: focusTime, // tempo do timer que acabou de completar
              moodId: selectedMood?.id,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Pomodoro registrado:`, data);

            // Atualiza com valor do servidor
            setPomodorosCompleted(data.totalPomodoros);

            showNotif(`+${data.pomodorosAdded} pomodoro(s) completado(s)! 🎯`);
          } else {
            console.error("❌ Erro ao salvar pomodoro");
            // Fallback: incrementa localmente
            setPomodorosCompleted((prev) => prev + 1);
          }
        } catch (error) {
          console.error("❌ Erro ao registrar pomodoro:", error);
          // Fallback: incrementa localmente
          setPomodorosCompleted((prev) => prev + 1);
        }
      } else {
        // Usuário não logado: apenas incrementa localmente
        setPomodorosCompleted((prev) => prev + 1);
      }

      // 3. Mudar para modo pausa
      setIsBreak(true);
      timer.reset(breakTime);

      const messages = selectedMood?.breakMessages || [
        "Beba água! 💧",
        "Alongue-se!",
        "Descanse os olhos",
      ];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      // ========================================
      // COMPLETOU UMA PAUSA
      // ========================================

      // Registrar tempo de pausa (opcional)
      if (session?.user) {
        try {
          await fetch("/api/users/pomodoro", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              breakTimeMinutes: breakTime,
              moodId: selectedMood?.id,
            }),
          });
        } catch (error) {
          console.error("Erro ao registrar pausa:", error);
        }
      }

      // Voltar para modo foco
      setIsBreak(false);

      // Avançar para próxima task não completada
      const nextIndex = tasks.findIndex(
        (t, i) => i > currentTaskIndex && !t.completed
      );
      if (nextIndex !== -1) {
        setCurrentTaskIndex(nextIndex);
      }

      timer.reset(focusTime);

      const messages = selectedMood?.focusMessages || [
        "Vamos lá!",
        "Foco total!",
      ];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  const timer = useTimer(focusTime, handleTimerComplete);

  const handleStart = () => {
    if (!selectedMood) {
      showNotif("Selecione seu humor primeiro!");
      setShowMoodSelector(true);
      return;
    }

    timer.start();

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    if (!isBreak) {
      const messages = selectedMood?.focusMessages || ["Foco!"];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  useEffect(() => {
    const loadUserPomodoros = async () => {
      if (session?.user) {
        try {
          const res = await fetch("/api/users/profile");
          if (res.ok) {
            const data = await res.json();
            console.log("🎯 Carregando pomodoros:", data.stats.totalPomodoros);
            setPomodorosCompleted(data.stats.totalPomodoros || 0);
          }
        } catch (error) {
          console.error("Erro ao carregar pomodoros:", error);
        }
      }
    };

    loadUserPomodoros();
  }, [session]);

  // API INTEGRATION
  useEffect(() => {
    if (session?.user) {
      loadTasks();
    } else {
      setIsLoadingTasks(false);
    }
  }, [session]);

  const loadTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const res = await fetch("/api/tasks");
      const data = await res.json();

      if (res.ok) {
        setTasks(
          data.tasks.map((t) => ({
            ...t,
            id: t._id,
          }))
        );
      } else {
        showNotif("Erro ao carregar tarefas");
      }
    } catch (error) {
      console.error("Erro ao carregar tasks:", error);
      showNotif("Erro ao carregar tarefas");
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const addTask = async () => {
    if (!newTaskText.trim()) return;

    if (session?.user) {
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: newTaskText.trim(),
            category: selectedCategory,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setTasks([
            {
              ...data.task,
              id: data.task._id,
            },
            ...tasks,
          ]);
          setNewTaskText("");
          setShowAddTask(false);
          showNotif("Tarefa adicionada!");
        } else {
          console.error("Erro do servidor ao adicionar task:", data);
          showNotif("Erro ao adicionar tarefa");
        }
      } catch (error) {
        console.error("Erro ao adicionar task:", error);
        showNotif("Erro ao adicionar tarefa");
      }
    } else {
      setTasks([
        {
          id: Date.now(),
          text: newTaskText.trim(),
          completed: false,
          category: selectedCategory || "outros",
          createdAt: new Date().toISOString(),
        },
        ...tasks,
      ]);
      setNewTaskText("");
      setShowAddTask(false);
      showNotif("Tarefa adicionada localmente (faça login para salvar).");
    }
  };

  const toggleTask = async (id) => {
    if (session?.user) {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const newCompleted = !task.completed;

      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
      );

      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: newCompleted }),
        });

        if (!res.ok) {
          setTasks(
            tasks.map((t) =>
              t.id === id ? { ...t, completed: !newCompleted } : t
            )
          );
          showNotif("Erro ao atualizar tarefa");
        }
      } catch (error) {
        console.error("Erro ao toggle task:", error);
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...t, completed: !newCompleted } : t
          )
        );
      }
    } else {
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  const deleteTask = async (id, e) => {
    e.stopPropagation();

    if (session?.user) {
      const oldTasks = [...tasks];
      setTasks(tasks.filter((t) => t.id !== id));

      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          setTasks(oldTasks);
          showNotif("Erro ao deletar tarefa");
        } else {
          showNotif("Tarefa removida!");
        }
      } catch (error) {
        console.error("Erro ao deletar task:", error);
        setTasks(oldTasks);
        showNotif("Erro ao deletar tarefa");
      }
    } else {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleMoodChange = (mood) => {
    if (mood.id === "custom") {
      setShowCustomConfig(true);
      return;
    }

    setSelectedMood(mood);
    setShowMoodSelector(false);
    setShowCustomConfig(false);
    if (!timer.isActive) {
      timer.reset(mood.focusTime);
    }
    showNotif(
      `Humor "${mood.label}" selecionado! ${mood.focusTime}min de foco`
    );
  };

  const handleCustomMoodConfirm = () => {
    const customMood = {
      ...MOODS.CUSTOM,
      focusTime: customFocusTime,
      breakTime: customBreakTime,
    };

    setSelectedMood(customMood);
    setShowMoodSelector(false);
    setShowCustomConfig(false);
    if (!timer.isActive) {
      timer.reset(customFocusTime);
    }
    showNotif(
      `Modo personalizado: ${customFocusTime}min de foco, ${customBreakTime}min de pausa!`
    );
  };

  // ROOM HANDLERS
  const handlePageChange = (page) => {
    setActivePage(page);
    setSelectedRoom(null);
  };

  const handleCreateRoom = () => {
    setShowRoomModal(true);
  };

  const handleRoomCreated = (room) => {
    setShowRoomModal(false);
    setSelectedRoom(room);
    window.dispatchEvent(new Event("roomsUpdated"));
  };

  const handleRoomJoined = (room) => {
    setShowRoomModal(false);
    setSelectedRoom(room);
    window.dispatchEvent(new Event("roomsUpdated"));
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleBackToRooms = () => {
    setSelectedRoom(null);
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const minutes = Math.floor(timer.seconds / 60);
  const secs = timer.seconds % 60;

  // PAGE CONTENT RENDERING
  const renderPageContent = () => {
    switch (activePage) {
      case "timer":
        return renderTimerPage();

      case "progress":
        return (
          <div className="page-wrapper">
            <div className="page-card">
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <Target
                  size={32}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    verticalAlign: "middle",
                  }}
                />
                Sobre a Pomofy{" "}
              </h1>
              <p style={{ color: "#666", marginBottom: "2rem" }}>
                Acompanhe suas estatísticas e evolução
              </p>
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  background: "#f9fafb",
                  borderRadius: "16px",
                  border: "2px dashed #d1d5db",
                }}
              >
                <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                  Componente de Progresso será implementado aqui
                </p>
              </div>
            </div>
          </div>
        );

      case "rooms":
        return (
          <div className="rooms-wrapper">
            {selectedRoom ? (
              <div className="page-card">
                <button onClick={handleBackToRooms} className="back-btn-rooms">
                  Voltar para Salas
                </button>
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    marginTop: "1rem",
                    color: "gray",
                  }}
                >
                  {selectedRoom.name}
                </h1>
                <p style={{ color: "#665", marginTop: "0.5rem" }}>
                  Visualização da sala em desenvolvimento...
                </p>
              </div>
            ) : (
              <RoomsPage
                onRoomSelect={handleRoomSelect}
                onCreateRoom={handleCreateRoom}
              />
            )}
          </div>
        );

      case "ranking":
        return (
          <div className="page-wrapper">
            <div className="page-card">
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <Target
                  size={32}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    verticalAlign: "middle",
                  }}
                />
                Ranking
              </h1>
              <p style={{ color: "#666", marginBottom: "2rem" }}>
                Veja os usuários mais dedicados
              </p>
              <div
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  background: "#f9fafb",
                  borderRadius: "16px",
                  border: "2px dashed #d1d5db",
                }}
              >
                <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                  Componente de Ranking será implementado aqui
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return renderTimerPage();
    }
  };

  const renderTimerPage = () => (
    <>
      <TaskList
        tasks={tasks}
        currentTaskIndex={currentTaskIndex}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        addTask={addTask}
        isLoadingTasks={isLoadingTasks}
        session={session}
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        newTaskText={newTaskText}
        setNewTaskText={setNewTaskText}
        TASK_CATEGORIES={TASK_CATEGORIES}
        getCategoryIcon={getCategoryIcon}
      />

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <Timer
          timer={timer}
          isBreak={isBreak}
          setIsBreak={setIsBreak}
          selectedMood={selectedMood}
          tasks={tasks}
          currentTaskIndex={currentTaskIndex}
          focusTime={focusTime}
          breakTime={breakTime}
          minutes={minutes}
          secs={secs}
          handleStart={handleStart}
          setShowMoodSelector={setShowMoodSelector}
          completedTasks={completedTasks}
          progress={progress}
        />

        <LofiPlayer selectedMood={selectedMood} />
      </div>
    </>
  );

  return (
    <>
      <style>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    min-height: 100vh;
    overflow-x: hidden;
    transition: background 0.8s ease;
  }

  .app-container {
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    gap: 2rem;
    max-width: 1600px;
    margin: 0 auto;
  }

  /* ===== PÁGINAS ===== */
  .page-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .page-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    flex: 1;
  }

  .rooms-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .back-btn-rooms {
    padding: 0.75rem 1.5rem;
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .back-btn-rooms:hover {
    background: #667eea;
    color: white;
    transform: translateX(-4px);
  }

  /* ===== NOTIFICATION ===== */
  .notification-popup {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: white;
    padding: 1.25rem 1.75rem;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: slideInRight 0.4s ease;
    max-width: 380px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .notification-icon {
    width: 44px;
    height: 44px;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .notification-text {
    flex: 1;
    font-size: 0.95rem;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.4;
  }

  /* ===== LOGIN BUTTON ===== */
  .login-btn {
    position: fixed;
    top: 2rem;
    right: 2rem;
    padding: 0.75rem 1.25rem;
    background: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: #1a1a1a;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.2s;
    z-index: 100;
  }

  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  
  /* ===== CUSTOM CONFIG ===== */
  .custom-config {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .custom-config-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .custom-config-header h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 0.5rem;
  }

  .custom-config-header p {
    font-size: 0.9rem;
    color: #666;
  }

  .custom-inputs {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .custom-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .custom-input-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .input-with-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .time-control-btn {
    width: 44px;
    height: 44px;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 600;
    color: #666;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-control-btn:hover {
    border-color: #8b5cf6;
    color: #8b5cf6;
    background: #f5f3ff;
  }

  .custom-time-input {
    flex: 1;
    padding: 0.875rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    color: purple;
    background-color: white;
    outline: none;
    transition: all 0.2s;
  }

  .custom-time-input:focus {
    border-color: #8b5cf6;
    background: #faf9ff;
  }

  .custom-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .custom-btn {
    flex: 1;
    padding: 0.875rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .custom-btn.secondary {
    background: #f3f4f6;
    color: #666;
  }

  .custom-btn.secondary:hover {
    background: #e5e7eb;
  }

  .custom-btn.primary {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: white;
    box-shadow: 0 6px 18px rgba(139, 92, 246, 0.3);
  }

  .custom-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  /* ===== TASK LIST CARD ===== */
  .task-list-card {
    flex: 0 0 400px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 1.75rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 4rem);
  }

  .task-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .task-header h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  .task-count {
    color: #666;
    font-size: 0.85rem;
    margin-left: 0.5rem;
  }

  .tasks-container {
    flex: 1;
    overflow-y: auto;
    margin: 0.75rem -0.5rem;
    padding: 0 0.5rem;
  }

  .tasks-container::-webkit-scrollbar {
    width: 5px;
  }

  .tasks-container::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }

  .task-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem;
    margin-bottom: 0.625rem;
    border-radius: 11px;
    transition: all 0.2s;
    cursor: pointer;
    background: #fff;
    border: 2px solid transparent;
  }

  .task-item:hover {
    background: #f9f9f9;
    border-color: #e5e7eb;
  }

  .task-item.completed {
    opacity: 0.55;
  }

  .task-item.current {
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    box-shadow: 0 6px 18px rgba(102, 126, 234, 0.3);
  }

  .task-item.current * {
    color: white !important;
  }

  .task-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: white;
    transition: all 0.2s;
  }

  .task-item.completed .task-checkbox {
    background: #10b981;
    border-color: #10b981;
  }

  .task-item.current .task-checkbox {
    border-color: white;
    background: rgba(255, 255, 255, 0.2);
  }

  .task-content {
    flex: 1;
    min-width: 0;
  }

  .task-text {
    font-weight: 600;
    font-size: 0.85rem;
    color: #1a1a1a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .task-item.completed .task-text {
    text-decoration: line-through;
  }

  .delete-task-btn {
    opacity: 0;
    width: 30px;
    height: 30px;
    border: none;
    background: #fee;
    color: #dc2626;
    border-radius: 7px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .task-item:hover .delete-task-btn {
    opacity: 1;
  }

  .delete-task-btn:hover {
    background: #dc2626;
    color: white;
  }

  .add-task-container {
    margin-top: 0.875rem;
  }

  .add-task-btn {
    width: 100%;
    padding: 0.75rem;
    border: 2px dashed #ddd;
    background: white;
    border-radius: 11px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #666;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.2s;
  }

  .add-task-btn:hover {
    border-color: ${selectedMood?.gradient?.split(" ")[2] || "#667eea"};
    color: ${selectedMood?.gradient?.split(" ")[2] || "#667eea"};
    background: #f8f9ff;
  }

  .add-task-input-container {
    display: flex;
    gap: 0.5rem;
    color: gray;
  }

  .add-task-input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 11px;
    font-size: 0.85rem;
    outline: none;
    transition: all 0.2s;
  }

  .add-task-input:focus {
    border-color: ${selectedMood?.gradient?.split(" ")[2] || "#667eea"};
  }

  .add-task-submit {
    padding: 0.75rem 1.125rem;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    color: white;
    border: none;
    border-radius: 11px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
  }

  .add-task-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }

  .empty-state {
    text-align: center;
    padding: 2.5rem 1rem;
    color: #999;
  }

  .empty-state-icon {
    margin-bottom: 0.875rem;
    display: flex;
    justify-content: center;
  }

  /* ===== RIGHT PANEL ===== */
  .right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ===== TIMER CARD ===== */
  .timer-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    color: white;
    border-radius: 18px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1.75rem;
  }

  .status-badge.break {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  .timer-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.75rem;
  }

  .control-btn {
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }

  .control-btn.primary {
    width: 72px;
    height: 72px;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    color: white;
    box-shadow: 0 8px 26px rgba(102, 126, 234, 0.4);
  }

  .control-btn.primary:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 32px rgba(102, 126, 234, 0.5);
  }

  .control-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(1);
  }

  .control-btn.secondary {
    width: 52px;
    height: 52px;
    background: #f5f5f5;
    color: #666;
  }

  .control-btn.secondary:hover {
    background: #e8e8e8;
    color: #333;
  }

  .mood-display {
    padding: 0.875rem 1.75rem;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    color: white;
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  .mood-display:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.2);
  }

  .mood-display-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }

  /* ===== PROGRESS CARD ===== */
  .progress-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 1.75rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.875rem;
  }

  .progress-header h3 {
    font-size: 1.075rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  .progress-percentage {
    font-size: 2.25rem;
    font-weight: 700;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .progress-info {
    font-size: 0.85rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .progress-bar-container {
    margin-top: 1rem;
    height: 7px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: ${
      selectedMood?.gradient ||
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    };
    transition: width 0.5s ease;
    border-radius: 4px;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1200px) {
    .app-container {
      flex-direction: column;
      padding: 1.5rem;
      gap: 1.25rem;
    }

    .task-list-card {
      flex: none;
      max-height: none;
      order: 3;
      max-width: 100%;
    }

    .timer-card {
      order: 1;
    }

    .progress-card {
      order: 2;
    }
  }

  @media (max-width: 768px) {
    .app-container {
      padding: 1rem;
      gap: 1rem;
    }

    .login-btn {
      position: static;
      margin-bottom: 1rem;
      margin-top: 1rem;
      margin-right: 1rem;
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
    }

    .control-btn.primary {
      width: 70px;
      height: 70px;
    }

    .mood-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.875rem;
    }

    .mood-selector-card {
      padding: 2rem;
    }

    .notification-popup {
      top: 1rem;
      right: 1rem;
      left: 1rem;
      max-width: none;
    }

    .task-list-card {
      padding: 1.5rem;
    }

    .timer-card {
      padding: 2rem 1.5rem;
    }

    .progress-card {
      padding: 1.5rem;
    }
  }
`}</style>

      {status !== "loading" && !session && (
        <button className="login-btn" onClick={handleLogin}>
          <LogIn size={20} />
          Login
        </button>
      )}

      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          isBreak={isBreak}
          selectedMood={selectedMood}
        />
      )}

      {showMoodSelector && (
        <MoodSelector
          selectedMood={selectedMood}
          onMoodChange={handleMoodChange}
          onClose={() => setShowMoodSelector(false)}
          showCustomConfig={showCustomConfig}
          setShowCustomConfig={setShowCustomConfig}
        />
      )}
      <div className="app-container">
        <Sidebar activePage={activePage} onPageChange={handlePageChange} />
        {renderPageContent()}
      </div>
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
      />
      <RoomModal
        isOpen={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        onRoomCreated={handleRoomCreated}
        onRoomJoined={handleRoomJoined}
      />
    </>
  );
}
