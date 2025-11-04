"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Calendar,
  TrendingUp,
  Users,
  Trophy,
  LogOut,
} from "lucide-react";

export default function Sidebar({ activePage, onPageChange }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  // Carrega o usuário do banco de dados
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
    await signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") {
    return (
      <div className="sidebar flex items-center justify-center">
        <p className="text-gray-500 text-sm">Carregando...</p>
      </div>
    );
  }

  if (!session || !user) {
    return (
      <div className="sidebar flex items-center justify-center">
        <p className="text-gray-500 text-sm">Nenhuma sessão ativa</p>
      </div>
    );
  }

  return (
    <div className="sidebar flex flex-col justify-between">
      <div>
        <div className="sidebar-header flex items-center gap-2 p-4">
          <div className="logo text-2xl">🍅</div>
          <h1 className="text-lg font-bold">FocusFlow</h1>
        </div>

        <nav className="sidebar-nav flex flex-col">
          {[
            { key: "timer", label: "Timer", icon: <Calendar size={20} /> },
            { key: "progress", label: "Progresso", icon: <TrendingUp size={20} /> },
            { key: "rooms", label: "Salas", icon: <Users size={20} /> },
            { key: "ranking", label: "Ranking", icon: <Trophy size={20} /> },
          ].map((item) => (
            <a
              key={item.key}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item.key);
              }}
              className={`nav-item flex items-center gap-3 p-3 hover:bg-gray-100 transition rounded-md ${
                activePage === item.key ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer flex items-center justify-between p-4 border-t">
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
            <div className="user-email text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <button
          className="logout-btn text-gray-500 hover:text-red-500 transition"
          onClick={handleLogout}
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
