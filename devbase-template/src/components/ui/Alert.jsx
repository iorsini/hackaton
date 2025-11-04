// src/components/ui/Alert.jsx
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

export default function Alert({ type = "info", children, className = "" }) {
  const types = {
    success: {
      bg: "bg-green-900/20",
      border: "border-green-600/50",
      text: "text-green-400",
      icon: CheckCircle,
    },
    error: {
      bg: "bg-red-900/20",
      border: "border-red-600/50",
      text: "text-red-400",
      icon: XCircle,
    },
    warning: {
      bg: "bg-yellow-900/20",
      border: "border-yellow-600/50",
      text: "text-yellow-400",
      icon: AlertCircle,
    },
    info: {
      bg: "bg-blue-900/20",
      border: "border-blue-600/50",
      text: "text-blue-400",
      icon: Info,
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bg} ${config.border} border rounded-lg p-4 mb-4
        flex items-start gap-3 ${className}
      `}
    >
      <Icon className={`${config.text} flex-shrink-0 mt-0.5`} size={20} />
      <p className={`${config.text} text-sm flex-1`}>{children}</p>
    </div>
  );
}