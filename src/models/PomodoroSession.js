import mongoose, { Schema, models } from "mongoose";

const PomodoroSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    totalCycles: {
      type: Number,
      default: 4, // número de ciclos previstos
    },
    completedCycles: {
      type: Number,
      default: 0, // quantos já foram concluídos
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PomodoroSession =
  models.PomodoroSession || mongoose.model("PomodoroSession", PomodoroSessionSchema);

export default PomodoroSession;
