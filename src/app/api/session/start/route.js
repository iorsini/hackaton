import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PomodoroSession from "@/models/PomodoroSession";

//Cria uma nova sessão de Pomodoro
export async function POST(req) {
  try {
    await connectDB();
    const { userId, totalCycles = 4 } = await req.json();

    const session = await PomodoroSession.create({
      user: userId || null, // se não estiver logado
      totalCycles,
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error("Error starting session:", error);
    return NextResponse.json({ error: "Failed to start session" }, { status: 500 });
  }
}
