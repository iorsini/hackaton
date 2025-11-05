// src/components/pomodoro/RoomsPage.jsx
"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Clock, TrendingUp, Crown, ArrowRight, RefreshCw } from "lucide-react";

export default function RoomsPage({ onRoomSelect, onCreateRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRooms();

    // Escuta evento de atualização de salas
    const handleRoomsUpdate = () => {
      loadRooms();
    };

    window.addEventListener('roomsUpdated', handleRoomsUpdate);

    return () => {
      window.removeEventListener('roomsUpdated', handleRoomsUpdate);
    };
  }, []);

  const loadRooms = async () => {
    try {
      setError(null);
      const res = await fetch("/api/rooms");
      const data = await res.json();
      
      if (data.success) {
        setRooms(data.rooms || []);
      } else {
        setError(data.error || "Erro ao carregar salas");
      }
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rooms-loading">
        <div className="spinner" />
        <p>Carregando salas...</p>
        
        <style jsx>{`
          .rooms-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            color: #6b7280;
            background: white;
            border-radius: 24px;
            padding: 2rem;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top-color: #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rooms-error">
        <div className="error-icon">⚠️</div>
        <h3>Ops! Algo deu errado</h3>
        <p>{error}</p>
        <button onClick={loadRooms} className="retry-btn">
          <RefreshCw size={18} />
          Tentar Novamente
        </button>

        <style jsx>{`
          .rooms-error {
            background: white;
            border-radius: 24px;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          }

          .error-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .rooms-error h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }

          .rooms-error p {
            color: #6b7280;
            margin-bottom: 2rem;
          }

          .retry-btn {
            padding: 0.875rem 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
          }

          .retry-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <div>
          <h2>Minhas Salas</h2>
          <p>Estude em grupo e acompanhe o progresso juntos</p>
        </div>
        <button onClick={onCreateRoom} className="create-room-btn">
          <Plus size={20} />
          Nova Sala
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>Nenhuma sala ainda</h3>
          <p>Crie uma sala ou entre em uma existente para começar!</p>
          <button onClick={onCreateRoom} className="empty-btn">
            <Plus size={20} />
            Criar Primeira Sala
          </button>
        </div>
      ) : (
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div key={room._id} className="room-card" onClick={() => onRoomSelect(room)}>
              <div className="room-banner">
                {room.banner ? (
                  <img src={room.banner} alt={room.name} />
                ) : (
                  <div className="default-banner">
                    <Users size={40} />
                  </div>
                )}
                {room.isOwner && (
                  <div className="owner-badge">
                    <Crown size={14} />
                    Dono
                  </div>
                )}
              </div>

              <div className="room-content">
                <h3>{room.name}</h3>
                {room.description && <p className="description">{room.description}</p>}

                <div className="room-stats">
                  <div className="stat">
                    <Users size={16} />
                    <span>{room.members?.length || 0} membros</span>
                  </div>
                  <div className="stat">
                    <Clock size={16} />
                    <span>{room.totalMinutes || 0} min</span>
                  </div>
                </div>

                {room.userStats && (
                  <div className="user-progress">
                    <div className="progress-item">
                      <TrendingUp size={14} />
                      <span>{room.userStats.totalMinutes || 0} min estudados</span>
                    </div>
                    <div className="progress-item">
                      <span className="streak-emoji">🔥</span>
                      <span>{room.userStats.streak || 0} dias</span>
                    </div>
                  </div>
                )}

                <div className="room-footer">
                  <button className="enter-room-btn">
                    Entrar
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .rooms-page {
          padding: 0;
          max-width: 100%;
        }

        .rooms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 2rem;
          padding-bottom: 0;
        }

        .rooms-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .rooms-header p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .create-room-btn {
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .create-room-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          margin: 0 2rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .empty-btn {
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .empty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          padding: 0 2rem 2rem;
        }

        .room-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          cursor: pointer;
        }

        .room-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .room-banner {
          position: relative;
          height: 120px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .room-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .default-banner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .owner-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #f59e0b;
        }

        .room-content {
          padding: 1.25rem;
        }

        .room-content h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .description {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .room-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .user-progress {
          background: #f9fafb;
          border-radius: 8px;
          padding: 0.75rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #374151;
          font-weight: 600;
        }

        .streak-emoji {
          font-size: 1rem;
        }

        .room-footer {
          display: flex;
          justify-content: flex-end;
        }

        .enter-room-btn {
          padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .enter-room-btn:hover {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .rooms-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            padding: 1rem;
          }

          .rooms-header h2 {
            font-size: 1.5rem;
          }

          .create-room-btn {
            width: 100%;
            justify-content: center;
          }

          .rooms-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem 1rem;
          }

          .empty-state {
            margin: 0 1rem;
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}