// components/gamification/ProgressJourney.jsx
import { Star, Circle, Zap } from 'lucide-react';

export default function ProgressJourney({ 
  currentMilestone = 3, 
  milestones = [
    { id: 1, name: 'Iniciante', xp: 0, unlocked: true },
    { id: 2, name: 'Aprendiz', xp: 500, unlocked: true },
    { id: 3, name: 'Focado', xp: 1500, unlocked: true },
    { id: 4, name: 'Disciplinado', xp: 3000, unlocked: false },
    { id: 5, name: 'Mestre', xp: 5000, unlocked: false },
    { id: 6, name: 'Lendário', xp: 10000, unlocked: false }
  ]
}) {
  return (
    <div className="relative py-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-purple-200 to-gray-200 -translate-x-1/2"></div>
      
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative mb-12 last:mb-0">
          <div className={`absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
            milestone.unlocked 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-100' 
              : 'bg-gray-300 scale-90'
          }`}>
            {milestone.unlocked ? (
              <Star className="w-8 h-8 text-white fill-white" />
            ) : (
              <Circle className="w-8 h-8 text-gray-500" />
            )}
          </div>
          
          <div className={`flex ${index % 2 === 0 ? 'justify-end pr-20' : 'justify-start pl-20'} items-center`}>
            <div className={`max-w-xs p-4 rounded-xl transition-all duration-500 ${
              milestone.unlocked 
                ? 'bg-white shadow-lg border-2 border-purple-200' 
                : 'bg-gray-100 opacity-60'
            }`}>
              <h3 className="font-bold text-lg mb-1">{milestone.name}</h3>
              <p className="text-sm text-gray-600">{milestone.xp} XP necessários</p>
              {milestone.unlocked && (
                <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                  <Zap className="w-3 h-3" />
                  <span>Desbloqueado</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}