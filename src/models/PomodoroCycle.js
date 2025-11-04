import mongoose, { Schema, models } from "mongoose";

const PomodoroCycleSchema = new Schema(
  {
    session: {
      type: Schema.Types.ObjectId,
      ref: "PomodoroSession",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["focus", "shortBreak", "longBreak"],
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number, // duração planejada em minutos
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    actualDuration: {
      type: Number, // tempo real decorrido em minutos
      default: 0,
    },
  },
  { timestamps: true }
);

const PomodoroCycle =
  models.PomodoroCycle || mongoose.model("PomodoroCycle", PomodoroCycleSchema);

export default PomodoroCycle;
