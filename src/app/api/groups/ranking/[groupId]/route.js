import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import { calculateUserStats } from "@/lib/calculateUserStats";

// Retorna o ranking completo para Dashboard group.
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { groupId } = params;

    const group = await Group.findById(groupId).populate("members", "name avatar");

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Calcula apenas os minutos (sem streak)
    const ranking = await Promise.all(
      group.members.map(async (member) => {
        const stats = await calculateUserStats(member._id);
        return {
          userId: member._id,
          name: member.name,
          avatar: member.avatar,
          minutes: stats.totalMinutes.allTime,
        };
      })
    );

    // Ordena por minutos (desc)
    ranking.sort((a, b) => b.minutes - a.minutes);

    return NextResponse.json({
      _id: group._id,
      name: group.name,
      ranking,
    });
  } catch (error) {
    console.error("Error fetching group ranking:", error);
    return NextResponse.json({ error: "Failed to load ranking" }, { status: 500 });
  }
}
