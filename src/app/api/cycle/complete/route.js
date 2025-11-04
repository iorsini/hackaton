import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PomodoroCycle from "@/models/PomodoroCycle";

//Marca o ciclo como concluído.
export async function PATCH(req) {
  try {
    await connectDB();
    const { cycleId } = await req.json();

    const cycle = await PomodoroCycle.findByIdAndUpdate(
      cycleId,
      {
        completed: true,
        endTime: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(cycle);
  } catch (error) {
    console.error("Error completing cycle:", error);
    return NextResponse.json({ error: "Failed to complete cycle" }, { status: 500 });
  }
}
