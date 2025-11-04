const MobileNav = ({ isOpen, onClose, activePage, onPageChange }) => {
  if (!isOpen) return null;

  const handleNavClick = (page) => {
    onPageChange(page);
    onClose();
  };

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div className="mobile-nav" onClick={e => e.stopPropagation()}>
        <div className="mobile-nav-header">
          <h2>Menu</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <a 
            href="#" 
            className={`nav-item ${activePage === 'timer' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('timer'); }}
          >
            <Calendar size={20} />
            <span>Timer</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${activePage === 'progress' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('progress'); }}
          >
            <TrendingUp size={20} />
            <span>Progresso</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${activePage === 'rooms' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('rooms'); }}
          >
            <Users size={20} />
            <span>Salas</span>
          </a>
          <a 
            href="#" 
            className={`nav-item ${activePage === 'ranking' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('ranking'); }}
          >
            <Trophy size={20} />
            <span>Ranking</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav