"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Plus, X, Coffee, Brain, Battery, Zap, Frown, Smile } from 'lucide-react';

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
const MoodSelector = ({ selectedMood, onSelect, disabled }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Como você está se sentindo?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.values(MOODS).map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood?.id === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood)}
              disabled={disabled}
              className={`
                p-4 rounded-xl border-2 transition-all
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
    <div className="text-center mb-8">
      <div className={`text-8xl font-bold mb-4 ${isBreak ? 'text-green-500' : 'text-blue-600'}`}>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      <div className={`text-2xl font-medium ${isBreak ? 'text-green-600' : 'text-gray-600'}`}>
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
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Tarefas deste ciclo</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Adicionar tarefa..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-4">Nenhuma tarefa ainda</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                disabled={!isBreak}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
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
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl p-8 shadow-xl mb-8 text-center">
      <div className="text-3xl mb-4">✨</div>
      <p className="text-2xl font-medium">{currentMessage}</p>
    </div>
  );
};

// ============ MAIN APP ============
export default function PomodoroApp() {
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
      // Notificação
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Concluído! 🎉', {
          body: 'Hora de fazer uma pausa!'
        });
      }
    } else {
      setIsBreak(false);
      timer.reset(focusTime);
      // Save session here if logged in
    }
  };

  const timer = useTimer(focusTime, handleTimerComplete);

  const handleStart = () => {
    if (!sessionStarted) {
      setSessionStarted(true);
      // Request notification permission
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">FocusFlow</h1>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {!sessionStarted && (
          <MoodSelector 
            selectedMood={selectedMood} 
            onSelect={setSelectedMood}
            disabled={sessionStarted}
          />
        )}

        {isBreak && <BreakMessages mood={selectedMood} />}

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <TimerDisplay seconds={timer.seconds} isBreak={isBreak} />

          <div className="flex justify-center gap-4 mb-8">
            {!timer.isActive ? (
              <button
                onClick={handleStart}
                disabled={!selectedMood}
                className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold text-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Play className="w-6 h-6" />
                Iniciar
              </button>
            ) : (
              <button
                onClick={timer.pause}
                className="px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors font-semibold text-lg flex items-center gap-2 shadow-lg"
              >
                <Pause className="w-6 h-6" />
                Pausar
              </button>
            )}
            
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-semibold text-lg flex items-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-6 h-6" />
              Resetar
            </button>
          </div>

          {isBreak && tasks.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium text-center">
                💡 Marque as tarefas que você conseguiu completar!
              </p>
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
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>Feito com 💙 para melhorar sua produtividade</p>
      </footer>
    </div>
  );
}