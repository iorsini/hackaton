// src/models/RoomPost.js
import mongoose, { Schema, models } from "mongoose";

const RoomPostSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    image: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["achievement", "session", "general"],
      default: "general",
    },
    metadata: {
      minutes: { type: Number, default: 0 },
      cycles: { type: Number, default: 0 },
      mood: { type: String, default: null },
    },
    reactions: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        emoji: String,
      },
    ],
  },
  { timestamps: true }
);

const RoomPost = models.RoomPost || mongoose.model("RoomPost", RoomPostSchema);
export default RoomPost;