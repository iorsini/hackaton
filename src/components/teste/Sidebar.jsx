import { Play, Pause, RotateCcw, Plus, X, Menu, Calendar, TrendingUp, Users, Trophy, LogOut, Settings, CheckCircle2, ChevronRight } from 'lucide-react';


export default function Sidebar({ user, onLogout, activePage, onPageChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">🍅</div>
        <h1>FocusFlow</h1>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#"
          className={`nav-item ${activePage === "timer" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange("timer");
          }}
        >
          <Calendar size={20} />
          <span>Timer</span>
        </a>
        <a
          href="#"
          className={`nav-item ${activePage === "progress" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange("progress");
          }}
        >
          <TrendingUp size={20} />
          <span>Progresso</span>
        </a>
        <a
          href="#"
          className={`nav-item ${activePage === "rooms" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange("rooms");
          }}
        >
          <Users size={20} />
          <span>Salas</span>
        </a>
        <a
          href="#"
          className={`nav-item ${activePage === "ranking" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange("ranking");
          }}
        >
          <Trophy size={20} />
          <span>Ranking</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user.name[0]}</div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
