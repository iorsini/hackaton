import mongoose, { Schema, models } from "mongoose";

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    inviteCode: {
      type: String,
      unique: true,
      index: true,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true }
);

// Cria um índice pra buscar grupos rapidamente pelo código de convite
GroupSchema.index({ inviteCode: 1 });

// Middleware opcional pra gerar código de convite único
GroupSchema.pre("save", function (next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 10);
  }
  next();
});

const Group = models.Group || mongoose.model("Group", GroupSchema);
export default Group;
