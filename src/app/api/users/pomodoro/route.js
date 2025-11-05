import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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

    // ✅ REGRA: 1 pomodoro completo = 1 ciclo de foco finalizado
    const pomodorosToAdd = 1;

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
    console.log(`   - Total de pomodoros: ${user.totalPomodoros}`);
    console.log(`   - Tempo total de foco: ${user.stats.totalFocusTime} min`);
    console.log(`   - Tempo total: ${user.stats.totalMinutes} min`);

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

    console.log(`☕ Registrando pausa:`);
    console.log(`   - Tempo: ${breakTimeMinutes} min`);
    console.log(`   - Mood: ${moodId || "padrão"}`);

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

    console.log(`✅ Pausa registrada!`);
    console.log(`   - Tempo total de pausa: ${user.stats.totalBreakTime} min`);
    console.log(`   - Tempo total: ${user.stats.totalMinutes} min`);

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