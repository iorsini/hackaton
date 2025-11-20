"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import NotificationPopup from "@/components/pomodoro/notifications/NotificationPopup";
import MoodSelector from "@/components/pomodoro/mood/MoodSelector";
import Timer from "@/components/pomodoro/timer/Timer";
import TaskList from "@/components/pomodoro/tasks/TaskList";
import Sidebar from "@/components/teste/Sidebar";
import LofiPlayer from "@/components/teste/LoFiPlayer";
import RoomsPage from "@/components/pomodoro/RoomsPage";
import RoomModal from "@/components/pomodoro/RoomModal";

// Importa todos os estilos de uma vez
import "@/styles/pomodoro/pomodoro.css";

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
      if (tasks[currentTaskIndex] && !tasks[currentTaskIndex].completed) {
        const newTasks = [...tasks];
        newTasks[currentTaskIndex].completed = true;
        setTasks(newTasks);
      }

      if (session?.user) {
        try {
          const response = await fetch("/api/users/pomodoro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              focusTimeMinutes: focusTime,
              moodId: selectedMood?.id,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Pomodoro registrado:`, data);
            setPomodorosCompleted(data.totalPomodoros);
            showNotif(`+${data.pomodorosAdded} pomodoro(s) completado(s)! 🎯`);
          } else {
            console.error("❌ Erro ao salvar pomodoro");
            setPomodorosCompleted((prev) => prev + 1);
          }
        } catch (error) {
          console.error("❌ Erro ao registrar pomodoro:", error);
          setPomodorosCompleted((prev) => prev + 1);
        }
      } else {
        setPomodorosCompleted((prev) => prev + 1);
      }

      setIsBreak(true);
      timer.reset(breakTime);

      const messages = selectedMood?.breakMessages || [
        "Beba água! 💧",
        "Alongue-se!",
        "Descanse os olhos",
      ];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    } else {
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

      setIsBreak(false);

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
      {/* Estilos dinâmicos baseados no mood selecionado */}
      <style>{`
        body {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
        }

        .task-item.current {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
          box-shadow: 0 6px 18px rgba(102, 126, 234, 0.3);
        }

        .add-task-btn:hover {
          border-color: ${selectedMood?.gradient?.split(" ")[2] || "#667eea"};
          color: ${selectedMood?.gradient?.split(" ")[2] || "#667eea"};
          background: #f8f9ff;
        }

        .add-task-input:focus {
          border-color: ${selectedMood?.gradient?.split(" ")[2] || "#667eea"};
        }

        .add-task-submit {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
        }

        .notification-icon {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
        }

        .status-badge {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
        }

        .control-btn.primary {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
        }

        .mood-display {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
        }

          .progress-percentage {
            background-image: ${
              selectedMood?.gradient ||
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            };
          }

        .progress-bar {
          background: ${
            selectedMood?.gradient ||
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          };
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