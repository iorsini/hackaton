// app/api/users/profile/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Task from "@/models/Task";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    await connectDB();

    // Buscar usuário
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Buscar todas as tarefas do usuário
    const tasks = await Task.find({ userId: user._id });

    // Calcular estatísticas
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    // Calcular pomodoros (assumindo que cada tarefa completa = 1 pomodoro)
    // Você pode ajustar isso baseado na sua lógica
    const totalPomodoros = user.totalPomodoros || 0;

    // Calcular streak (dias seguidos) - com proteção contra erros
    const streakDays = calculateStreak(tasks);

    // Buscar tarefas do mês atual
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const tasksThisMonth = tasks.filter(task => {
      if (!task.createdAt) return false;
      const taskDate = new Date(task.createdAt);
      return !isNaN(taskDate.getTime()) && taskDate >= firstDayOfMonth;
    });
    const completedTasksThisMonth = tasksThisMonth.filter(
      task => task.completed
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
        totalTasks,
        completedTasks,
        completionRate,
        streakDays,
        tasksThisMonth: tasksThisMonth.length,
        completedTasksThisMonth,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return Response.json(
      { error: "Erro ao buscar perfil" },
      { status: 500 }
    );
  }
}

// Função para calcular sequência de dias
function calculateStreak(tasks) {
  if (tasks.length === 0) return 0;

  // Filtrar tarefas completadas e ordenar por data
  const completedTasks = tasks
    .filter(task => {
      // Verificar se a task tem updatedAt válido
      if (!task.updatedAt) return false;
      const date = new Date(task.updatedAt);
      return task.completed && !isNaN(date.getTime());
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (completedTasks.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Agrupar tarefas por dia
  const tasksByDay = {};
  completedTasks.forEach(task => {
    try {
      const date = new Date(task.updatedAt);
      if (isNaN(date.getTime())) return; // Pular datas inválidas
      
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toISOString().split('T')[0];
      tasksByDay[dateKey] = true;
    } catch (error) {
      console.error('Erro ao processar data da task:', error);
    }
  });

  // Calcular streak
  while (true) {
    const dateKey = currentDate.toISOString().split('T')[0];
    if (tasksByDay[dateKey]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// API para atualizar avatar
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
    console.error("Erro ao atualizar avatar:", error);
    return Response.json(
      { error: "Erro ao atualizar avatar" },
      { status: 500 }
    );
  }
}