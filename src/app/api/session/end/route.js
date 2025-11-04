import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PomodoroSession from "@/models/PomodoroSession";

//Marca a sessão como concluída.
export async function PATCH(req) {
  try {
    await connectDB();
    const { sessionId } = await req.json();

    const session = await PomodoroSession.findByIdAndUpdate(
      sessionId,
      { completed: true },
      { new: true }
    );

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error ending session:", error);
    return NextResponse.json({ error: "Failed to end session" }, { status: 500 });
  }
}
