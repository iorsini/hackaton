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
      select: false, // Não retorna a senha por padrão
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
    // Estatísticas adicionais
    stats: {
      totalFocusTime: {
        type: Number,
        default: 0, // em minutos
      },
      totalBreakTime: {
        type: Number,
        default: 0, // em minutos
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Remover o índice manual para evitar duplicação
// UserSchema.index({ email: 1 }); <- REMOVIDO (já tem unique: true)

export default mongoose.models.User || mongoose.model("User", UserSchema);