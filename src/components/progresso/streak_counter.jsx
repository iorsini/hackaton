// components/gamefication/StreakCounter.jsx
import { Flame, Trophy } from 'lucide-react';

export default function StreakCounter({ streak = 23, bestStreak = 45 }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">Dias de Ofensiva</span>
        </div>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-5xl font-bold">{streak}</span>
          <span className="text-xl opacity-75 mb-2">dias</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <span className="text-xs opacity-75">Recorde Pessoal</span>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">{bestStreak} dias</span>
          </div>
        </div>
      </div>
    </div>
  );
}