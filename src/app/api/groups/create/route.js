import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { name, description, ownerId, visibility } = await req.json();

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Cria o grupo
    const group = await Group.create({
      name,
      description: description || "",
      owner: ownerId,
      members: [ownerId],
      visibility: visibility || "private",
    });

    // Adiciona o grupo ao usuário criador
    await User.findByIdAndUpdate(ownerId, {
      $addToSet: { groups: group._id },
    });

    // Gera o link de convite fixo
    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${group.inviteCode}`;

    return NextResponse.json({
      message: "Group created successfully",
      group: {
        _id: group._id,
        name: group.name,
        description: group.description,
        inviteLink,
        owner: group.owner,
      },
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}
