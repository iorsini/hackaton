// src/app/dashboard/profiledatas/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Importando os componentes
import AchievementsPanel from "@/components/profilepaula/achievements_panel";
import ActivityHeatmap from "@/components/profilepaula/activity_heatmap";
import FocusInsights from "@/components/profilepaula/focus_insights";
import ProfileHeader from "@/components/profilepaula/profile_header";
import ProgressJourney from "@/components/profilepaula/progress_journey";
import StatsGrid from "@/components/profilepaula/stats_grid";
import StreakCounter from "@/components/profilepaula/streak_counter";
import WeeklyStats from "@/components/profilepaula/weekly_stats";

const TestePage = () => {
  const { data: session, status } = useSession(); // Verifica a sessão
  const router = useRouter(); // Usado para navegação, se necessário

  // Estado local para armazenar dados (se necessário)
  const [data, setData] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar dados
    const fetchData = async () => {
      const res = await fetch('/api/data'); // Substitua pelo seu endpoint real
      const result = await res.json();
      setData(result); // Atualiza o estado após o componente ser montado
    };

    if (status === "unauthenticated") {
      router.push("/login"); // Redireciona para a página de login, caso não esteja autenticado
    }

    fetchData(); // Chama a função fetch para obter dados

    // Retorna uma função de limpeza para evitar atualizações de estado após o componente ser desmontado
    return () => {
      // Qualquer lógica de limpeza pode ser colocada aqui (não necessária para este exemplo)
    };
  }, [status, router]); // Executa o efeito sempre que o status ou router mudar

  return (
    <div className="container mx-auto p-4">
      {/* Renderizando o cabeçalho do perfil */}
      <ProfileHeader />

      {/* Renderizando os outros componentes */}
      <AchievementsPanel />
      <ActivityHeatmap />
      <FocusInsights />
      <ProgressJourney />
      <StatsGrid />
      <StreakCounter />
      <WeeklyStats />

      {/* Exibindo dados carregados, se houver */}
      <div className="mt-4">
        {data ? (
          <h2>Dados Carregados: {data.message}</h2>
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
    </div>
  );
};

export default TestePage;
