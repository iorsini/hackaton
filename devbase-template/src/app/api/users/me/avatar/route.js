// src/app/api/users/me/avatar/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToCloudinary(buffer, {
      folder: "avatars",
      public_id: `avatar_${session.user.id}`,
      overwrite: true,
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto" },
      ],
    });

    await connectDB();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.avatar = result.secure_url;
    user.image = result.secure_url;
    await user.save();

    return NextResponse.json(
      {
        message: "Avatar updated successfully",
        avatar: result.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload avatar" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.avatar && user.avatar !== "/images/default-avatar.png") {
      await deleteFromCloudinary(`avatar_${session.user.id}`);
    }

    user.avatar = "/images/default-avatar.png";
    user.image = "/images/default-avatar.png";
    await user.save();

    return NextResponse.json(
      { message: "Avatar removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Avatar delete error:", error);
    return NextResponse.json(
      { error: "Failed to remove avatar" },
      { status: 500 }
    );
  }
}