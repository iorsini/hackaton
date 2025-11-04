import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PomodoroSession from "@/models/PomodoroSession";

//Busca a sessão ativa (ainda não concluída).
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const session = await PomodoroSession.findOne({
      user: userId,
      completed: false,
    });

    return NextResponse.json(session || null);
  } catch (error) {
    console.error("Error fetching active session:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
