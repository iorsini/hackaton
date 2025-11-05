// src/models/Room.js
import mongoose, { Schema, models } from "mongoose";

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    banner: {
      type: String,
      default: null,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        totalMinutes: {
          type: Number,
          default: 0,
        },
        streak: {
          current: { type: Number, default: 0 },
          best: { type: Number, default: 0 },
          lastUpdated: { type: Date, default: null },
        },
      },
    ],
    settings: {
      isPublic: {
        type: Boolean,
        default: true,
      },
      maxMembers: {
        type: Number,
        default: 50,
      },
    },
    stats: {
      totalSessions: {
        type: Number,
        default: 0,
      },
      totalMinutes: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

// Gerar código de convite único
RoomSchema.pre("save", async function (next) {
  if (this.isNew && !this.inviteCode) {
    this.inviteCode = generateInviteCode();
  }
  next();
});

function generateInviteCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const Room = models.Room || mongoose.model("Room", RoomSchema);
export default Room;