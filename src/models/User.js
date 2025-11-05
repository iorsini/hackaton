// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },
    totalPomodoros: {
      type: Number,
      default: 0,
    },
    stats: {
      totalFocusTime: {
        type: Number,
        default: 0, // em minutos
      },
      totalBreakTime: {
        type: Number,
        default: 0, // em minutos
      },
      totalMinutes: {
        type: Number,
        default: 0, // ADICIONADO: total de minutos (foco + pausa)
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
      lastActivity: {
        type: Date,
        default: null, // ADICIONADO: para calcular streak
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);