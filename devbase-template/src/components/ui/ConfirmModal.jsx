// src/components/ui/ConfirmModal.jsx
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-2xl max-w-md w-full p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            fullWidth
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            loading={loading}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}