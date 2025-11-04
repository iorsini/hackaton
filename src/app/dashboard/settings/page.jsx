// src/app/dashboard/settings/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SettingsForm from "@/components/profile/SettingsForm";
import DeleteAccountModal from "@/components/profile/DeleteAccountModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        <ProfileHeader title="Settings" />

        <div className="px-6 py-6 space-y-6">
          <SettingsForm />

          <div className="bg-gradient-to-br from-red-900/20 to-red-950/30 rounded-2xl p-6 border border-red-600/30">
            <h3 className="text-white text-xl font-bold mb-2">Danger Zone</h3>
            <p className="text-gray-400 text-sm mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}