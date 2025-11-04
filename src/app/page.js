"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Plus, X, Coffee, Brain, Battery, Zap, Frown, Smile, Github, LogOut, User } from 'lucide-react';

// ============ CONSTANTS ============
const MOODS = {
  CREATIVE: { 
    id: 'creative',
    label: 'Criativo', 
    focusTime: 25, 
    breakTime: 5,
    color: 'bg-purple-500',
    icon: Brain,
    messages: [
      'Deixe as ideias fluírem! 🎨',
      'Sua criatividade está no auge!',
      'Respire e imagine novas possibilidades'
    ]
  },
  UNMOTIVATED: { 
    id: 'unmotivated',
    label: 'Desmotivado', 
    focusTime: 15, 
    breakTime: 5,
    color: 'bg-gray-500',
    icon: Frown,
    messages: [
      'Você consegue! Um passo de cada vez 💪',
      'Pequenos progressos ainda são progressos',
      'Seja gentil consigo mesmo hoje'
    ]
  },
  STRESSED: { 
    id: 'stressed',
    label: 'Estressado', 
    focusTime: 20, 
    breakTime: 7,
    color: 'bg-red-500',
    icon: Zap,
    messages: [
      'Respire fundo. Você está indo bem 🧘',
      'Alongue o pescoço e ombros',
      'Beba água e relaxe por um momento'
    ]
  },
  FOCUSED: { 
    id: 'focused',
    label: 'Focado', 
    focusTime: 30, 
    breakTime: 5,
    color: 'bg-blue-500',
    icon: CheckCircle2,
    messages: [
      'Foco impecável! Continue assim 🎯',
      'Você está no flow perfeito',
      'Olhe para longe por 20 segundos'
    ]
  },
  TIRED: { 
    id: 'tired',
    label: 'Cansado', 
    focusTime: 15, 
    breakTime: 10,
    color: 'bg-orange-500',
    icon: Coffee,
    messages: [
      'Descanse. Você merece 😴',
      'Considere um cochilo rápido',
      'Alongue o corpo todo'
    ]
  },
  ENERGIZED: { 
    id: 'energized',
    label: 'Energizado', 
    focusTime: 35, 
    breakTime: 5,
    color: 'bg-green-500',
    icon: Battery,
    messages: [
      'Energia máxima! Você está voando! ⚡',
      'Incrível! Mantenha esse ritmo',
      'Aproveite esse pico de produtividade'
    ]
  }
};

const GENERAL_MESSAGES = [
  'Beba um copo d\'água 💧',
  'Alongue os ombros',
  'Olhe pela janela por um minuto',
  'Respire fundo 3 vezes',
  'Levante e caminhe um pouco'
];

// ============ CUSTOM HOOK ============
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

// ============ COMPONENTS ============
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ name: email.split('@')[0], email, avatar: null });
    }
  };

  const handleOAuthLogin = (provider) => {
    onLogin({ 
      name: `User via ${provider}`, 
      email: `user@${provider}.com`,
      avatar: null 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FocusFlow</h1>
          <p className="text-blue-200">Pomodoro adaptado ao seu humor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            Entrar
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-blue-200">ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuthLogin('github')}
            className="py-3 px-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>
          <button
            onClick={() => handleOAuthLogin('google')}
            className="py-3 px-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

const MoodSelector = ({ selectedMood, onSelect, disabled }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Como você está se sentindo?</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.values(MOODS).map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood?.id === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood)}
              disabled={disabled}
              className={`
                p-4 rounded-2xl border-2 transition-all
                ${isSelected 
                  ? `${mood.color} text-white border-transparent shadow-lg scale-105` 
                  : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'}
              `}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">{mood.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TimerDisplay = ({ seconds, isBreak }) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return (
    <div className="text-center mb-6">
      <div className={`text-6xl md:text-8xl font-bold mb-3 ${isBreak ? 'text-green-500' : 'text-blue-600'} tabular-nums`}>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      <div className={`text-xl md:text-2xl font-medium ${isBreak ? 'text-green-600' : 'text-gray-600'}`}>
        {isBreak ? '☕ Pausa' : '🎯 Foco'}
      </div>
    </div>
  );
};

const TaskList = ({ tasks, onAdd, onToggle, onDelete, isBreak }) => {
  const [newTask, setNewTask] = useState('');

  const handleAdd = () => {
    if (newTask.trim()) {
      onAdd(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Tarefas</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nova tarefa..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-4 text-sm">Nenhuma tarefa ainda</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-2 p-3 rounded-lg border ${
                task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                disabled={!isBreak}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task.text}
              </span>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const BreakMessages = ({ mood }) => {
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const messages = mood ? [...mood.messages, ...GENERAL_MESSAGES] : GENERAL_MESSAGES;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
  }, [mood]);

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl p-6 md:p-8 shadow-xl mb-6 text-center">
      <div className="text-3xl mb-4">✨</div>
      <p className="text-xl md:text-2xl font-medium">{currentMessage}</p>
    </div>
  );
};

// ============ MAIN APP ============
export default function PomodoroApp() {
  const [user, setUser] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sessionStarted, setSessionStarted] = useState(false);

  const focusTime = selectedMood?.focusTime || 25;
  const breakTime = selectedMood?.breakTime || 5;

  const handleTimerComplete = () => {
    if (!isBreak) {
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

  useEffect(() => {
    if (selectedMood && !sessionStarted) {
      timer.reset(selectedMood.focusTime);
    }
  }, [selectedMood]);

  const handleStart = () => {
    if (!sessionStarted) {
      setSessionStarted(true);
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
    timer.start();
  };

  const handleReset = () => {
    timer.reset(isBreak ? breakTime : focusTime);
    setSessionStarted(false);
  };

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">FocusFlow</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span className="font-medium">{user.name}</span>
            </div>
            <button 
              onClick={() => setUser(null)}
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Timer (first on mobile) */}
          <div className="order-1 space-y-6">
            {isBreak && <BreakMessages mood={selectedMood} />}

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <TimerDisplay seconds={timer.seconds} isBreak={isBreak} />

              <div className="flex justify-center gap-3 mb-6">
                {!timer.isActive ? (
                  <button
                    onClick={handleStart}
                    disabled={!selectedMood}
                    className="px-6 md:px-8 py-3 md:py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold text-base md:text-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6" />
                    Iniciar
                  </button>
                ) : (
                  <button
                    onClick={timer.pause}
                    className="px-6 md:px-8 py-3 md:py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors font-semibold text-base md:text-lg flex items-center gap-2 shadow-lg"
                  >
                    <Pause className="w-5 h-5 md:w-6 md:h-6" />
                    Pausar
                  </button>
                )}
                
                <button
                  onClick={handleReset}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-semibold text-base md:text-lg flex items-center gap-2 shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
                  Resetar
                </button>
              </div>

              {selectedMood && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                    <selectedMood.icon className="w-5 h-5" />
                    <span className="font-medium text-gray-700">{selectedMood.label}</span>
                    <span className="text-gray-500 text-sm">
                      {selectedMood.focusTime}min / {selectedMood.breakTime}min
                    </span>
                  </div>
                </div>
              )}
            </div>

            <TaskList
              tasks={tasks}
              onAdd={addTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
              isBreak={isBreak}
            />
          </div>

          {/* Right Column - Mood Selector (second on mobile) */}
          <div className="order-2">
            <MoodSelector 
              selectedMood={selectedMood} 
              onSelect={setSelectedMood}
              disabled={sessionStarted}
            />
            
            {!sessionStarted && selectedMood && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mt-4">
                <p className="text-blue-800 font-medium text-center text-sm">
                  💡 Seu período de foco será de {selectedMood.focusTime} minutos com {selectedMood.breakTime} minutos de pausa
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 md:py-8 text-gray-500 text-sm">
        <p>Feito com 💙 para melhorar sua produtividade</p>
      </footer>
    </div>
  );
}