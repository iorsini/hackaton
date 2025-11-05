'use client'

import React, { useState, useEffect } from "react";
import { LogIn, LogOut, User, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

// Componente Navbar
function Navbar() {
  const { data: session, status } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileMenu && !e.target.closest('.profile-section')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/dashboard/pomodoro' });
      setShowProfileMenu(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfile = () => {
    window.location.href = "/dashboard/profile";
  };

  // Loading state
  if (status === 'loading') {
    return (
      <>
        <style>{`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }
          .navbar-container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            overflow: hidden;
          }
          .logo-image {
            height: 40px;
            width: auto;
            object-fit: contain;
          }
          .loading-skeleton {
            width: 100px;
            height: 40px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 12px;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="logo-icon">
              <img
                src="/images/pomofy.webp"
                alt="Pomofy logo"
                className="logo-image"
              />
            </div>
            <div className="loading-skeleton"></div>
          </div>
        </nav>
      </>
    );
  }

  const user = session?.user;

  return (
    <>
      <style>{`
        .logo-image {
          height: 40px;
          width: auto;
          object-fit: contain;
        }
        
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .navbar-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #1a1a1a;
          font-weight: 700;
          font-size: 1.25rem;
          transition: all 0.2s;
        }

        .navbar-logo:hover {
          transform: translateY(-2px);
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          overflow: hidden;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
          justify-content: flex-end;
        }

        .navbar-link {
          color: #666;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          position: relative;
        }

        .navbar-link:hover {
          color: #667eea;
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: scaleX(0);
          transition: transform 0.2s;
        }

        .navbar-link:hover::after {
          transform: scaleX(1);
        }

        .login-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .profile-section {
          position: relative;
        }

        .profile-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .profile-button:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e5e7eb;
        }

        .profile-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #1a1a1a;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 220px;
          overflow: hidden;
          animation: slideDown 0.2s ease;
          border: 1px solid #e5e7eb;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .dropdown-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }

        .dropdown-email {
          font-size: 0.8rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-item {
          padding: 0.875rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #666;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .dropdown-item:hover {
          background: #f8f9ff;
          color: #667eea;
        }

        .dropdown-item.logout {
          color: #dc2626;
          border-top: 1px solid #f0f0f0;
        }

        .dropdown-item.logout:hover {
          background: #fef2f2;
        }

        .mobile-menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          border: none;
          background: #f5f5f5;
          border-radius: 10px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: all 0.2s;
        }

        .mobile-menu-btn:hover {
          background: #e8e8e8;
          color: #333;
        }

        .mobile-menu {
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 1.5rem 2rem;
          animation: slideDown 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-radius: 0 0 24px 24px;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-menu .navbar-link {
          padding: 0.75rem;
          display: block;
        }

        .mobile-menu .login-btn {
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar-container {
            padding: 1rem;
          }

          .navbar-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .profile-name {
            display: none;
          }

          .profile-button {
            padding: 0.5rem;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <a href="/dashboard/pomodoro" className="navbar-logo">
            <div className="logo-icon">
              <img
                src="/images/pomofy.webp"
                alt="Pomofy logo"
                className="logo-image"
              />
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <a href="#sobre" className="navbar-link">
              Sobre nós
            </a>

            {user ? (
              <div className="profile-section">
                <button
                  className="profile-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileMenu(!showProfileMenu);
                  }}
                >
                  <img
                    src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt={user.name || 'User'}
                    className="profile-avatar"
                  />
                  <span className="profile-name">{user.name || 'Usuário'}</span>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-name">{user.name || 'Usuário'}</div>
                      <div className="dropdown-email">{user.email}</div>
                    </div>
                    <button className="dropdown-item" onClick={handleProfile}>
                      <User size={18} />
                      Ver Perfil
                    </button>
                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-btn" onClick={handleLogin}>
                <LogIn size={18} />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a href="#sobre" className="navbar-link">
                Sobre nós
              </a>

              {user ? (
                <>
                  <button className="dropdown-item" onClick={handleProfile}>
                    <User size={18} />
                    Ver Perfil
                  </button>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </>
              ) : (
                <button className="login-btn" onClick={handleLogin}>
                  <LogIn size={18} />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;