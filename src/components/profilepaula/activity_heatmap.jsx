// components/profile/ActivityHeatmap.jsx
import { useState } from 'react';

function generateMockActivities() {
  const activities = [];
  const today = new Date();
  
  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    activities.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 9)
    });
  }
  
  return activities;
}

export default function ActivityHeatmap({ activities = generateMockActivities() }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  
  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-green-200';
    if (count <= 4) return 'bg-green-400';
    if (count <= 6) return 'bg-green-600';
    return 'bg-green-800';
  };
  
  const weeks = [];
  for (let i = 0; i < 12; i++) {
    weeks.push(activities.slice(i * 7, (i + 1) * 7));
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Atividade nos Últimos 3 Meses</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Menos</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100"></div>
            <div className="w-3 h-3 rounded-sm bg-green-200"></div>
            <div className="w-3 h-3 rounded-sm bg-green-400"></div>
            <div className="w-3 h-3 rounded-sm bg-green-600"></div>
            <div className="w-3 h-3 rounded-sm bg-green-800"></div>
          </div>
          <span>Mais</span>
        </div>
      </div>
      
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count)} hover:ring-2 ring-purple-400 transition-all cursor-pointer`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      
      {hoveredDay && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{hoveredDay.count} pomodoros</span> em {new Date(hoveredDay.date).toLocaleDateString('pt-BR')}
          </p>
        </div>
      )}
    </div>
  );
}