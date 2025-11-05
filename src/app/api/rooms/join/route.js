// src/app/api/rooms/join/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Room from '@/models/Room';
import User from '@/models/User';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { inviteCode } = body;

    if (!inviteCode?.trim()) {
      return NextResponse.json(
        { error: 'Código de convite obrigatório' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Buscar sala pelo código de convite
    const room = await Room.findOne({ 
      inviteCode: inviteCode.trim().toUpperCase() 
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Código de convite inválido' },
        { status: 404 }
      );
    }

    // Verificar se já é membro
    const isMember = room.members.some(
      (member) => member.user.toString() === session.user.id
    );

    if (isMember) {
      return NextResponse.json(
        { error: 'Você já é membro desta sala' },
        { status: 400 }
      );
    }

    // Verificar limite de membros
    if (room.members.length >= room.settings.maxMembers) {
      return NextResponse.json(
        { error: 'Sala está cheia' },
        { status: 400 }
      );
    }

    // Adicionar usuário à sala
    room.members.push({
      user: session.user.id,
      joinedAt: new Date(),
      totalMinutes: 0,
      streak: {
        current: 0,
        best: 0,
        lastUpdated: null,
      },
    });

    await room.save();

    // Adicionar sala ao usuário
    await User.findByIdAndUpdate(session.user.id, {
      $addToSet: { groups: room._id },
    });

    // Retornar sala populada
    const populatedRoom = await Room.findById(room._id)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar');

    return NextResponse.json({
      success: true,
      message: 'Entrou na sala com sucesso!',
      room: populatedRoom,
    }, { status: 200 });

  } catch (error) {
    console.error('Erro ao entrar na sala:', error);
    return NextResponse.json(
      { error: 'Erro ao entrar na sala' },
      { status: 500 }
    );
  }
}