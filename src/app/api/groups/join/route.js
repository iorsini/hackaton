import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

// Permite que o usuário entre em um grupo.
export async function PATCH(req) {
  try {
    await connectDB();
    const { groupId, userId } = await req.json();

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { groups: groupId },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error("Error joining group:", error);
    return NextResponse.json({ error: "Failed to join group" }, { status: 500 });
  }
}
