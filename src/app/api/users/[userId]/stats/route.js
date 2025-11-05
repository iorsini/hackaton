import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { calculateUserStats } from "@/lib/calculateUserStats";

/**
 * GET /api/user/[userId]/stats
 * Retorna as estatísticas de pomodoro do usuário:
 *  - minutos totais por dia, semana, mês, ano, total
 *  - streak atual (dias consecutivos com pelo menos 1 ciclo completo)
 */
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const stats = await calculateUserStats(userId);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to calculate stats" },
      { status: 500 }
    );
  }
}
