import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { userId } = params;

    const user = await User.findById(userId).populate({
      path: "groups",
      populate: {
        path: "members",
        select: "name avatar stats streak",
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const groupsWithRanking = user.groups.map((group) => {
      const ranking = group.members
        .map((member) => ({
          _id: member._id,
          name: member.name,
          avatar: member.avatar,
          totalMinutes: member.stats?.totalMinutes || 0,
          streak: member.streak?.current || 0,
        }))
        .sort((a, b) => b.totalMinutes - a.totalMinutes);

      // gera o link fixo a partir do inviteCode
      const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${group.inviteCode}`;

      return {
        _id: group._id,
        name: group.name,
        description: group.description,
        inviteLink,
        ranking,
      };
    });

    return NextResponse.json(groupsWithRanking);
  } catch (error) {
    console.error("Error fetching user groups with ranking:", error);
    return NextResponse.json(
      { error: "Failed to fetch user groups" },
      { status: 500 }
    );
  }
}
