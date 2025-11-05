// app/api/users/pomodoro/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Definição dos moods e seus tempos
const MOODS = {
  CREATIVE: { focusTime: 25, breakTime: 5 },
  UNMOTIVATED: { focusTime: 15, breakTime: 5 },
  STRESSED: { focusTime: 20, breakTime: 7 },
  FOCUSED: { focusTime: 30, breakTime: 5 },
  TIRED: { focusTime: 15, breakTime: 10 },
  ENERGIZED: { focusTime: 35, breakTime: 5 },
  CUSTOM: { focusTime: 25, breakTime: 5 },
};

// Função para calcular pomodoros baseado no tempo e mood
function calculatePomodoros(focusTimeMinutes, moodId) {
  // Se não tiver mood, usa o padrão de 25 minutos
  const standardFocusTime = moodId && MOODS[moodId.toUpperCase()] 
    ? MOODS[moodId.toUpperCase()].focusTime 
    : 25;
  
  // Calcula quantos pomodoros equivalem ao tempo focado
  // Exemplo: 30 minutos com mood FOCUSED (30min) = 1 pomodoro
  // Exemplo: 30 minutos com mood UNMOTIVATED (15min) = 2 pomodoros
  const pomodoros = Math.round(focusTimeMinutes / standardFocusTime);
  
  // Garante pelo menos 1 pomodoro se focou algum tempo
  return Math.max(pomodoros, focusTimeMinutes > 0 ? 1 : 0);
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

    // Calcula quantos pomodoros com base no mood
    const pomodorosToAdd = calculatePomodoros(focusTimeMinutes, moodId);

    // Incrementar pomodoros calculados e tempo de foco
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $inc: {
          totalPomodoros: pomodorosToAdd,
          "stats.totalFocusTime": focusTimeMinutes,
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
      pomodorosAdded: pomodorosToAdd,
      totalPomodoros: user.totalPomodoros,
      totalFocusTime: user.stats.totalFocusTime,
      moodUsed: moodId || "default",
    });
  } catch (error) {
    console.error("Erro ao registrar pomodoro:", error);
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
      breakTimeAdded: breakTimeMinutes,
      moodUsed: moodId || "default",
    });
  } catch (error) {
    console.error("Erro ao registrar pausa:", error);
    return Response.json(
      { error: "Erro ao registrar pausa" },
      { status: 500 }
    );
  }
}