import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Retorna a lista com grupos do user (Sidebar)
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { userId } = params;

    const user = await User.findById(userId).populate("groups", "name");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Retorna só o nome e o id do grupo
    const groups = user.groups.map(group => ({
      _id: group._id,
      name: group.name,
    }));

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return NextResponse.json({ error: "Failed to load groups" }, { status: 500 });
  }
}
