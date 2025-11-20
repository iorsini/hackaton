"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Leaf,
  Heart,
  Clock,
  Brain,
  Sparkles,
  ArrowLeftCircle,
} from "lucide-react";

// componentes principais
import ProfileHeader from "@/components/progresso/profile_header";
import AchievementsPanel from "@/components/progresso/achievements_panel";
import ActivityHeatmap from "@/components/progresso/activity_heatmap";
import FocusInsights from "@/components/progresso/focus_insights";
import StreakCounter from "@/components/progresso/streak_counter";
import FaqWidget from "@/components/ui/FaqWidget";

export default function ProfileDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 text-green-800 font-medium">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 text-green-900 flex flex-col items-center px-4 py-10">
      {/* Header simples e acolhedor */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-700/10 text-green-800 rounded-xl font-medium hover:bg-green-700/20 transition-all"
        >
          <ArrowLeftCircle size={18} />
          Voltar
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-green-800">
          Produtividade sem Culpa
        </h1>
            <img
          src="/images/logos.png"
          alt="Pomofy Logo"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-green-500/30"
        />
      </div>

      {/* Conteúdo principal */}
      <div className="w-full max-w-6xl space-y-10">
        <section className="bg-white/80 backdrop-blur-md border border-green-200 rounded-3xl shadow-md p-6 md:p-8">
          <ProfileHeader />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white/80 border border-green-200 rounded-3xl p-6 shadow-sm">
            <AchievementsPanel />
          </section>

          <section className="bg-white/80 border border-green-200 rounded-3xl p-6 shadow-sm">
            <ActivityHeatmap />
          </section>
        </div>

        <section className="bg-white/80 border border-green-200 rounded-3xl p-6 shadow-sm">
          <FocusInsights />
        </section>

        <section className="bg-white/80 border border-green-200 rounded-3xl p-6 shadow-sm">
          <StreakCounter />
        </section>
      </div>
      <FaqWidget/>
    </div>
  );
}
