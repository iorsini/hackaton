import { Play, Pause, RotateCcw, Plus, X, Menu, Calendar, TrendingUp, Users, Trophy, LogOut, Settings, CheckCircle2, ChevronRight } from 'lucide-react';

const MobileHeader = ({ user, onMenuToggle, onTasksToggle }) => {
  return (
    <div className="mobile-header">
      <button className="icon-btn" onClick={onMenuToggle}>
        <Menu size={24} />
      </button>
      <div className="mobile-logo">
        <span className="logo">🍅</span>
        <h1>FocusFlow</h1>
      </div>
      <button className="icon-btn" onClick={onTasksToggle}>
        <CheckCircle2 size={24} />
      </button>
    </div>
  );
};

export default MobileHeader