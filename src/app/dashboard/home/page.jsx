'use client' 

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, X, Menu, Calendar, TrendingUp, Users, Trophy, LogOut, Settings, CheckCircle2, ChevronRight } from 'lucide-react';

// ============================================
// CONSTANTS
// ============================================

const MOODS = {
  CREATIVE: { 
    id: 'creative',
    label: 'Criativo', 
    emoji: '🎨',
    color: 'mood-creative',
    gradient: 'from-purple-400 to-indigo-500'
  },
  UNMOTIVATED: { 
    id: 'unmotivated',
    label: 'Desmotivado', 
    emoji: '😔',
    color: 'mood-unmotivated',
    gradient: 'from-gray-400 to-gray-500'
  },
  STRESSED: { 
    id: 'stressed',
    label: 'Estressado', 
    emoji: '😰',
    color: 'mood-stressed',
    gradient: 'from-red-400 to-pink-500'
  },
  FOCUSED: { 
    id: 'focused',
    label: 'Focado', 
    emoji: '🎯',
    color: 'mood-focused',
    gradient: 'from-blue-400 to-cyan-500'
  },
  TIRED: { 
    id: 'tired',
    label: 'Cansado', 
    emoji: '😴',
    color: 'mood-tired',
    gradient: 'from-orange-400 to-amber-500'
  },
  ENERGIZED: { 
    id: 'energized',
    label: 'Energizado', 
    emoji: '⚡',
    color: 'mood-energized',
    gradient: 'from-green-400 to-teal-500'
  }
};

const MOTIVATIONAL_MESSAGES = [
  'Deixe as ideias fluírem! 🎨',
  'Você consegue! Um passo de cada vez 💪',
  'Respire fundo. Você está indo bem 🧘',
  'Foco impecável! Continue assim 🎯',
  'Descanse. Você merece 😴',
  'Energia máxima! Você está voando! ⚡',
  'Pequenos passos, grandes conquistas 🌟',
  'Sua energia transforma o mundo 💜'
];

const BREAK_MESSAGES = [
  'Beba um copo d\'água 💧',
  'Alongue os ombros e pescoço',
  'Olhe pela janela por um minuto',
  'Respire fundo 3 vezes',
  'Levante e caminhe um pouco',
  'Olhe para longe por 20 segundos 👀'
];

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
// COMPONENTS
// ============================================

const Sidebar = ({ user, onLogout, activePage, onPageChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">🍅</div>
        <h1>FocusFlow</h1>
      </div>
      
      <nav className="sidebar-nav">
        <a 
          href="#" 
          className={`nav-item ${activePage === 'timer' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onPageChange('timer'); }}
        >
          <Calendar size={20} />
          <span>Timer</span>
        </a>
        <a 
          href="#" 
          className={`nav-item ${activePage === 'progress' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onPageChange('progress'); }}
        >
          <TrendingUp size={20} />
          <span>Progresso</span>
        </a>
        <a 
          href="#" 
          className={`nav-item ${activePage === 'rooms' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onPageChange('rooms'); }}
        >
          <Users size={20} />
          <span>Salas</span>
        </a>
        <a 
          href="#" 
          className={`nav-item ${activePage === 'ranking' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onPageChange('ranking'); }}
        >
          <Trophy size={20} />
          <span>Ranking</span>
        </a>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user.name[0]}</div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

const MobileHeader = ({ user, onMenuToggle, onTasksToggle }) => {
  return (
    <div className="mobile-header">
      <button className="icon-btn" onClick={onMenuToggle}>
        <Menu size={24} />
      </button>
      <div className="mobile-logo">
        <span className="logo">🍅</span>
        <h1>FocusFlow</h1>
      </div>
      <button className="icon-btn" onClick={onTasksToggle}>
        <CheckCircle2 size={24} />
      </button>
    </div>
  );
};

const MobileNav = ({ isOpen, onClose, activePage, onPageChange }) => {
  if (!isOpen) return null;

  const handleNavClick = (page) => {
    onPageChange(page);
    onClose();
  };

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div className="mobile-nav" onClick={e => e.stopPropagation()}>
        <div className="mobile-nav-header">
          <h2>Menu</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <a 
            href="#" 
            className={`nav-item ${activePage === 'timer' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('timer'); }}
          >
            <Calendar size={20} />
            <span>Timer</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${activePage === 'progress' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('progress'); }}
          >
            <TrendingUp size={20} />
            <span>Progresso</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${activePage === 'rooms' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('rooms'); }}
          >
            <Users size={20} />
            <span>Salas</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${activePage === 'ranking' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('ranking'); }}
          >
            <Trophy size={20} />
            <span>Ranking</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

const MoodBanner = ({ selectedMood }) => {
  const [message] = useState(() => 
    MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
  );
  
  const mood = selectedMood || MOODS.FOCUSED;
  
  return (
    <div className={`mood-banner bg-gradient-to-r ${mood.gradient}`}>
      <span className="mood-emoji">{mood.emoji}</span>
      <p>{message}</p>
    </div>
  );
};

const MoodSelector = ({ selectedMood, onSelect }) => {
  return (
    <div className="mood-selector-container">
      <h3 className="mood-title">Como você está se sentindo?</h3>
      <div className="mood-grid">
        {Object.values(MOODS).map((mood) => {
          const isSelected = selectedMood?.id === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood)}
              className={`mood-card ${isSelected ? 'selected' : ''} ${mood.color}`}
            >
              <span className="mood-emoji-large">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TimerDisplay = ({ seconds, isBreak, progress }) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return (
    <div className="timer-display">
      <svg className="timer-circle" viewBox="0 0 200 200">
        <circle className="timer-bg" cx="100" cy="100" r="90" />
        <circle
          className="timer-progress"
          cx="100"
          cy="100"
          r="90"
          style={{
            strokeDashoffset: 565 - (565 * progress) / 100,
          }}
        />
      </svg>
      <div className="timer-content">
        <div className="timer-time">
          {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
        <div className="timer-label">
          {isBreak ? '☕ Pausa' : '🎯 Foco'}
        </div>
      </div>
    </div>
  );
};

const TimerControls = ({ isActive, onStart, onPause, onReset, onSettings }) => {
  return (
    <div className="timer-controls">
      <button className="control-btn secondary" onClick={onReset}>
        <RotateCcw size={20} />
      </button>
      <button className="control-btn primary" onClick={isActive ? onPause : onStart}>
        {isActive ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button className="control-btn secondary" onClick={onSettings}>
        <Settings size={20} />
      </button>
    </div>
  );
};

const TimerSettings = ({ isOpen, onClose, focusTime, breakTime, onSave }) => {
  const [localFocus, setLocalFocus] = useState(focusTime);
  const [localBreak, setLocalBreak] = useState(breakTime);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localFocus, localBreak);
    onClose();
  };

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h3>Configurações do Timer</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <label>Tempo de Foco (minutos)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={localFocus}
              onChange={(e) => setLocalFocus(Number(e.target.value))}
              className="setting-input"
            />
          </div>
          <div className="setting-item">
            <label>Tempo de Pausa (minutos)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={localBreak}
              onChange={(e) => setLocalBreak(Number(e.target.value))}
              className="setting-input"
            />
          </div>
        </div>
        <div className="settings-footer">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

const TaskModal = ({ isOpen, onClose, tasks, onAdd, onToggle, onDelete }) => {
  const [newTask, setNewTask] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div className="task-modal" onClick={e => e.stopPropagation()}>
        <div className="task-modal-header">
          <h3>Tarefas ({tasks.length})</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
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

        <div className="task-list">
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
    </div>
  );
};

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

const BreakMessage = ({ mood }) => {
  const [message] = useState(() => 
    BREAK_MESSAGES[Math.floor(Math.random() * BREAK_MESSAGES.length)]
  );

  return (
    <div className={`break-message bg-gradient-to-r ${mood?.gradient || 'from-green-400 to-blue-500'}`}>
      <div className="break-icon">✨</div>
      <p className="break-text">{message}</p>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function PomodoroApp() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activePage, setActivePage] = useState('timer');

  const user = {
    name: 'Artiom',
    email: 'artiom@focusflow.app'
  };

  const handleTimerComplete = () => {
    if (!isBreak) {
      setPomodorosCompleted(p => p + 1);
      setIsBreak(true);
      timer.reset(breakTime);
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Concluído! 🎉', {
          body: 'Hora de fazer uma pausa!'
        });
      }
    } else {
      setIsBreak(false);
      timer.reset(focusTime);
    }
  };

  const timer = useTimer(focusTime, handleTimerComplete);

  const progress = isBreak 
    ? ((breakTime * 60 - timer.seconds) / (breakTime * 60)) * 100
    : ((focusTime * 60 - timer.seconds) / (focusTime * 60)) * 100;

  const handleStart = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    timer.start();
  };

  const handleReset = () => {
    timer.reset(isBreak ? breakTime : focusTime);
  };

  const handleSettingsSave = (newFocus, newBreak) => {
    setFocusTime(newFocus);
    setBreakTime(newBreak);
    if (!timer.isActive) {
      timer.reset(isBreak ? newBreak : newFocus);
    }
  };

  const addTask = (text) => {
    setTasks([...tasks, { 
      id: Date.now(), 
      text, 
      completed: false,
      icon: '📝',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --color-primary: #3b82f6;
          --color-primary-dark: #2563eb;
          --color-secondary: #10b981;
          --color-danger: #ef4444;
          --color-warning: #f59e0b;
          --color-purple: #a855f7;
          
          --color-bg: #f8fafc;
          --color-surface: #ffffff;
          --color-surface-hover: #f1f5f9;
          --color-border: #e2e8f0;
          --color-text: #1e293b;
          --color-text-light: #64748b;
          
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          
          --radius-sm: 0.375rem;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --radius-xl: 1rem;
          --radius-2xl: 1.5rem;
          --radius-full: 9999px;
          
          --transition: all 0.2s ease;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--color-bg);
          color: var(--color-text);
          line-height: 1.6;
        }

        .app {
          min-height: 100vh;
          display: flex;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 280px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 100;
        }

        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--color-border);
        }

        .logo {
          font-size: 2rem;
        }

        .sidebar-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          color: var(--color-text-light);
          text-decoration: none;
          transition: var(--transition);
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--color-surface-hover);
          color: var(--color-text);
        }

        .nav-item.active {
          background: var(--color-primary);
          color: white;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--color-purple), var(--color-primary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          flex-shrink: 0;
        }

        .user-details {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.875rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 0.75rem;
          color: var(--color-text-light);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logout-btn, .icon-btn {
          padding: 0.5rem;
          border: none;
          background: var(--color-surface-hover);
          border-radius: var(--radius-md);
          cursor: pointer;
          color: var(--color-text-light);
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-btn:hover, .icon-btn:hover {
          background: var(--color-border);
          color: var(--color-text);
        }

        /* ===== MOBILE HEADER ===== */
        .mobile-header {
          display: none;
          padding: 1rem 1.25rem;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-logo h1 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        /* ===== MOBILE NAV & OVERLAYS ===== */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .mobile-nav {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 280px;
          background: var(--color-surface);
          display: flex;
          flex-direction: column;
          animation: slideInLeft 0.3s ease;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .mobile-nav-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border);
        }

        .mobile-nav-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .mobile-nav-links {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        /* ===== MAIN CONTENT ===== */
        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
          max-width: 1400px;
        }

        /* ===== MOOD BANNER ===== */
        .mood-banner {
          padding: 1.5rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-lg);
          color: white;
        }

        .mood-emoji {
          font-size: 3rem;
        }

        .mood-banner p {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        /* ===== MOOD SELECTOR ===== */
        .mood-selector-container {
          margin-bottom: 2rem;
        }

        .mood-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .mood-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .mood-card {
          padding: 1.5rem 1rem;
          border: 2px solid var(--color-border);
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .mood-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .mood-card.selected {
          border-color: transparent;
          color: white;
          box-shadow: var(--shadow-lg);
          transform: scale(1.05);
        }

        .mood-card.mood-creative.selected {
          background: linear-gradient(135deg, #a855f7, #6366f1);
        }

        .mood-card.mood-unmotivated.selected {
          background: linear-gradient(135deg, #9ca3af, #6b7280);
        }

        .mood-card.mood-stressed.selected {
          background: linear-gradient(135deg, #f87171, #ec4899);
        }

        .mood-card.mood-focused.selected {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
        }

        .mood-card.mood-tired.selected {
          background: linear-gradient(135deg, #fb923c, #f59e0b);
        }

        .mood-card.mood-energized.selected {
          background: linear-gradient(135deg, #10b981, #14b8a6);
        }

        .mood-emoji-large {
          font-size: 2.5rem;
        }

        .mood-label {
          font-weight: 600;
          font-size: 0.875rem;
        }

        /* ===== CARD ===== */
        .card {
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-md);
        }

        /* ===== TIMER ===== */
        .timer-display {
          position: relative;
          width: 100%;
          max-width: 320px;
          margin: 0 auto 2rem;
          aspect-ratio: 1;
        }

        .timer-circle {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-bg {
          fill: none;
          stroke: var(--color-border);
          stroke-width: 8;
        }

        .timer-progress {
          fill: none;
          stroke: url(#gradient);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 565;
          transition: stroke-dashoffset 1s linear;
        }

        .timer-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .timer-time {
          font-size: 4rem;
          font-weight: 700;
          color: var(--color-text);
          line-height: 1;
        }

        .timer-label {
          font-size: 1.125rem;
          color: var(--color-text-light);
          font-weight: 600;
        }

        /* ===== TIMER CONTROLS ===== */
        .timer-controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        .control-btn {
          border: none;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .control-btn.primary {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: white;
          box-shadow: var(--shadow-lg);
        }

        .control-btn.primary:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-xl);
        }

        .control-btn.secondary {
          width: 56px;
          height: 56px;
          background: var(--color-surface-hover);
          color: var(--color-text-light);
        }

        .control-btn.secondary:hover {
          background: var(--color-border);
          color: var(--color-text);
        }

        /* ===== SETTINGS MODAL ===== */
        .settings-modal, .task-modal {
          background: var(--color-surface);
          border-radius: var(--radius-2xl);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .settings-header, .task-modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .settings-header h3, .task-modal-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .settings-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .setting-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .setting-item label {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--color-text);
        }

        .setting-input {
          padding: 0.75rem;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: var(--transition);
        }

        .setting-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .settings-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--color-primary-dark);
        }

        .btn-secondary {
          background: var(--color-surface-hover);
          color: var(--color-text);
        }

        .btn-secondary:hover {
          background: var(--color-border);
        }

        /* ===== TASKS ===== */
        .task-modal {
          max-height: 80vh;
        }

        .task-input-container {
          padding: 1rem 1.5rem;
          display: flex;
          gap: 0.75rem;
          border-bottom: 1px solid var(--color-border);
        }

        .task-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          transition: var(--transition);
        }

        .task-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .btn-add {
          width: 40px;
          height: 40px;
          border: none;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .btn-add:hover {
          background: var(--color-primary-dark);
        }

        .task-list {
          padding: 1rem 1.5rem;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .task-empty {
          text-align: center;
          color: var(--color-text-light);
          padding: 2rem;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: var(--radius-lg);
          background: var(--color-surface-hover);
          transition: var(--transition);
        }

        .task-item:hover {
          background: var(--color-border);
        }

        .task-item.completed {
          opacity: 0.6;
        }

        .task-item.completed .task-text {
          text-decoration: line-through;
        }

        .task-check {
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-secondary);
          font-weight: 700;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .task-item.completed .task-check {
          background: var(--color-secondary);
          border-color: var(--color-secondary);
          color: white;
        }

        .task-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .task-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .task-text {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.875rem;
        }

        .task-time {
          font-size: 0.75rem;
          color: var(--color-text-light);
        }

        .task-delete {
          padding: 0.25rem;
          border: none;
          background: transparent;
          color: var(--color-text-light);
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .task-delete:hover {
          background: var(--color-danger);
          color: white;
        }

        .task-header {
          margin-bottom: 1.5rem;
        }

        .task-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .tasks {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        /* ===== DAILY PROGRESS ===== */
        .daily-progress {
          background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          margin-bottom: 2rem;
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
          color: var(--color-text);
        }

        .progress-percentage {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-purple);
        }

        .progress-bar {
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-purple);
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }

        .progress-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-count {
          font-weight: 700;
          color: var(--color-text);
          font-size: 1rem;
        }

        .progress-date {
          font-size: 0.875rem;
          color: var(--color-text-light);
        }

        /* ===== BREAK MESSAGE ===== */
        .break-message {
          padding: 2rem;
          border-radius: var(--radius-xl);
          color: white;
          text-align: center;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-lg);
        }

        .break-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .break-text {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        /* ===== CONTENT GRID ===== */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .left-column, .right-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .mobile-header {
            display: flex;
          }

          .main-content {
            margin-left: 0;
            padding: 1rem;
          }

          .mood-banner {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
          }

          .mood-banner p {
            font-size: 1rem;
          }

          .mood-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .timer-display {
            max-width: 280px;
          }

          .timer-time {
            font-size: 3rem;
          }

          .control-btn.primary {
            width: 64px;
            height: 64px;
          }

          .control-btn.secondary {
            width: 48px;
            height: 48px;
          }

          .card {
            padding: 1.5rem;
          }

          .mobile-overlay {
            padding: 0;
          }

          .settings-modal, .task-modal {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
          }
        }

        @media (max-width: 480px) {
          .mood-grid {
            grid-template-columns: 1fr;
          }

          .timer-display {
            max-width: 240px;
          }

          .timer-time {
            font-size: 2.5rem;
          }

          .control-btn.primary {
            width: 56px;
            height: 56px;
          }

          .control-btn.secondary {
            width: 40px;
            height: 40px;
          }

          .break-text {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>

      <div className="app">
        <Sidebar 
          user={user} 
          onLogout={() => alert('Logout!')} 
          activePage={activePage}
          onPageChange={setActivePage}
        />
        
        <MobileHeader 
          user={user} 
          onMenuToggle={() => setMobileMenuOpen(true)}
          onTasksToggle={() => setTaskModalOpen(true)}
        />
        
        <MobileNav 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
          activePage={activePage}
          onPageChange={setActivePage}
        />

        <main className="main-content">
          <MoodBanner selectedMood={selectedMood} />

          {!selectedMood && (
            <MoodSelector 
              selectedMood={selectedMood}
              onSelect={setSelectedMood}
            />
          )}

          {isBreak && <BreakMessage mood={selectedMood} />}

          <div className="content-grid">
            <div className="left-column">
              <div className="desktop-only">
                <TaskListDesktop
                  tasks={tasks}
                  onAdd={addTask}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </div>
            </div>

            <div className="right-column">
              <DailyProgress pomodorosCompleted={pomodorosCompleted} />

              <div className="card">
                <TimerDisplay 
                  seconds={timer.seconds} 
                  isBreak={isBreak}
                  progress={progress}
                />
                <TimerControls
                  isActive={timer.isActive}
                  onStart={handleStart}
                  onPause={timer.pause}
                  onReset={handleReset}
                  onSettings={() => setSettingsOpen(true)}
                />
              </div>
            </div>
          </div>
        </main>

        <TaskModal
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          tasks={tasks}
          onAdd={addTask}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <TimerSettings
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          focusTime={focusTime}
          breakTime={breakTime}
          onSave={handleSettingsSave}
        />
      </div>

      <style>{`
        .desktop-only {
          display: block;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
        }
      `}</style>
    </>
  );
}