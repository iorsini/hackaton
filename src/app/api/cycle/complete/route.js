import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PomodoroCycle from "@/models/PomodoroCycle";
import User from "@/models/User";

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

    if (!cycle || !cycle.user) {
      return NextResponse.json(cycle); // se for anônimo
    }

    // Calcular duração real
    const start = new Date(cycle.startTime);
    const end = new Date(cycle.endTime);
    const minutes = Math.round((end - start) / 60000);

    // Atualizar estatísticas
    const user = await User.findById(cycle.user);
    if (user) {
      const now = new Date();

      // Reset diário/semanal/mensal/...
      const last = user.stats.lastActivity;
      const isSameDay =
        last && now.toDateString() === new Date(last).toDateString();

      user.stats.totalMinutes += minutes;
      user.stats.dailyMinutes = isSameDay
        ? user.stats.dailyMinutes + minutes
        : minutes;

      user.stats.weeklyMinutes += minutes; // depois podemos resetar no cron
      user.stats.monthlyMinutes += minutes;
      user.stats.yearlyMinutes += minutes;
      user.stats.lastActivity = now;

      // Streak
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);

      const lastUpdated = user.streak.lastUpdated;
      if (lastUpdated) {
        const wasYesterday =
          new Date(lastUpdated).toDateString() === yesterday.toDateString();
        const isToday =
          new Date(lastUpdated).toDateString() === now.toDateString();

        if (wasYesterday) {
          user.streak.current += 1;
        } else if (!isToday) {
          user.streak.current = 1;
        }
      } else {
        user.streak.current = 1;
      }

      if (user.streak.current > user.streak.best) {
        user.streak.best = user.streak.current;
      }

      user.streak.lastUpdated = now;

      await user.save();
    }

    return NextResponse.json(cycle);
  } catch (error) {
    console.error("Error completing cycle:", error);
    return NextResponse.json(
      { error: "Failed to complete cycle" },
      { status: 500 }
    );
  }
}
