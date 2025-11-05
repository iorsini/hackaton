// src/app/api/rooms/create/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Room from '@/models/Room';
import User from '@/models/User';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, isPublic = true } = body;

    if (!name?.trim()) {
      return Response.json({ error: 'Nome obrigatório' }, { status: 400 });
    }

    await dbConnect();

    // Gerar código de convite único
    let inviteCode;
    let isUnique = false;
    
    while (!isUnique) {
      inviteCode = generateInviteCode();
      const existing = await Room.findOne({ inviteCode });
      if (!existing) isUnique = true;
    }

    // Criar sala
    const room = await Room.create({
      name: name.trim(),
      description: description?.trim() || '',
      owner: session.user.id,
      inviteCode,
      members: [
        {
          user: session.user.id,
          joinedAt: new Date(),
          totalMinutes: 0,
          streak: { current: 0, best: 0 },
        },
      ],
      settings: {
        isPublic,
        maxMembers: 50,
      },
    });

    // Adicionar sala ao usuário
    await User.findByIdAndUpdate(session.user.id, {
      $push: { groups: room._id },
    });

    const populatedRoom = await Room.findById(room._id)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar');

    return Response.json({ 
      success: true,
      room: populatedRoom 
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar sala:', error);
    return Response.json({ error: 'Erro ao criar sala' }, { status: 500 });
  }
}

function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}