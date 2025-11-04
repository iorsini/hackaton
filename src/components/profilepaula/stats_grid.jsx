// components/gamification/StatsGrid.jsx
import { Target, Clock, TrendingUp, Award } from 'lucide-react';

export default function StatsGrid({ 
  stats = {
    pomodorosToday: 8,
    totalPomodoros: 234,
    focusTime: 186,
    weeklyGoal: 75
  }
}) {
  const cards = [
    {
      icon: Target,
      label: 'Pomodoros Hoje',
      value: stats.pomodorosToday,
      color: 'from-blue-500 to-cyan-500',
      suffix: ''
    },
    {
      icon: Clock,
      label: 'Tempo Total',
      value: stats.focusTime,
      color: 'from-purple-500 to-pink-500',
      suffix: 'h'
    },
    {
      icon: TrendingUp,
      label: 'Meta Semanal',
      value: stats.weeklyGoal,
      color: 'from-green-500 to-emerald-500',
      suffix: '%'
    },
    {
      icon: Award,
      label: 'Total de Sessões',
      value: stats.totalPomodoros,
      color: 'from-orange-500 to-red-500',
      suffix: ''
    }
  ];
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div 
            key={index}
            className="relative overflow-hidden rounded-xl bg-white p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`}></div>
            
            <div className="relative">
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${card.color} mb-3`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-gray-800">{card.value}</span>
                {card.suffix && <span className="text-lg text-gray-500 mb-1">{card.suffix}</span>}
              </div>
              
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}