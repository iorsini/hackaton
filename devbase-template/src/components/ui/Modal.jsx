// src/components/ui/Modal.jsx
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = "md",
  className = ""
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full mx-4"
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`
          bg-secondary rounded-2xl w-full ${sizes[size]} 
          border border-gray-700 max-h-[90vh] overflow-y-auto
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Exemplo de uso:
// const [isOpen, setIsOpen] = useState(false);
// 
// <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Meu Modal">
//   <p>Conteúdo aqui</p>
// </Modal>