// app/api/tasks/[id]/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function PATCH(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ erro: 'Não autorizado' }, { status: 401 });
    }

    // Next.js 15 usa await params
    const { id } = await context.params;
    const body = await request.json();

    console.log('PATCH Task - ID:', id, 'Body:', body); // Debug

    await dbConnect();

    const task = await Task.findOne({ _id: id, userId: session.user.id });
    
    if (!task) {
      console.log('Task não encontrada:', id, session.user.id);
      return Response.json({ erro: 'Tarefa não encontrada' }, { status: 404 });
    }

    // Atualizar campos permitidos
    if (body.text !== undefined) task.text = body.text.trim();
    if (body.completed !== undefined) {
      task.completed = body.completed;
      task.completedAt = body.completed ? new Date() : null;
    }
    if (body.category !== undefined) task.category = body.category;

    await task.save();

    console.log('Task atualizada:', task); // Debug

    return Response.json({ task });
  } catch (error) {
    console.error('Erro ao atualizar task:', error);
    return Response.json({ erro: 'Erro ao atualizar tarefa', detalhes: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ erro: 'Não autorizado' }, { status: 401 });
    }

    // Next.js 15 usa await params
    const { id } = await context.params;

    console.log('DELETE Task - ID:', id); // Debug

    await dbConnect();

    const result = await Task.deleteOne({ _id: id, userId: session.user.id });
    
    if (result.deletedCount === 0) {
      return Response.json({ erro: 'Tarefa não encontrada' }, { status: 404 });
    }

    return Response.json({ sucesso: true });
  } catch (error) {
    console.error('Erro ao deletar task:', error);
    return Response.json({ erro: 'Erro ao deletar tarefa', detalhes: error.message }, { status: 500 });
  }
}