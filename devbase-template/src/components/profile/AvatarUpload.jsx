// src/components/profile/AvatarUpload.jsx
"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Camera, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AvatarUpload() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/users/me/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload avatar");
      }

      await update({
        ...session,
        user: {
          ...session.user,
          avatar: data.avatar,
          image: data.avatar,
        },
      });

      setSuccess("Avatar updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/me/avatar", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to remove avatar");
      }

      await update({
        ...session,
        user: {
          ...session.user,
          avatar: "/images/default-avatar.png",
          image: "/images/default-avatar.png",
        },
      });

      setSuccess("Avatar removed successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-white text-xl font-bold mb-4">Profile Picture</h3>

      {error && <Alert type="error">{error}</Alert>}
      {success && <Alert type="success">{success}</Alert>}

      <div className="flex items-center gap-6">
        <div className="relative group">
          {loading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-10">
              <LoadingSpinner size="md" />
            </div>
          )}
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center overflow-hidden border-4 border-gray-700 group-hover:border-accent transition-all">
            {session?.user?.avatar || session?.user?.image ? (
              <img
                src={session.user.avatar || session.user.image}
                alt={session.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-3xl font-bold">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            icon={Camera}
            size="sm"
            disabled={loading}
          >
            Change Photo
          </Button>
          {session?.user?.avatar !== "/images/default-avatar.png" && (
            <Button
              onClick={handleRemoveAvatar}
              variant="danger"
              icon={Trash2}
              size="sm"
              disabled={loading}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-4">
        Recommended: Square image, at least 400x400px. Max size: 5MB
      </p>
    </div>
  );
}