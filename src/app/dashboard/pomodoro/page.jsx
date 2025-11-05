"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
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
import Sidebar from "@/components/teste/Sidebar";
import LofiPlayer from "@/components/teste/LoFiPlayer";
import RoomsPage from "@/components/pomodoro/RoomsPage";
import RoomModal from "@/components/pomodoro/RoomModal";

// ============================================
// TASK CATEGORIES
// ============================================
const TASK_CATEGORIES = {
  trabalho: {
    id: "trabalho",
    label: "Trabalho",
    Icon: Briefcase,
    color: "#3b82f6",
  },
  "saude-fisica": {
    id: "saude-fisica",
    label: "Saúde Física",
    Icon: Dumbbell,
    color: "#10b981",
  },
  "saude-mental": {
    id: "saude-mental",
    label: "Saúde Mental",
    Icon: Heart,
    color: "#a855f7",
  },
  estudo: {
    id: "estudo",
    label: "Estudo",
    Icon: BookOpen,
    color: "#f59e0b",
  },
  pessoal: {
    id: "pessoal",
    label: "Pessoal",
    Icon: Home,
    color: "#ec4899",
  },
  outros: {
    id: "outros",
    label: "Outros",
    Icon: Pin,
    color: "#6b7280",
  },
};

// ============================================
// MOODS CONFIGURATION
// ============================================
const MOODS = {
  CREATIVE: {
    id: "creative",
    label: "Criativo",
    focusTime: 25,
    breakTime: 5,
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    icon: Brain,
    focusMessages: [
      "Deixe as ideias fluírem!",
      "Sua criatividade está no auge!",
      "Momento perfeito para inovar!",
    ],
    breakMessages: [
      "Beba água e deixe sua mente vagar",
      "Alongue os ombros e respire fundo",
      "Olhe para longe e relaxe os olhos",
    ],
  },
  UNMOTIVATED: {
    id: "unmotivated",
    label: "Desmotivado",
    focusTime: 15,
    breakTime: 5,
    gradient: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
    icon: Frown,
    focusMessages: [
      "Você consegue! Um passo de cada vez",
      "Pequenos progressos ainda são progressos",
      "Seja gentil consigo mesmo hoje",
    ],
    breakMessages: [
      "Respire fundo 3 vezes e beba água",
      "Levante e caminhe um pouco",
      "Alongue o corpo todo devagar",
    ],
  },
  STRESSED: {
    id: "stressed",
    label: "Estressado",
    focusTime: 20,
    breakTime: 7,
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    icon: Zap,
    focusMessages: [
      "Respire fundo. Você está indo bem",
      "Um passo de cada vez. Sem pressa",
      "Foco no presente, não no resultado",
    ],
    breakMessages: [
      "RESPIRE: 4 segundos dentro, 4 fora",
      "Beba água gelada devagar",
      "Alongue pescoço e ombros",
    ],
  },
  FOCUSED: {
    id: "focused",
    label: "Focado",
    focusTime: 30,
    breakTime: 5,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    icon: Smile,
    focusMessages: [
      "Foco impecável! Continue assim",
      "Você está no flow perfeito",
      "Mantenha esse ritmo incrível!",
    ],
    breakMessages: [
      "Olhe para longe por 20 segundos",
      "Beba água e hidrate-se",
      "Levante e movimente as pernas",
    ],
  },
  TIRED: {
    id: "tired",
    label: "Cansado",
    focusTime: 15,
    breakTime: 10,
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    icon: Coffee,
    focusMessages: [
      "Devagar e sempre. Você consegue",
      "Está tudo bem ir no seu ritmo",
      "Faça o que puder por agora",
    ],
    breakMessages: [
      "Beba água ou café",
      "Considere um cochilo de 5min",
      "Alongue todo o corpo",
    ],
  },
  ENERGIZED: {
    id: "energized",
    label: "Energizado",
    focusTime: 35,
    breakTime: 5,
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    icon: Battery,
    focusMessages: [
      "Energia máxima! Você está voando!",
      "Incrível! Mantenha esse ritmo",
      "Aproveite esse pico de produtividade",
    ],
    breakMessages: [
      "Beba água para manter a energia",
      "Alongamento rápido de 30 segundos",
      "Olhe pela janela e respire",
    ],
  },
  CUSTOM: {
    id: "custom",
    label: "Do Contra",
    focusTime: 25,
    breakTime: 5,
    gradient: "linear-gradient(135deg, #312e81 0%, #9333ea 100%)",
    icon: Settings,
    focusMessages: [
      "Nem sempre com vontade, mas sempre capaz.",
      "Hoje é no modo 'faço porque preciso'.",
      "Tá difícil, mas o difícil também conta.",
    ],
    breakMessages: [
      "Respira. Reclamar também é uma forma de processar.",
      "Dá um tempo, ninguém é produtivo o tempo todo.",
      "Olha pro teto por uns segundos, vai te fazer bem.",
    ],
  },
};

// ============================================
// HOOKS
// ============================================
const useTimer = (initialMinutes, onComplete) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, seconds, onComplete]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = (newMinutes) => {
    setIsActive(false);
    setSeconds(newMinutes * 60);
  };

  return { seconds, isActive, start, pause, reset };
};

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
      // Completou um pomodoro de foco
      if (tasks[currentTaskIndex] && !tasks[currentTaskIndex].completed) {
        const newTasks = [...tasks];
        newTasks[currentTaskIndex].completed = true;
        setTasks(newTasks);
      }

      // 🔥 IMPORTANTE: Calcula quantos minutos foram focados
      const minutesFocused = focusTime;

      console.log(`⏱️ Timer completo: ${minutesFocused} minutos focados`);

      // 🔥 Registrar no banco de dados
      if (session?.user) {
        try {
          const res = await fetch("/api/users/pomodoro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              focusTimeMinutes: minutesFocused,
              moodId: selectedMood?.id,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            console.log(
              `✅ Servidor respondeu: +${data.pomodorosAdded} pomodoros`
            );

            // Atualiza APENAS com o valor que veio do servidor
            setPomodorosCompleted(data.totalPomodoros);
            showNotif(`+${data.pomodorosAdded} pomodoros! 🎯`);
          } else {
            console.error("❌ Erro ao salvar no servidor");
            // Se falhar, incrementa localmente
            setPomodorosCompleted((p) => p + minutesFocused);
          }
        } catch (error) {
          console.error("❌ Erro ao registrar pomodoro:", error);
          // Se der erro, incrementa localmente
          setPomodorosCompleted((p) => p + minutesFocused);
        }
      } else {
        // Se não estiver logado, apenas incrementa localmente
        setPomodorosCompleted((p) => p + minutesFocused);
      }

      setIsBreak(true);
      timer.reset(breakTime);

      const messages = selectedMood?.breakMessages || [
        "Beba água!",
        "Alongue-se!",
        "Descanse os olhos",
      ];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      // Completou uma pausa

      // Registrar tempo de pausa no banco de dados (apenas se estiver logado)
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
            console.log(
              "🎯 Carregando pomodoros do banco:",
              data.stats.totalPomodoros
            );
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
                Seu Progresso
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
      {/* TASK LIST */}
      <div className="task-list-card">
        <div className="task-header">
          <div>
            <h2>
              Minhas Tarefas
              <span className="task-count">({tasks.length})</span>
            </h2>
          </div>
        </div>

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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0.5rem",
              }}
            >
              <Lock size={40} color="#fbbf24" />
            </div>
            <p
              style={{
                fontWeight: 600,
                color: "#1a1a1a",
                marginBottom: "0.25rem",
              }}
            >
              Suas tarefas não serão salvas
            </p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              Faça login para manter suas tarefas!
            </p>
          </div>
        )}

        <div className="tasks-container">
          {isLoadingTasks ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Wind size={48} color="#999" />
              </div>
              <p>Carregando tarefas...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <ListTodo size={48} color="#999" />
              </div>
              <p>Nenhuma tarefa ainda</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                Adicione sua primeira tarefa abaixo!
              </p>
            </div>
          ) : (
            tasks.map((task, index) => (
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
            ))
          )}
        </div>

        <div className="add-task-container">
          {showAddTask ? (
            <div>
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

              <div className="add-task-input-container">
                <input
                  type="text"
                  className="add-task-input"
                  placeholder="Digite sua tarefa..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTask()}
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
          ) : (
            <button
              className="add-task-btn"
              onClick={() => setShowAddTask(true)}
            >
              <Plus size={18} />
              Adicionar Tarefa
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="timer-card">
          <div className={`status-badge ${isBreak ? "break" : ""}`}>
            <div
              style={{
                width: 8,
                height: 8,
                background: "currentColor",
                borderRadius: "50%",
              }}
            />
            {isBreak ? "Intervalo" : "Tempo de Foco"}
          </div>

          <div
            style={{
              position: "relative",
              width: 220,
              height: 150,
              margin: "1rem auto 1.5rem",
            }}
          >
            <svg width="220" height="150" viewBox="0 0 220 150">
              <path
                d="M 10 120 A 100 100 0 0 1 210 120"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M 10 120 A 100 100 0 0 1 210 120"
                fill="none"
                stroke={
                  selectedMood
                    ? selectedMood.gradient.match(/#[a-f0-9]{6}/i)[0]
                    : "#667eea"
                }
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={314}
                strokeDashoffset={
                  314 -
                  (314 * timer.seconds) /
                    ((isBreak ? breakTime : focusTime) * 60)
                }
                style={{
                  transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
                }}
              />
            </svg>

            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}
              >
                {String(minutes).padStart(2, "0")}:
                {String(secs).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#999",
                  fontWeight: 600,
                  maxWidth: "160px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {tasks[currentTaskIndex] && !tasks[currentTaskIndex].completed
                  ? tasks[currentTaskIndex].text
                  : "Nenhuma tarefa"}
              </div>
            </div>
          </div>

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

          {selectedMood ? (
            <div
              className="mood-display"
              onClick={() => setShowMoodSelector(true)}
            >
              {React.createElement(selectedMood.icon, { size: 20 })}
              <span>Humor: {selectedMood.label}</span>
            </div>
          ) : (
            <div
              className="mood-display mood-display-pulse"
              onClick={() => setShowMoodSelector(true)}
            >
              <Sparkles size={20} />
              <span>Selecione seu humor para começar!</span>
            </div>
          )}
        </div>

        <div className="progress-card">
          <div className="progress-header">
            <h3>Progresso Diário</h3>
            <div className="progress-percentage">{progress}%</div>
          </div>
          <div className="progress-info">
            {completedTasks}/{tasks.length} tarefas concluídas •{" "}
            {pomodorosCompleted} pomodoros
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

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

  /* ===== MOOD SELECTOR ===== */
  .mood-selector-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 24px;
    padding: 2.5rem;
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
    z-index: 999;
    max-width: 560px;
    width: 90%;
    animation: fadeInScale 0.3s ease;
    transition: all 0.3s ease;
  }

  .mood-selector-card.expanded {
    max-width: 640px;
    min-height: 500px;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .mood-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 998;
  }

  .mood-selector-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .mood-selector-header h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  .mood-selector-header p {
    font-size: 0.95rem;
    color: #666;
  }

  .mood-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .mood-btn {
    padding: 1.25rem 0.875rem;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 14px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    transition: all 0.2s;
    color: #666;
  }

  .mood-btn:hover {
    border-color: #d1d5db;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .mood-btn.selected {
    border-color: transparent;
    color: white;
    transform: scale(1.03);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  .mood-label {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .mood-time {
    font-size: 0.75rem;
    opacity: 0.85;
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
        <div className="notification-popup">
          <div className="notification-icon">
            {isBreak ? <Coffee size={24} /> : <Target size={24} />}
          </div>
          <div className="notification-text">{notificationMessage}</div>
        </div>
      )}

      {showMoodSelector && (
        <>
          <div
            className="mood-overlay"
            onClick={() => {
              setShowMoodSelector(false);
              setShowCustomConfig(false);
            }}
          />
          <div
            className={`mood-selector-card ${
              showCustomConfig ? "expanded" : ""
            }`}
          >
            <div className="mood-selector-header">
              <h2>Como você está se sentindo?</h2>
              <p>Vamos ajustar o timer para seu estado de espírito</p>
            </div>

            {!showCustomConfig ? (
              <div className="mood-grid">
                {Object.values(MOODS).map((mood) => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodChange(mood)}
                      className={`mood-btn ${
                        selectedMood?.id === mood.id ? "selected" : ""
                      }`}
                      style={
                        selectedMood?.id === mood.id
                          ? { background: mood.gradient }
                          : {}
                      }
                    >
                      <Icon size={28} />
                      <span className="mood-label">{mood.label}</span>
                      <span className="mood-time">
                        {mood.id === "custom"
                          ? "Personalize"
                          : `${mood.focusTime}min foco`}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="custom-config">
                <div className="custom-config-header">
                  <Settings size={32} color="#8b5cf6" />
                  <h3>Configure seus tempos</h3>
                  <p>Defina quanto tempo você quer focar e descansar</p>
                </div>

                <div className="custom-inputs">
                  <div className="custom-input-group">
                    <label>Tempo de Foco (minutos)</label>
                    <div className="input-with-controls">
                      <button
                        onClick={() =>
                          setCustomFocusTime(Math.max(1, customFocusTime - 5))
                        }
                        className="time-control-btn"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={customFocusTime}
                        onChange={(e) =>
                          setCustomFocusTime(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="custom-time-input"
                      />
                      <button
                        onClick={() =>
                          setCustomFocusTime(Math.min(120, customFocusTime + 5))
                        }
                        className="time-control-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="custom-input-group">
                    <label>Tempo de Pausa (minutos)</label>
                    <div className="input-with-controls">
                      <button
                        onClick={() =>
                          setCustomBreakTime(Math.max(1, customBreakTime - 5))
                        }
                        className="time-control-btn"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={customBreakTime}
                        onChange={(e) =>
                          setCustomBreakTime(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="custom-time-input"
                      />
                      <button
                        onClick={() =>
                          setCustomBreakTime(Math.min(60, customBreakTime + 5))
                        }
                        className="time-control-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="custom-actions">
                  <button
                    onClick={() => setShowCustomConfig(false)}
                    className="custom-btn secondary"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleCustomMoodConfirm}
                    className="custom-btn primary"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
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
