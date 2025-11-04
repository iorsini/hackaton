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
    settings: {
      focusDuration: { type: Number, default: 25 }, // minutos
      shortBreak: { type: Number, default: 5 },
      longBreak: { type: Number, default: 15 },
      longBreakInterval: { type: Number, default: 4 }, // a cada 4 ciclos
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
