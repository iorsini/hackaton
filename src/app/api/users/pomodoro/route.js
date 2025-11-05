// app/api/users/pomodoro/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// 🔥 IMPORTANTE: 1 minuto focado = 1 pomodoro
function calculatePomodoros(focusTimeMinutes) {
  return Math.max(0, Math.floor(focusTimeMinutes));
}

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

    const pomodorosToAdd = calculatePomodoros(focusTimeMinutes);

    console.log(`🎯 Registrando ${pomodorosToAdd} pomodoros para ${focusTimeMinutes} minutos`);

    // 🔥 CORRIGIDO: Incrementar TODOS os campos necessários
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $inc: {
          totalPomodoros: pomodorosToAdd,
          "stats.totalFocusTime": focusTimeMinutes,
          "stats.totalMinutes": focusTimeMinutes, // ADICIONADO
        },
        $set: {
          "stats.lastActivity": new Date(), // ADICIONADO: atualiza última atividade
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

    console.log(`✅ Total de pomodoros agora: ${user.totalPomodoros}`);
    console.log(`✅ Total de minutos agora: ${user.stats.totalMinutes}`);

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

// Registrar tempo de pausa
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
          "stats.totalMinutes": breakTimeMinutes, // ADICIONADO: pausa também conta nos minutos totais
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