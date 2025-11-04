import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PomodoroCycle from "@/models/PomodoroCycle";

//Cria um novo ciclo (foco, pausa curta ou longa).
export async function POST(req) {
  try {
    await connectDB();
    const { userId, sessionId, type, duration } = await req.json();

    const cycle = await PomodoroCycle.create({
      user: userId || null,
      session: sessionId || null,
      type,
      duration,
      startTime: new Date(),
    });

    return NextResponse.json(cycle, { status: 201 });
  } catch (error) {
    console.error("Error starting cycle:", error);
    return NextResponse.json({ error: "Failed to start cycle" }, { status: 500 });
  }
}
