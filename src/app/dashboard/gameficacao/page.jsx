"use client";

import { useState } from "react";
import { ArrowLeft, Share2, TrendingUp, CheckCircle2, Clock, Calendar, Target, User, Flame, Trophy } from "lucide-react";

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedMonth, setSelectedMonth] = useState("Apr 2024");

  const periods = [
    { id: "daily", label: "Diário" },
    { id: "weekly", label: "Semanal" },
    { id: "monthly", label: "Mensal" }
  ];

  const timeDistribution = [
    { label: "Trabalho", value: 45, color: "from-blue-400 to-blue-500", hours: "30h 22m" },
    { label: "Estudos", value: 30, color: "from-purple-400 to-purple-500", hours: "20h 15m" },
    { label: "Projetos", value: 15, color: "from-green-400 to-green-500", hours: "10h 8m" },
    { label: "Lazer", value: 10, color: "from-indigo-300 to-indigo-400", hours: "6h 45m" }
  ];

  const weekDays = [
    { day: "Seg", sessions: 8, time: "4h 20m", percentage: 85 },
    { day: "Ter", sessions: 6, time: "3h 15m", percentage: 65 },
    { day: "Qua", sessions: 10, time: "5h 40m", percentage: 100 },
    { day: "Qui", sessions: 7, time: "3h 50m", percentage: 70 },
    { day: "Sex", sessions: 9, time: "4h 35m", percentage: 90 },
    { day: "Sáb", sessions: 4, time: "2h 10m", percentage: 40 },
    { day: "Dom", sessions: 3, time: "1h 30m", percentage: 30 }
  ];

  const totalFocusTime = "66h 19m";
  const tasksCompleted = 25;
  const weeklyGoal = "40h";
  const activeDays = "7/7";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 pb-24">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-800">Relatório de Progresso</h1>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-neutral-700" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Profile Stats Card */}
        <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center border-2 border-white/30 overflow-hidden">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Semana Produtiva</h2>
                <p className="text-sm text-white/80">9 Abril - 15 Abril</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-bold">Sequência de 7 dias</span>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Meta Semanal</span>
              <span className="font-semibold">{totalFocusTime} / {weeklyGoal}</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 rounded-full transition-all duration-500"
                style={{ width: "85%" }}
              />
            </div>
            <p className="text-xs text-white/70">Você está 85% mais próximo da sua meta!</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-white/70 mb-1">Tempo Total</p>
              <p className="text-2xl font-bold">{totalFocusTime}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-white/70 mb-1">Tarefas Completas</p>
              <p className="text-2xl font-bold">{tasksCompleted}</p>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                selectedPeriod === period.id
                  ? "bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-md"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-neutral-600">Tempo de foco</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-neutral-800">{totalFocusTime}</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-medium">mais que semana passada</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-green-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs font-medium text-neutral-600">Tarefas completas</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-neutral-800">{tasksCompleted}</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-medium">mais que semana passada</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-purple-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-neutral-600">Meta semanal</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-neutral-800">85%</p>
              <div className="flex items-center gap-1 text-purple-600">
                <span className="text-xs font-medium">66h de 40h</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-orange-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Flame className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-neutral-600">Dias ativos</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-neutral-800">{activeDays}</p>
              <div className="flex items-center gap-1 text-green-600">
                <span className="text-xs font-medium">Sequência perfeita</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-neutral-200">
            <h2 className="text-base font-semibold text-neutral-800 mb-4">Distribuição de tempo</h2>
            
            {/* Donut Chart Simulation */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#60A5FA" strokeWidth="20" 
                    strokeDasharray="113 251" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#A78BFA" strokeWidth="20" 
                    strokeDasharray="75 251" strokeDashoffset="-113" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#86EFAC" strokeWidth="20" 
                    strokeDasharray="38 251" strokeDashoffset="-188" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#A5B4FC" strokeWidth="20" 
                    strokeDasharray="25 251" strokeDashoffset="-226" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-neutral-800">{totalFocusTime}</p>
                  <p className="text-xs text-neutral-500 mt-1">Total</p>
                </div>
              </div>
            </div>

            {/* Legend with Progress Bars */}
            <div className="space-y-3">
              {timeDistribution.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 font-medium">{item.label}</span>
                    <span className="text-neutral-800 font-semibold">{item.hours}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-neutral-200">
            <h2 className="text-base font-semibold text-neutral-800 mb-4">Atividade semanal</h2>
            
            <div className="space-y-4">
              {weekDays.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 font-medium w-12">{day.day}</span>
                    <div className="flex-1 mx-3 bg-neutral-200 rounded-full h-8 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${day.percentage}%` }}
                      >
                        {day.percentage >= 50 && (
                          <span className="text-xs font-bold text-white">{day.sessions}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-neutral-700 font-medium text-sm w-16 text-right">{day.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Goal */}
        <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 rounded-2xl p-6 shadow-sm border border-purple-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/80 rounded-xl">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-base font-semibold text-neutral-800">Meta mensal</h2>
            </div>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-sm bg-white/80 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-700 font-medium w-full sm:w-auto"
            >
              <option>Apr 2024</option>
              <option>Mai 2024</option>
              <option>Jun 2024</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-neutral-600 mb-1">Tempo total de foco</p>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-800">150h 20m</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-600 mb-1">Meta</p>
                <p className="text-lg sm:text-xl font-semibold text-neutral-700">200h</p>
              </div>
            </div>
            
            <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 rounded-full transition-all duration-500" 
                style={{ width: "75%" }} />
            </div>
            
            <p className="text-sm text-neutral-600 text-center">75% concluído • 49h 40m restantes</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-neutral-200 px-4 sm:px-6 py-3 z-10">
        <div className="max-w-6xl mx-auto flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors">
            <div className="p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs hidden sm:block">Tarefas</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-purple-500">
            <div className="p-2 bg-purple-100 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium hidden sm:block">Progresso</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="p-4 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full shadow-lg -mt-8">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors">
            <div className="p-2 rounded-xl">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xs hidden sm:block">Gamificação</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-neutral-600 transition-colors">
            <div className="p-2 rounded-xl">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-xs hidden sm:block">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}