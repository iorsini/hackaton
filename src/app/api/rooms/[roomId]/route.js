// src/app/api/rooms/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Room from '@/models/Room';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await dbConnect();

    const rooms = await Room.find({
      'members.user': session.user.id,
    })
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar')
      .sort({ updatedAt: -1 });

    // Adicionar dados do membro atual
    const roomsWithUserData = rooms.map(room => {
      const roomObj = room.toObject();
      const memberData = roomObj.members.find(
        m => m.user._id.toString() === session.user.id
      );
      
      return {
        ...roomObj,
        currentUserData: memberData || null,
      };
    });

    return Response.json({ 
      success: true,
      rooms: roomsWithUserData 
    });

  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return Response.json({ error: 'Erro ao buscar salas' }, { status: 500 });
  }
}