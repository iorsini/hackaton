// src/app/dashboard/profile/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AvatarUpload from "@/components/profile/AvatarUpload";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader title="Profile" />

        <div className="px-6 py-6 space-y-6">
          <AvatarUpload />

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-white text-xl font-bold mb-4">
              Account Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-white text-lg font-semibold">
                  {session.user.name}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white text-lg font-semibold">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}