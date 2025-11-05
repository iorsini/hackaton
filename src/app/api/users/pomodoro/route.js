// 🔥 SUBSTITUA todo o conteúdo de src/app/api/users/pomodoro/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// ========================================
// CONSTANTES
// ========================================
const POMODORO_DURATION = 25; // minutos padrão de um pomodoro

/**
 * Calcula quantos pomodoros foram completados
 * Regra: 1 pomodoro = 1 ciclo de foco completado
 * NÃO dividir por tempo, mas contar CICLOS
 */
function calculatePomodoros(focusTimeMinutes) {
  // Se o ciclo foi de 25min, conta 1 pomodoro
  // Se foi de 50min, conta 2 pomodoros
  // Se foi de 15min, conta 0.6 pomodoros (arredonda pra baixo)
  return Math.floor(focusTimeMinutes / POMODORO_DURATION);
}

// ========================================
// POST - Registrar tempo de FOCO
// ========================================
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { focusTimeMinutes, moodId } = body;

    if (!focusTimeMinutes || focusTimeMinutes <= 0) {
      return Response.json(
        { error: "Tempo de foco inválido" },
        { status: 400 }
      );
    }

    await connectDB();

    // Calcular quantos pomodoros isso representa
    const pomodorosToAdd = calculatePomodoros(focusTimeMinutes);

    console.log(`🎯 Registrando foco:`);
    console.log(`   - Tempo: ${focusTimeMinutes} min`);
    console.log(`   - Pomodoros: ${pomodorosToAdd}`);
    console.log(`   - Mood: ${moodId || "padrão"}`);

    // Atualizar usuário
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $inc: {
          totalPomodoros: pomodorosToAdd,
          "stats.totalFocusTime": focusTimeMinutes,
          "stats.totalMinutes": focusTimeMinutes,
        },
        $set: {
          "stats.lastActivity": new Date(),
        },
      },
      { new: true }
    );

    if (!user) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    console.log(`✅ Sucesso!`);
    console.log(`   - Total de pomodoros agora: ${user.totalPomodoros}`);
    console.log(`   - Total de minutos: ${user.stats.totalMinutes}`);

    return Response.json({
      success: true,
      pomodorosAdded: pomodorosToAdd,
      totalPomodoros: user.totalPomodoros,
      totalFocusTime: user.stats.totalFocusTime,
      totalMinutes: user.stats.totalMinutes,
      moodUsed: moodId || "default",
    });
  } catch (error) {
    console.error("❌ Erro ao registrar pomodoro:", error);
    return Response.json(
      { error: "Erro ao registrar pomodoro" },
      { status: 500 }
    );
  }
}

// ========================================
// PATCH - Registrar tempo de PAUSA
// ========================================
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { breakTimeMinutes, moodId } = body;

    if (!breakTimeMinutes || breakTimeMinutes <= 0) {
      return Response.json(
        { error: "Tempo de pausa inválido" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $inc: {
          "stats.totalBreakTime": breakTimeMinutes,
          "stats.totalMinutes": breakTimeMinutes,
        },
      },
      { new: true }
    );

    if (!user) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      totalBreakTime: user.stats.totalBreakTime,
      totalMinutes: user.stats.totalMinutes,
      breakTimeAdded: breakTimeMinutes,
      moodUsed: moodId || "default",
    });
  } catch (error) {
    console.error("❌ Erro ao registrar pausa:", error);
    return Response.json(
      { error: "Erro ao registrar pausa" },
      { status: 500 }
    );
  }
}