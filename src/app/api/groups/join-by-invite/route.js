import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

// Permite que o usuário entre em um grupo usando o inviteCode.
export async function POST(req) {
  try {
    await connectDB();

    const { inviteCode, userId } = await req.json();

    if (!inviteCode || !userId) {
      return NextResponse.json(
        { error: "Missing inviteCode or userId" },
        { status: 400 }
      );
    }

    // Busca o grupo pelo código de convite
    const group = await Group.findOne({ inviteCode });

    if (!group) {
      return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
    }

    // Adiciona o user ao grupo, evitando duplicação
    await Group.findByIdAndUpdate(group._id, {
      $addToSet: { members: userId },
    });

    // Adiciona o grupo ao user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { groups: group._id },
    });

    return NextResponse.json({
      message: "User joined group successfully",
      groupId: group._id,
      groupName: group.name,
    });
  } catch (error) {
    console.error("Error joining group by invite:", error);
    return NextResponse.json(
      { error: "Failed to join group" },
      { status: 500 }
    );
  }
}
