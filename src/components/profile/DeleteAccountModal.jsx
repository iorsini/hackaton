// src/components/profile/DeleteAccountModal.jsx
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { AlertTriangle, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function DeleteAccountModal({ onClose }) {
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/me", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      await signOut({ callbackUrl: "/login" });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-2xl max-w-md w-full p-6 border border-red-600/30">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Delete Account</h3>
              <p className="text-gray-400 text-sm">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {error && <Alert type="error">{error}</Alert>}

        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            This will permanently delete your account and all associated data. This
            action cannot be reversed.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type <span className="text-red-500 font-bold">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="DELETE"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={loading}
              fullWidth
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}