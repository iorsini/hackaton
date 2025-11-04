// components/profile/WeeklyStats.jsx
import { TrendingUp, Award, Activity } from 'lucide-react';

export default function WeeklyStats({ 
  stats = {
    weeklyTotal: 42,
    dailyAverage: 6,
    bestDay: { day: 'Quarta', count: 12 },
    improvement: 18
  }
}) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const weekData = [3, 5, 8, 12, 7, 4, 3];
  const maxValue = Math.max(...weekData);
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Estatísticas da Semana</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
          <Activity className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.weeklyTotal}</div>
          <div className="text-xs text-gray-600 mt-1">Total Semanal</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <Award className="w-5 h-5 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.dailyAverage}</div>
          <div className="text-xs text-gray-600 mt-1">Média Diária</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">+{stats.improvement}%</div>
          <div className="text-xs text-gray-600 mt-1">Crescimento</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Atividade por Dia</h4>
        {days.map((day, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-8">{day}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${(weekData[index] / maxValue) * 100}%` }}
              >
                {weekData[index] > 0 && (
                  <span className="text-xs text-white font-semibold">{weekData[index]}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600">Melhor dia da semana</p>
            <p className="text-lg font-bold text-gray-800">{stats.bestDay.day}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-600">{stats.bestDay.count}</p>
            <p className="text-xs text-gray-600">pomodoros</p>
          </div>
        </div>
      </div>
    </div>
  );
}