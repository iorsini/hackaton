import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "/images/default-avatar.png",
    },
    image: {
      type: String,
      default: null,
    },

    // Configurações de pomodoro
    settings: {
      focusDuration: { type: Number, default: 25 },
      shortBreak: { type: Number, default: 5 },
      longBreak: { type: Number, default: 15 },
      longBreakInterval: { type: Number, default: 4 },
    },

    // Estatísticas
    stats: {
      totalMinutes: { type: Number, default: 0 }, // all time
      dailyMinutes: { type: Number, default: 0 },
      weeklyMinutes: { type: Number, default: 0 },
      monthlyMinutes: { type: Number, default: 0 },
      yearlyMinutes: { type: Number, default: 0 },
      lastActivity: { type: Date, default: null }, // última vez que completou um ciclo
    },

    // Streak
    streak: {
      current: { type: Number, default: 0 },
      best: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: null },
    },

    // Grupos
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
