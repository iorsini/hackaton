import PomodoroCycle from "@/models/PomodoroCycle";
import { userAgent } from "next/server";

/**
 * Calcula as estatísticas do usuário com base nos ciclos concluídos.
 * - Soma o total de minutos por dia, semana, mês, ano e total
 * - Calcula o streak atual (dias consecutivos com pelo menos 1 ciclo completo)
 */
export async function calculateUserStats(userId) {
  // Busca todos os ciclos concluídos do usuário
  const cycles = await PomodoroCycle.find({
    user: userId,
    completed: true,
  }).sort({ endTime: 1 });

  if (!cycles.length) {
    return {
      totalMinutes: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        yearly: 0,
        allTime: 0,
      },
      streak: 0,
    };
  }

  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Soma minutos por período
  let totalMinutes = {
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    allTime: 0,
  };

  // Para cálculo de streak
  const daysWithActivity = new Set();

  for (const cycle of cycles) {
    const duration = cycle.duration || 0; // em minutos
    const end = new Date(cycle.endTime);

    totalMinutes.allTime += duration;
    if (end >= startOfYear) totalMinutes.yearly += duration;
    if (end >= startOfMonth) totalMinutes.monthly += duration;
    if (end >= startOfWeek) totalMinutes.weekly += duration;
    if (end >= startOfDay) totalMinutes.daily += duration;

    // Marca o dia (yyyy-mm-dd) em que o user teve atividade
    const dayKey = end.toISOString().split("T")[0];
    daysWithActivity.add(dayKey);
  }

  // Calcula o streak
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  while (true) {
    const dayKey = currentDate.toISOString().split("T")[0];
    if (daysWithActivity.has(dayKey)) {
      streak++;
      // Volta um dia
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { totalMinutes, streak };
}

