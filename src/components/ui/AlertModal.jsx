// src/components/ui/AlertModal.jsx
import { X } from "lucide-react";
import Button from "./Button";

export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  showCancel = false,
}) {
  if (!isOpen) return null;

  const typeColors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-2xl max-w-md w-full p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${typeColors[type]}/20 flex items-center justify-center`}
            >
              <div className={`w-3 h-3 rounded-full ${typeColors[type]}`} />
            </div>
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex gap-3">
          {showCancel && (
            <Button variant="secondary" onClick={onClose} fullWidth>
              {cancelText}
            </Button>
          )}
          <Button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}