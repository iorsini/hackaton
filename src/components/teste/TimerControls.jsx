import { Play, Pause, RotateCcw, Plus, X, Menu, Calendar, TrendingUp, Users, Trophy, LogOut, Settings, CheckCircle2, ChevronRight } from 'lucide-react';


const TimerControls = ({ isActive, onStart, onPause, onReset, onSettings }) => {
  return (
    <div className="timer-controls">
      <button className="control-btn secondary" onClick={onReset}>
        <RotateCcw size={20} />
      </button>
      <button className="control-btn primary" onClick={isActive ? onPause : onStart}>
        {isActive ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button className="control-btn secondary" onClick={onSettings}>
        <Settings size={20} />
      </button>
    </div>
  );
};

export default TimerControls