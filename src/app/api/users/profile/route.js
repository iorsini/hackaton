import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Task from "@/models/Task";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    await connectDB();

    // ✅ Buscar usuário SEM select para pegar TODOS os campos
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Buscar todas as tarefas do usuário
    const tasks = await Task.find({ userId: user._id });

    // Calcular estatísticas de tarefas
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // ✅ Pegar dados REAIS do banco
    const totalPomodoros = user.totalPomodoros || 0;
    const totalFocusTime = user.stats?.totalFocusTime || 0;
    const totalBreakTime = user.stats?.totalBreakTime || 0;
    const totalMinutes = user.stats?.totalMinutes || 0;

    console.log(`📊 Perfil carregado para ${user.email}:`);
    console.log(`   - Total Pomodoros: ${totalPomodoros}`);
    console.log(`   - Total Focus Time: ${totalFocusTime} min`);
    console.log(`   - Total Break Time: ${totalBreakTime} min`);
    console.log(`   - Total Minutes: ${totalMinutes} min`);

    // Calcular streak (dias seguidos com atividade)
    const streakDays = calculateStreak(user);

    // Buscar tarefas do mês atual
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const tasksThisMonth = tasks.filter((task) => {
      if (!task.createdAt) return false;
      const taskDate = new Date(task.createdAt);
      return !isNaN(taskDate.getTime()) && taskDate >= firstDayOfMonth;
    });
    const completedTasksThisMonth = tasksThisMonth.filter(
      (task) => task.completed
    ).length;

    return Response.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      stats: {
        totalPomodoros,
        totalFocusTime,
        totalBreakTime,
        totalMinutes,
        totalTasks,
        completedTasks,
        completionRate,
        streakDays,
        tasksThisMonth: tasksThisMonth.length,
        completedTasksThisMonth,
      },
    });
  } catch (error) {
    console.error("❌ Erro ao buscar perfil:", error);
    return Response.json({ error: "Erro ao buscar perfil" }, { status: 500 });
  }
}

// ✅ Calcular streak com base na lastActivity
function calculateStreak(user) {
  if (!user.stats?.lastActivity) return 0;

  const now = new Date();
  const lastActivity = new Date(user.stats.lastActivity);

  // Normalizar datas para meia-noite
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastActivityDay = new Date(
    lastActivity.getFullYear(),
    lastActivity.getMonth(),
    lastActivity.getDate()
  );

  // Calcular diferença em dias
  const diffTime = today.getTime() - lastActivityDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Se a última atividade foi hoje ou ontem, mantém streak
  if (diffDays <= 1) {
    return user.stats.longestStreak || 1;
  }

  // Se passou mais de 1 dia, streak quebrou
  return 0;
}

// API para atualizar avatar
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await request.json();
    const { avatar } = body;

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { avatar },
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("❌ Erro ao atualizar avatar:", error);
    return Response.json(
      { error: "Erro ao atualizar avatar" },
      { status: 500 }
    );
  }
}