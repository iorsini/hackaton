"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Brain,
  Gamepad2,
  Focus,
  Store,
  TrendingUp,
  User,
  Info,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  // 🔹 Lista de páginas
  const menuItems = [
    { key: "testesfoco", label: "Foco e Concentração", icon: <Focus size={20} />, path: "/dashboard/testefoco" },
    { key: "desenvolvimento", label: "Técnica de Produtividade", icon: <Brain size={20} />, path: "/dashboard/desenvolvimento" },
    { key: "Store", label: "Store", icon: <Store size={20} />, path: "/dashboard/store" },
    { key: "Sobre a Pomofy", label: "Sobre a Pomofy", icon: <Info size={20} />, path: "/dashboard/sobre" },
  ];

  return (
    <>
      {/* Botão hambúrguer (mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hamburger-btn fixed top-4 left-4 z-50 md:hidden p-3 rounded-xl bg-white shadow-md"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} color="#374151" /> : <Menu size={24} color="#374151" />}
      </button>

      {/* Sidebar Mobile */}
      {isOpen && (
        <div className="mobile-sidebar md:hidden fixed top-16 left-4 right-4 z-40 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
              <img
                src="/images/pomofy.webp"
                alt="Logo Pomofy"
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-lg font-bold text-gray-800">Pomofy</h1>
            </div>

            {isLoggedIn ? (
              <nav className="flex flex-col py-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition ${
                      pathname === item.path
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            ) : (
              <div className="py-4 text-center text-gray-600">
                Faça login para todas as funções
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard/profile" className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                        {user.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    ?
                  </div>
                  <span className="text-purple-600 font-medium">Clique para fazer login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-col justify-between w-64 bg-white border-r rounded-xl max-h-[calc(100vh-4rem)] h-screen">
        <div>
          <div className="flex items-center gap-3 p-4 border-b">
            <img
              src="/images/pomofy.webp"
              alt="Pomofy Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="text-lg font-bold text-gray-800">Pomofy</h1>
          </div>

          {isLoggedIn ? (
            <nav className="flex flex-col mt-2">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`flex items-center gap-3 p-3 rounded-md mx-2 my-1 transition ${
                    pathname === item.path
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          ) : (
            <div className="px-4 py-6 text-center text-gray-400">
              Faça login para todas as funções
            </div>
          )}
        </div>

        {/* Rodapé da sidebar */}
        <div className="p-4 border-t flex items-center justify-between">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard/profile" className="flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </Link>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                ?
              </div>
              <span className="text-purple-600 font-medium">Fazer login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
