// components/gamefication/AchievementsPanel.jsx
import { Trophy } from 'lucide-react';

export default function AchievementsPanel({ 
  achievements = [
    { id: 1, name: 'Primeira Semana', description: 'Complete 7 dias consecutivos', unlocked: true, date: '2024-10-28' },
    { id: 2, name: 'Maratonista', description: 'Complete 50 pomodoros', unlocked: true, date: '2024-11-01' },
    { id: 3, name: 'Foco Inabalável', description: 'Complete 10 pomodoros em um dia', unlocked: false },
    { id: 4, name: 'Mestre do Tempo', description: 'Acumule 100 horas de foco', unlocked: false }
  ]
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Conquistas</h3>
      
      {achievements.map((achievement) => (
        <div 
          key={achievement.id}
          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
            achievement.unlocked 
              ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200' 
              : 'bg-gray-50 border-2 border-gray-200 opacity-60'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            achievement.unlocked 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
              : 'bg-gray-300'
          }`}>
            <Trophy className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
            <p className="text-sm text-gray-600">{achievement.description}</p>
            {achievement.unlocked && achievement.date && (
              <p className="text-xs text-gray-500 mt-1">
                Desbloqueado em {new Date(achievement.date).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
          
          {!achievement.unlocked && (
            <div className="text-xs text-gray-400">Bloqueado</div>
          )}
        </div>
      ))}
    </div>
  );
}