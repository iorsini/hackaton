// components/profile/FocusInsights.jsx
import { Sun, Moon, Coffee, Zap } from 'lucide-react';

export default function FocusInsights({ 
  insights = {
    bestTimeOfDay: 'Manhã',
    averageSessionLength: 25,
    mostProductiveDay: 'Quinta-feira',
    totalBreaks: 156
  }
}) {
  const timeIcons = {
    'Manhã': Sun,
    'Tarde': Coffee,
    'Noite': Moon
  };
  
  const TimeIcon = timeIcons[insights.bestTimeOfDay] || Sun;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Insights de Foco</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
            <TimeIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">Melhor Período</h4>
            <p className="text-sm text-gray-600">Você é mais produtivo durante a {insights.bestTimeOfDay.toLowerCase()}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 bg-amber-200 rounded-full flex-1">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs font-semibold text-amber-600">85%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">Duração Média</h4>
            <p className="text-sm text-gray-600">Suas sessões duram em média {insights.averageSessionLength} minutos</p>
            <p className="text-xs text-blue-600 mt-2">Mantendo o padrão ideal do Pomodoro</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">Dia Mais Produtivo</h4>
            <p className="text-sm text-gray-600">{insights.mostProductiveDay} é o seu dia de maior desempenho</p>
            <p className="text-xs text-purple-600 mt-2">{insights.totalBreaks} pausas registradas no total</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-700 text-center">
          Continue mantendo este ritmo consistente para maximizar sua produtividade
        </p>
      </div>
    </div>
  );
}