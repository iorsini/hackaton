// src/app/api/rooms/[roomId]/posts/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Room from '@/models/Room';
import RoomPost from '@/models/RoomPost';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { roomId } = params;

    await dbConnect();

    // Verificar se é membro
    const room = await Room.findById(roomId);
    if (!room) {
      return Response.json({ error: 'Sala não encontrada' }, { status: 404 });
    }

    const isMember = room.members.some(
      m => m.user.toString() === session.user.id
    );

    if (!isMember) {
      return Response.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const posts = await RoomPost.find({ room: roomId })
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    return Response.json({ 
      success: true,
      posts 
    });

  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return Response.json({ error: 'Erro ao buscar posts' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { roomId } = params;
    const body = await request.json();
    const { title, content, image, type = 'general', metadata = {} } = body;

    if (!title?.trim()) {
      return Response.json({ error: 'Título obrigatório' }, { status: 400 });
    }

    await dbConnect();

    // Verificar se é membro
    const room = await Room.findById(roomId);
    if (!room) {
      return Response.json({ error: 'Sala não encontrada' }, { status: 404 });
    }

    const isMember = room.members.some(
      m => m.user.toString() === session.user.id
    );

    if (!isMember) {
      return Response.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const post = await RoomPost.create({
      room: roomId,
      user: session.user.id,
      title: title.trim(),
      content: content?.trim() || '',
      image,
      type,
      metadata,
    });

    const populatedPost = await RoomPost.findById(post._id)
      .populate('user', 'name email avatar');

    return Response.json({ 
      success: true,
      post: populatedPost 
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar post:', error);
    return Response.json({ error: 'Erro ao criar post' }, { status: 500 });
  }
}