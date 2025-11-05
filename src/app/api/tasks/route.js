// app/api/tasks/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ erro: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();
    
    const tasks = await Task.find({ userId: session.user.id })
      .sort({ createdAt: -1 });

    return Response.json({ tasks });
  } catch (error) {
    console.error('Erro ao buscar tasks:', error);
    return Response.json({ erro: 'Erro ao buscar tarefas' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ erro: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { text, category = 'outros' } = body;

    if (!text?.trim()) {
      return Response.json({ erro: 'Texto obrigatório' }, { status: 400 });
    }

    await dbConnect();

    const task = await Task.create({
      userId: session.user.id,
      text: text.trim(),
      category,
      completed: false
    });

    return Response.json({ task }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar task:', error);
    return Response.json({ erro: 'Erro ao criar tarefa' }, { status: 500 });
  }
}