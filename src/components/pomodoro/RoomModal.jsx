// src/components/pomodoro/RoomModal.jsx
"use client";

import { useState } from "react";
import { X, Plus, LogIn, Copy, Check } from "lucide-react";

export default function RoomModal({ isOpen, onClose, onRoomCreated, onRoomJoined }) {
  const [mode, setMode] = useState("create"); // 'create' or 'join'
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [createdRoom, setCreatedRoom] = useState(null);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, isPublic }),
      });

      const data = await res.json();

      if (res.ok) {
        setCreatedRoom(data.room);
        onRoomCreated?.(data.room);
      } else {
        setError(data.error || "Erro ao criar sala");
      }
    } catch (err) {
      setError("Erro ao criar sala");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/rooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: inviteCode.toUpperCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        onRoomJoined?.(data.room);
        handleClose();
      } else {
        setError(data.error || "Erro ao entrar na sala");
      }
    } catch (err) {
      setError("Erro ao entrar na sala");
    } finally {
      setLoading(false);
    }
  };

  const copyInviteCode = () => {
    if (createdRoom?.inviteCode) {
      navigator.clipboard.writeText(createdRoom.inviteCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setInviteCode("");
    setError("");
    setCreatedRoom(null);
    setMode("create");
    onClose();
  };

  if (!isOpen) return null;

  // Mostrar código de convite após criar sala
  if (createdRoom) {
    return (
      <>
        <div className="modal-overlay" onClick={handleClose} />
        <div className="room-modal">
          <div className="modal-header">
            <h2>🎉 Sala Criada!</h2>
            <button onClick={handleClose} className="close-btn">
              <X size={24} />
            </button>
          </div>

          <div className="success-content">
            <p className="success-text">
              Sua sala <strong>{createdRoom.name}</strong> foi criada com sucesso!
            </p>
            
            <div className="invite-code-box">
              <label>Código de Convite</label>
              <div className="code-display">
                <span className="code">{createdRoom.inviteCode}</span>
                <button onClick={copyInviteCode} className="copy-btn">
                  {copiedCode ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <p className="hint">Compartilhe este código com seus amigos!</p>
            </div>

            <button onClick={handleClose} className="primary-btn">
              Ir para a Sala
            </button>
          </div>
        </div>

        <style jsx>{`
          .success-content {
            padding: 1rem 0;
          }

          .success-text {
            color: #374151;
            margin-bottom: 2rem;
            text-align: center;
            font-size: 1rem;
          }

          .invite-code-box {
            background: #f9fafb;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .invite-code-box label {
            display: block;
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 0.5rem;
            font-weight: 600;
          }

          .code-display {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 0.75rem 1rem;
          }

          .code {
            flex: 1;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #667eea;
          }

          .copy-btn {
            padding: 0.5rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .copy-btn:hover {
            background: #5568d3;
          }

          .hint {
            font-size: 0.75rem;
            color: #9ca3af;
            margin-top: 0.5rem;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="modal-overlay" onClick={handleClose} />
      <div className="room-modal">
        <div className="modal-header">
          <h2>{mode === "create" ? "Criar Sala" : "Entrar em Sala"}</h2>
          <button onClick={handleClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="mode-toggle">
          <button
            onClick={() => setMode("create")}
            className={`mode-btn ${mode === "create" ? "active" : ""}`}
          >
            <Plus size={18} />
            Criar Sala
          </button>
          <button
            onClick={() => setMode("join")}
            className={`mode-btn ${mode === "join" ? "active" : ""}`}
          >
            <LogIn size={18} />
            Entrar
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {mode === "create" ? (
          <form onSubmit={handleCreateRoom}>
            <div className="form-group">
              <label>Nome da Sala *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Estudos de JavaScript"
                maxLength={50}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o propósito da sala..."
                maxLength={200}
                rows={3}
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span>Sala pública</span>
              </label>
              <p className="hint">Outras pessoas podem encontrar esta sala</p>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Criando..." : "Criar Sala"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoinRoom}>
            <div className="form-group">
              <label>Código de Convite *</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="Ex: ABC12345"
                maxLength={8}
                required
                style={{ textTransform: "uppercase" }}
              />
              <p className="hint">Digite o código de 8 caracteres da sala</p>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Entrando..." : "Entrar na Sala"}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 999;
        }

        .room-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: fadeInScale 0.3s ease;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .close-btn {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: #1a1a1a;
        }

        .mode-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: #f3f4f6;
          padding: 0.25rem;
          border-radius: 12px;
        }

        .mode-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.2s;
        }

        .mode-btn.active {
          background: white;
          color: #667eea;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .error-msg {
          background: #fef2f2;
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .checkbox-group {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-weight: 600;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          cursor: pointer;
        }

        .hint {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 0.25rem;
        }

        .primary-btn {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}