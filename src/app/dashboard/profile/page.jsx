"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Target, 
  TrendingUp, 
  Camera, 
  ArrowLeft, 
  LogOut, 
  AlertTriangle, 
  Trash2, 
  Clock, 
  Coffee 
} from "lucide-react";

function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfileData();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/profile");

      if (!response.ok) {
        throw new Error("Erro ao carregar dados do perfil");
      }

      const data = await response.json();
      console.log("📊 Dados do perfil:", data);
      setProfileData(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
      });

      if (response.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        alert("Erro ao deletar conta. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao deletar conta. Tente novamente.");
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/users/me/avatar", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setProfileData({
          ...profileData,
          user: {
            ...profileData.user,
            avatar: data.avatar,
          },
        });
        alert("Avatar atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar avatar");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  const formatMinutes = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Carregando perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-red-500 mb-4">Erro: {error}</p>
          <button
            onClick={fetchProfileData}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!session || !profileData) {
    return null;
  }

  const { user, stats } = profileData;
  const completionRate = stats.completionRate || 0;
  const monthlyCompletionRate =
    stats.tasksThisMonth > 0
      ? Math.round((stats.completedTasksThisMonth / stats.tasksThisMonth) * 100)
      : 0;

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }
        .profile-container {
          min-height: 100vh;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          color: #1a1a1a;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transition: all 0.2s;
          margin-bottom: 2rem;
        }
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
        }
        .profile-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        .avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 2rem;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 2rem;
        }
        .avatar-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .avatar-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid white;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
        .avatar-upload-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          border: 3px solid white;
          transition: all 0.2s;
        }
        .avatar-upload-btn:hover {
          transform: scale(1.1);
        }
        .user-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }
        .user-email {
          font-size: 0.875rem;
          color: #666;
        }
        .info-section {
          margin-top: 2rem;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem;
          margin-bottom: 0.75rem;
          background: #f9f9f9;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .info-item:hover {
          background: #f0f0f0;
        }
        .info-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        .info-content {
          flex: 1;
        }
        .info-label {
          font-size: 0.75rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .info-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background: #f9f9f9;
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 0.75rem;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }
        .stat-label {
          font-size: 0.875rem;
          color: #666;
          font-weight: 500;
        }
        .section-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .progress-item {
          margin-bottom: 1.5rem;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .progress-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
        }
        .progress-value {
          font-size: 0.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .progress-bar-container {
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.5s ease;
          border-radius: 4px;
        }
        .logout-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #dc2626;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s;
          margin-top: 2rem;
          box-shadow: 0 2px 10px rgba(220, 38, 38, 0.15);
        }
        .logout-button:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.35);
        }
        .danger-zone {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(254, 226, 226, 0.3);
          border: 2px solid #ef4444;
          border-radius: 16px;
        }
        .danger-zone-title {
          font-size: 1rem;
          font-weight: 700;
          color: #dc2626;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .danger-zone-subtitle {
          font-size: 0.875rem;
          font-weight: 600;
          color: #991b1b;
          margin-bottom: 0.5rem;
        }
        .danger-zone-text {
          font-size: 0.8rem;
          color: #7f1d1d;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        .delete-account-btn {
          width: 100%;
          padding: 0.875rem;
          background: transparent;
          border: 2px solid #dc2626;
          border-radius: 10px;
          cursor: pointer;
          color: #dc2626;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .delete-account-btn:hover {
          background: #dc2626;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 9998;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 480px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s ease;
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .modal-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #fecaca 0%, #dc2626 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 1rem;
        }
        .modal-text {
          font-size: 0.95rem;
          color: #666;
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
        }
        .modal-btn {
          flex: 1;
          padding: 0.875rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .modal-btn-cancel {
          background: #f3f4f6;
          color: #374151;
        }
        .modal-btn-cancel:hover {
          background: #e5e7eb;
        }
        .modal-btn-delete {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
        }
        .modal-btn-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }
        @media (max-width: 968px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          .profile-container {
            padding: 1rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="profile-container">
        <button
          className="back-button"
          onClick={() => router.push("/dashboard/pomodoro")}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="profile-grid">
          {/* LEFT COLUMN - User Info */}
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&size=120&background=667eea&color=fff`
                  }
                  alt={user.name}
                  className="avatar-image"
                />
                <label htmlFor="avatar-upload" className="avatar-upload-btn">
                  <Camera size={18} style={{ color: "white" }} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                  disabled={uploadingAvatar}
                />
              </div>
              <h2 className="user-name">{user.name}</h2>
              <p className="user-email">{user.email}</p>
            </div>

            <div className="info-section">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Nome Completo</div>
                  <div className="info-value">{user.name}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Email</div>
                  <div className="info-value">{user.email}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Calendar size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Membro desde</div>
                  <div className="info-value">{formatDate(user.createdAt)}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Award size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Sequência</div>
                  <div className="info-value">{stats.streakDays} dias</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Tempo de Foco</div>
                  <div className="info-value">
                    {formatMinutes(stats.totalFocusTime)}
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Coffee size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Tempo de Pausa</div>
                  <div className="info-value">
                    {formatMinutes(stats.totalBreakTime)}
                  </div>
                </div>
              </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              <LogOut size={20} />
              Sair da Conta
            </button>

            {/* Danger Zone */}
            <div className="danger-zone">
              <div className="danger-zone-title">
                <AlertTriangle size={20} />
                Zona de Perigo
              </div>
              <div className="danger-zone-subtitle">Deletar essa conta</div>
              <p className="danger-zone-text">
                Uma vez que a conta seja eliminada, não há volta atrás. Por
                favor, tenha a certeza.
              </p>
              <button
                className="delete-account-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={18} />
                Deletar conta
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Stats & Progress */}
          <div className="profile-card">
            <h3 className="section-title">
              <TrendingUp size={20} />
              Estatísticas
            </h3>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <Target size={24} />
                </div>
                <div className="stat-value">{stats.totalPomodoros}</div>
                <div className="stat-label">Pomodoros</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Award size={24} />
                </div>
                <div className="stat-value">{stats.completedTasks}</div>
                <div className="stat-label">Tarefas Completas</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-value">{completionRate}%</div>
                <div className="stat-label">Taxa de Conclusão</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Calendar size={24} />
                </div>
                <div className="stat-value">{stats.streakDays}</div>
                <div className="stat-label">Dias Seguidos</div>
              </div>
            </div>

            <h3 className="section-title" style={{ marginTop: "2rem" }}>
              <Target size={20} />
              Progresso
            </h3>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Tarefas do Mês</span>
                <span className="progress-value">
                  {stats.completedTasksThisMonth}/{stats.tasksThisMonth}
                </span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${monthlyCompletionRate}%` }}
                />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Meta de Pomodoros</span>
                <span className="progress-value">
                  {stats.totalPomodoros}/100
                </span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min(
                      (stats.totalPomodoros / 100) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Sequência de Dias</span>
                <span className="progress-value">{stats.streakDays}/30</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min((stats.streakDays / 30) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Total de Tarefas</span>
                <span className="progress-value">
                  {stats.completedTasks}/{stats.totalTasks}
                </span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            {/* Achievement Section */}
            {stats.streakDays >= 7 && (
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.5rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  color: "white",
                }}
              >
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Award size={20} />
                  Conquista Recente
                </h4>
                <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                  Parabéns! Você completou {stats.streakDays} dias seguidos de
                  produtividade!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <AlertTriangle size={32} />
            </div>
            <h2 className="modal-title">Deletar Conta?</h2>
            <p className="modal-text">
              Esta ação é <strong>permanente</strong> e não pode ser desfeita.
              Todos os seus dados, incluindo tarefas, pomodoros e progresso
              serão perdidos para sempre.
            </p>
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className="modal-btn modal-btn-delete"
                onClick={() => {
                  setShowDeleteModal(false);
                  handleDeleteAccount();
                }}
              >
                <Trash2 size={18} />
                Deletar Permanentemente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;