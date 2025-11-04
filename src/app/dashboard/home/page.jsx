// src/app/dashboard/home/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Home, User, Settings, Info, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const menuItems = [
    { icon: Home, label: "Home", href: "/dashboard/home", active: true },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: Info, label: "About", href: "/dashboard/about" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-secondary border-b border-gray-700">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-white text-2xl font-bold">Dashboard</h2>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center overflow-hidden">
              {session.user.avatar || session.user.image ? (
                <img
                  src={session.user.avatar || session.user.image}
                  alt={session.user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="p-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 border border-accent/30 rounded-3xl p-8 backdrop-blur-sm">
              <h1 className="text-white text-3xl font-bold mb-2">
                Welcome back, {session.user.name}! 👋
              </h1>
              <p className="text-gray-400">
                You're logged in as {session.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  relative group
                  bg-gradient-to-br from-gray-800/50 to-gray-900/50
                  border ${item.active ? "border-accent/50" : "border-gray-700/50"}
                  rounded-2xl p-6
                  hover:border-accent/70 transition-all
                  flex flex-col items-center gap-3
                `}
              >
                <div
                  className={`
                  w-14 h-14 rounded-xl
                  ${item.active ? "bg-accent" : "bg-gray-700"}
                  flex items-center justify-center
                  group-hover:scale-110 transition-transform
                `}
                >
                  <item.icon className="text-white" size={24} />
                </div>
                <span className="text-white font-semibold">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-500 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}