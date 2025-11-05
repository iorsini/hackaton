"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Calendar,
  TrendingUp,
  Users,
  Trophy,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ activePage, onPageChange }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/users/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .catch((err) => console.error("Erro ao buscar usuário:", err));
    }
  }, [status]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="sidebar flex items-center justify-center">
        <p className="text-gray-500 text-sm">Carregando...</p>
      </div>
    );
  }

  const isLoggedIn = session && user;

  return (
    <>
      <style jsx>{`
        .mobile-sidebar {
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-sidebar.open {
          animation: slideDown 0.3s ease-out forwards;
        }

        .mobile-sidebar.closed {
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 500px;
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            max-height: 500px;
            opacity: 1;
          }
          to {
            max-height: 0;
            opacity: 0;
          }
        }

        .hamburger-btn {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .hamburger-btn:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        .nav-item-mobile {
          color: #374151;
          transition: all 0.2s;
        }

        .nav-item-mobile:hover {
          background: #f3f4f6;
        }

        .nav-item-mobile.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .user-name-mobile {
          color: #111827;
          font-weight: 600;
        }

        .user-email-mobile {
          color: #6b7280;
          font-size: 0.875rem;
        }
      `}</style>

      {/* Botão hambúrguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hamburger-btn fixed top-4 left-4 z-50 md:hidden p-3 rounded-xl"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={24} color="#374151" />
        ) : (
          <Menu size={24} color="#374151" />
        )}
      </button>

      {/* Sidebar Mobile */}
      <div
        className={`mobile-sidebar md:hidden fixed top-16 left-4 right-4 z-40 rounded-2xl overflow-hidden ${
          isOpen ? "open" : "closed"
        }`}
        style={{ display: isOpen || undefined ? "block" : "none" }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
            <div className="logo">
              <img
                src="/images/pomofy.webp"
                alt="Logo Pomofy"
                className="w-10 h-10 object-contain"
              />
            </div>{" "}
            <h1 className="text-lg font-bold text-gray-800">Pomofy</h1>
          </div>

          {isLoggedIn ? (
            <nav className="flex flex-col py-2">
              {[
                { key: "timer", label: "Timer", icon: <Calendar size={20} /> },
                {
                  key: "progress",
                  label: "Progresso",
                  icon: <TrendingUp size={20} />,
                },
                { key: "rooms", label: "Salas", icon: <Users size={20} /> },
                {
                  key: "ranking",
                  label: "Ranking",
                  icon: <Trophy size={20} />,
                },
              ].map((item) => (
                <a
                  key={item.key}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item.key);
                    setIsOpen(false);
                  }}
                  className={`nav-item-mobile flex items-center gap-3 p-3 rounded-lg ${
                    activePage === item.key ? "active" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          ) : (
            <div className="py-4 px-2">
              <p className="text-gray-600 text-sm text-center">
                Faça login para todas as funções
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center font-bold text-white">
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div>
                    <div className="user-name-mobile">{user.name}</div>
                    <div className="user-email-mobile">{user.email}</div>
                  </div>
                </div>
                <button
                  className="text-gray-500 hover:text-red-500 transition p-2"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="flex items-center gap-3 w-full hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center font-bold text-white">
                  ?
                </div>
                <div className="flex-1">
                  <div className="user-name-mobile text-purple-600">
                    Clique para fazer login
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <div className="sidebar ml-0 md:-ml-[150px] hidden md:flex flex-col justify-between">
        <div>
          <div className="sidebar-header flex items-center gap-2 p-4">
            <img
          src="/images/pomofy.webp"
          alt="Pomofy Logo"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-green-500/30"
        />
            <h1 className="text-lg font-bold">Pomofy</h1>
          </div>

          {isLoggedIn ? (
            <nav className="sidebar-nav flex flex-col">
              {[
                { key: "timer", label: "Timer", icon: <Calendar size={20} /> },
                {
                  key: "progress",
                  label: "Progresso",
                  icon: <TrendingUp size={20} />,
                },
                { key: "rooms", label: "Salas", icon: <Users size={20} /> },
                {
                  key: "ranking",
                  label: "Ranking",
                  icon: <Trophy size={20} />,
                },
              ].map((item) => (
                <a
                  key={item.key}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item.key);
                  }}
                  className={`nav-item flex items-center gap-3 p-3 border-2 border-transparent ${
                    activePage === item.key
                      ? "text-black font-semibold" // Ativo: texto preto e sem borda
                      : "hover:border-gray-300 hover:scale-105 transition-all rounded-md" // Inativo: borda na cor de hover
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          ) : (
            <div className="px-4 py-6">
              <p className="text-gray-200 text-sm text-center">
                Faça login para todas as funções
              </p>
            </div>
          )}
        </div>

        <div className="sidebar-footer flex items-center justify-between p-4 border-t">
          {isLoggedIn ? (
            <>
              <div className="user-info flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="user-avatar w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <div className="user-details">
                  <div className="user-name font-medium">{user.name}</div>
                  <div className="user-email text-sm text-white">
                    {user.email}
                  </div>
                </div>
              </div>
              <button
                className="logout-btn text-gray-500 hover:text-red-500 transition"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="flex items-center gap-3 w-full hover:bg-gray-700 p-2 rounded-lg transition"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center font-bold text-white">
                ?
              </div>
              <div className="flex-1">
                <div className="user-name font-medium text-purple-300">
                  Clique para fazer login
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
