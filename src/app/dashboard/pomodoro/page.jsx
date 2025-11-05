"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  X,
  Menu,
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
} from "lucide-react";
import Sidebar from "@/components/teste/Sidebar";
import LofiPlayer from "@/components/teste/LoFiPlayer";

// ============================================
// MOODS CONFIGURATION
// ============================================
const MOODS = {
  CREATIVE: { 
    id: 'creative',
    label: 'Criativo', 
    focusTime: 25, 
    breakTime: 5,
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    icon: Brain,
    focusMessages: [
      'Deixe as ideias fluírem! 🎨',
      'Sua criatividade está no auge!',
      'Momento perfeito para inovar!'
    ],
    breakMessages: [
      'Beba água e deixe sua mente vagar 💧',
      'Alongue os ombros e respire fundo',
      'Olhe para longe e relaxe os olhos'
    ]
  },
  UNMOTIVATED: { 
    id: 'unmotivated',
    label: 'Desmotivado', 
    focusTime: 15, 
    breakTime: 5,
    gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    icon: Frown,
    focusMessages: [
      'Você consegue! Um passo de cada vez 💪',
      'Pequenos progressos ainda são progressos',
      'Seja gentil consigo mesmo hoje'
    ],
    breakMessages: [
      'Respire fundo 3 vezes e beba água 💧',
      'Levante e caminhe um pouco',
      'Alongue o corpo todo devagar'
    ]
  },
  STRESSED: { 
    id: 'stressed',
    label: 'Estressado', 
    focusTime: 20, 
    breakTime: 7,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    icon: Zap,
    focusMessages: [
      'Respire fundo. Você está indo bem 🧘',
      'Um passo de cada vez. Sem pressa',
      'Foco no presente, não no resultado'
    ],
    breakMessages: [
      'RESPIRE: 4 segundos dentro, 4 fora 🫁',
      'Beba água gelada devagar 💧',
      'Alongue pescoço e ombros'
    ]
  },
  FOCUSED: { 
    id: 'focused',
    label: 'Focado', 
    focusTime: 30, 
    breakTime: 5,
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    icon: Smile,
    focusMessages: [
      'Foco impecável! Continue assim 🎯',
      'Você está no flow perfeito',
      'Mantenha esse ritmo incrível!'
    ],
    breakMessages: [
      'Olhe para longe por 20 segundos 👀',
      'Beba água e hidrate-se 💧',
      'Levante e movimente as pernas'
    ]
  },
  TIRED: { 
    id: 'tired',
    label: 'Cansado', 
    focusTime: 15, 
    breakTime: 10,
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    icon: Coffee,
    focusMessages: [
      'Devagar e sempre. Você consegue 😴',
      'Está tudo bem ir no seu ritmo',
      'Faça o que puder por agora'
    ],
    breakMessages: [
      'Beba água ou café ☕💧',
      'Considere um cochilo de 5min',
      'Alongue todo o corpo'
    ]
  },
  ENERGIZED: { 
    id: 'energized',
    label: 'Energizado', 
    focusTime: 35, 
    breakTime: 5,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: Battery,
    focusMessages: [
      'Energia máxima! Você está voando! ⚡',
      'Incrível! Mantenha esse ritmo',
      'Aproveite esse pico de produtividade'
    ],
    breakMessages: [
      'Beba água para manter a energia 💧',
      'Alongamento rápido de 30 segundos',
      'Olhe pela janela e respire'
    ]
  }
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
        setSeconds(s => {
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
  const [tasks, setTasks] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [newTaskText, setNewTaskText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showAddTask, setShowAddTask] = useState(false);

  const focusTime = selectedMood?.focusTime || 25;
  const breakTime = selectedMood?.breakTime || 5;

  const showNotif = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', { body: message });
    }
  };

  const handleTimerComplete = () => {
    if (!isBreak) {
      // Completar task atual
      if (tasks[currentTaskIndex] && !tasks[currentTaskIndex].completed) {
        const newTasks = [...tasks];
        newTasks[currentTaskIndex].completed = true;
        setTasks(newTasks);
      }
      
      setPomodorosCompleted(p => p + 1);
      setIsBreak(true);
      timer.reset(breakTime);
      
      const messages = selectedMood?.breakMessages || ['Beba água! 💧', 'Alongue-se!', 'Descanse os olhos'];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      setIsBreak(false);
      
      // Avançar para próxima task não completada
      const nextIndex = tasks.findIndex((t, i) => i > currentTaskIndex && !t.completed);
      if (nextIndex !== -1) {
        setCurrentTaskIndex(nextIndex);
      }
      
      timer.reset(focusTime);
      
      const messages = selectedMood?.focusMessages || ['Vamos lá! 💪', 'Foco total!'];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  const timer = useTimer(focusTime, handleTimerComplete);

  const handleStart = () => {
    if (!selectedMood) {
      showNotif('Selecione seu humor primeiro! 😊');
      setShowMoodSelector(true);
      return;
    }
    
    timer.start();
    
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    if (!isBreak) {
      const messages = selectedMood?.focusMessages || ['Foco! 💪'];
      showNotif(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  const minutes = Math.floor(timer.seconds / 60);
  const secs = timer.seconds % 60;

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setNewTaskText('');
      setShowAddTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    if (!timer.isActive) {
      timer.reset(mood.focusTime);
    }
    showNotif(`Humor "${mood.label}" selecionado! ${mood.focusTime}min de foco`);
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const handleLogin = () => {
    window.location.href = '/login';
  };

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
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
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

        /* ===== NOTIFICATION POPUP ===== */
        .notification-popup {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          animation: slideInRight 0.4s ease;
          max-width: 400px;
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
          width: 48px;
          height: 48px;
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .notification-text {
          flex: 1;
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.4;
        }

        /* ===== LOGIN BUTTON ===== */
        .login-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          padding: 0.875rem 1.5rem;
          background: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #1a1a1a;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transition: all 0.2s;
          z-index: 100;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        /* ===== MOOD SELECTOR CARD ===== */
        .mood-selector-card {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
          z-index: 999;
          max-width: 600px;
          width: 90%;
          animation: fadeInScale 0.3s ease;
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
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .mood-selector-header p {
          font-size: 1rem;
          color: #666;
        }

        .mood-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .mood-btn {
          padding: 1.5rem 1rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
          color: #666;
        }

        .mood-btn:hover {
          border-color: #d1d5db;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .mood-btn.selected {
          border-color: transparent;
          color: white;
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .mood-label {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .mood-time {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        /* ===== TASK LIST CARD ===== */
        .task-list-card {
          flex: 0 0 420px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 4rem);
        }

        .task-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .task-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .task-count {
          color: #666;
          font-size: 0.875rem;
          margin-left: 0.5rem;
        }

        .tasks-container {
          flex: 1;
          overflow-y: auto;
          margin: 1rem -0.5rem;
          padding: 0 0.5rem;
        }

        .tasks-container::-webkit-scrollbar {
          width: 6px;
        }

        .tasks-container::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 3px;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem;
          margin-bottom: 0.75rem;
          border-radius: 12px;
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
          opacity: 0.6;
        }

        .task-item.current {
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .task-item.current * {
          color: white !important;
        }

        .task-checkbox {
          width: 22px;
          height: 22px;
          border: 2px solid #ddd;
          border-radius: 6px;
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
          font-size: 0.875rem;
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
          width: 32px;
          height: 32px;
          border: none;
          background: #fee;
          color: #dc2626;
          border-radius: 8px;
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
          margin-top: 1rem;
        }

        .add-task-btn {
          width: 100%;
          padding: 0.875rem;
          border: 2px dashed #ddd;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #666;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .add-task-btn:hover {
          border-color: ${selectedMood?.gradient?.split(' ')[2] || '#667eea'};
          color: ${selectedMood?.gradient?.split(' ')[2] || '#667eea'};
          background: #f8f9ff;
        }

        .add-task-input-container {
          display: flex;
          gap: 0.5rem;
          color: gray
        }

        .add-task-input {
          flex: 1;
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }

        .add-task-input:focus {
          border-color: ${selectedMood?.gradient?.split(' ')[2] || '#667eea'};
        }

        .add-task-submit {
          padding: 0.875rem 1.25rem;
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .add-task-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #999;
        }

        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        /* ===== RIGHT PANEL ===== */
        .right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ===== PROGRESS CARD ===== */
        .progress-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .progress-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .progress-percentage {
          font-size: 2.5rem;
          font-weight: 700;
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .progress-info {
          font-size: 0.875rem;
          color: #666;
          margin-top: 0.5rem;
        }

        .progress-bar-container {
          margin-top: 1rem;
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          transition: width 0.5s ease;
          border-radius: 4px;
        }

        /* ===== TIMER CARD ===== */
        .timer-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem 2rem;
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
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          color: white;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .status-badge.break {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .timer-display {
          font-size: 7rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .timer-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
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
          width: 80px;
          height: 80px;
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          color: white;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .control-btn.primary:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
        }

        .control-btn.primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: scale(1);
        }

        .control-btn.secondary {
          width: 56px;
          height: 56px;
          background: #f5f5f5;
          color: #666;
        }

        .control-btn.secondary:hover {
          background: #e8e8e8;
          color: #333;
        }

        .mood-display {
          padding: 1rem 2rem;
          background: ${selectedMood?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
          color: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .mood-display:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
        }

        .mood-display-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1200px) {
          .app-container {
            flex-direction: column;
          }

          .task-list-card {
            flex: none;
            max-height: none;
            order: 3;
          }

          .timer-card {
            order: 1;
          }

          .progress-card {
            order: 2;
          }

          .login-btn {
            order: 0;
          }
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 1rem;
            gap: 1rem;
          }

          .login-btn {
            position: static;
            width: 100%;
            margin-bottom: 1rem;
          }

          .timer-display {
            font-size: 4.5rem;
          }

          .control-btn.primary {
            width: 70px;
            height: 70px;
          }

          .mood-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .notification-popup {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }
      `}</style>

      {/* LOGIN BUTTON */}
      <button className="login-btn" onClick={handleLogin}>
        <LogIn size={20} />
        Login
      </button>

      {/* NOTIFICATION POPUP */}
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-icon">
            {isBreak ? '☕' : '🎯'}
          </div>
          <div className="notification-text">{notificationMessage}</div>
        </div>
      )}

      {/* MOOD SELECTOR OVERLAY */}
      {showMoodSelector && (
        <>
          <div className="mood-overlay" onClick={() => setShowMoodSelector(false)} />
          <div className="mood-selector-card">
            <div className="mood-selector-header">
              <h2>Como você está se sentindo?</h2>
              <p>Vamos ajustar o timer para seu estado de espírito</p>
            </div>
            <div className="mood-grid">
              {Object.values(MOODS).map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodChange(mood)}
                    className={`mood-btn ${selectedMood?.id === mood.id ? 'selected' : ''}`}
                    style={selectedMood?.id === mood.id ? { background: mood.gradient } : {}}
                  >
                    <Icon size={28} />
                    <span className="mood-label">{mood.label}</span>
                    <span className="mood-time">{mood.focusTime}min foco</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
      
      <div className="app-container">
        {/* TASK LIST */}
        <Sidebar/>
        <div className="task-list-card">
          <div className="task-header">
            <div>
              <h2>
                Minhas Tarefas
                <span className="task-count">({tasks.length})</span>
              </h2>
            </div>
          </div>

          <div className="tasks-container">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📝</div>
                <p>Nenhuma tarefa ainda</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Adicione sua primeira tarefa abaixo!
                </p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className={`task-item ${task.completed ? 'completed' : ''} ${index === currentTaskIndex && !task.completed ? 'current' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="task-checkbox">
                    {task.completed && <Check size={14} />}
                  </div>
                  <div className="task-content">
                    <div className="task-text">{task.text}</div>
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
              <div className="add-task-input-container">
                <input
                  type="text"
                  className="add-task-input"
                  placeholder="Digite sua tarefa..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
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
                    setNewTaskText('');
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button className="add-task-btn" onClick={() => setShowAddTask(true)}>
                <Plus size={18} />
                Adicionar Tarefa
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          {/* TIMER */}
          <div className="timer-card">
            <div className={`status-badge ${isBreak ? 'break' : ''}`}>
              <div style={{ width: 8, height: 8, background: 'currentColor', borderRadius: '50%' }} />
              {isBreak ? 'Intervalo' : 'Tempo de Foco'}
            </div>

            <div className="timer-display">
              {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>

            <div className="timer-controls">
              <button className="control-btn secondary" onClick={() => timer.reset(isBreak ? breakTime : focusTime)}>
                <RotateCcw size={20} />
              </button>
              <button 
                className="control-btn primary" 
                onClick={timer.isActive ? timer.pause : handleStart}
                disabled={!selectedMood}
              >
                {timer.isActive ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: 2 }} />}
              </button>
              <button className="control-btn secondary" onClick={() => {
                setIsBreak(!isBreak);
                timer.reset(isBreak ? focusTime : breakTime);
              }}>
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
                <span>✨ Selecione seu humor para começar!</span>
              </div>
            )}
          </div>

          {/* DAILY PROGRESS */}
          <div className="progress-card">
            <div className="progress-header">
              <h3>Progresso Diário</h3>
              <div className="progress-percentage">{progress}%</div>
            </div>
            <div className="progress-info">
              {completedTasks}/{tasks.length} tarefas concluídas • {pomodorosCompleted} pomodoros
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <LofiPlayer selectedMood={selectedMood} />
        </div>
      </div>
    </>
  );
}