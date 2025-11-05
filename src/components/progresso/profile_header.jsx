// components/profile/ProfileHeader.jsx
import { Zap } from 'lucide-react';

export default function ProfileHeader({ 
  userName = 'Foco Máximo',
  level = 12,
  currentXP = 450,
  nextLevelXP = 1000,
  motivationalQuote = 'A disciplina é a ponte entre objetivos e realizações'
}) {
  const progress = (currentXP / nextLevelXP) * 100;
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{userName}</h1>
            <p className="text-white/80 text-sm italic">{motivationalQuote}</p>
          </div>
          
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-2">
              <Zap className="w-4 h-4" />
              <span className="font-bold text-lg">Nível {level}</span>
            </div>
            <div className="text-xs text-white/70">{currentXP} / {nextLevelXP} XP</div>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}