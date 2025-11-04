"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Mail, Calendar, Award, Target, TrendingUp, Camera, ArrowLeft, LogOut } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AvatarUpload from "@/components/profile/AvatarUpload";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  // Mock data - você pode substituir com dados reais da API
  const stats = {
    totalPomodoros: 47,
    totalTasks: 123,
    completedTasks: 98,
    streakDays: 7
  };

  const completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);

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
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }
        .avatar-upload-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
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
          background: #fee;
          border: 2px solid #fcc;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #dc2626;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s;
          margin-top: 2rem;
        }
        .logout-button:hover {
          background: #dc2626;
          border-color: #dc2626;
          color: white;
        }
        @media (max-width: 968px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          .profile-container {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="profile-container">
        <button className="back-button" onClick={() => router.push('/')}>
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="profile-grid">
          {/* LEFT COLUMN - User Info */}
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img 
                  src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name)}&size=120&background=667eea&color=fff`}
                  alt={session.user.name}
                  className="avatar-image"
                />
                <button className="avatar-upload-btn">
                  <Camera size={20} />
                </button>
              </div>
              <h2 className="user-name">{session.user.name}</h2>
              <p className="user-email">{session.user.email}</p>
            </div>

            <div className="info-section">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Nome Completo</div>
                  <div className="info-value">{session.user.name}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Email</div>
                  <div className="info-value">{session.user.email}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Calendar size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Membro desde</div>
                  <div className="info-value">Novembro 2024</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Award size={20} />
                </div>
                <div className="info-content">
                  <div className="info-label">Sequência</div>
                  <div className="info-value">{stats.streakDays} dias 🔥</div>
                </div>
              </div>
            </div>

            <button className="logout-button" onClick={() => router.push('/api/auth/signout')}>
              <LogOut size={20} />
              Sair da Conta
            </button>
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

            <h3 className="section-title" style={{ marginTop: '2rem' }}>
              <Target size={20} />
              Progresso
            </h3>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Tarefas do Mês</span>
                <span className="progress-value">{stats.completedTasks}/{stats.totalTasks}</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${completionRate}%` }} />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Meta de Pomodoros</span>
                <span className="progress-value">{stats.totalPomodoros}/100</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${(stats.totalPomodoros / 100) * 100}%` }} />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Sequência de Dias</span>
                <span className="progress-value">{stats.streakDays}/30</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${(stats.streakDays / 30) * 100}%` }} />
              </div>
            </div>

            {/* Achievement Section */}
            <div style={{ 
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              color: 'white'
            }}>
              <h4 style={{ 
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Award size={20} />
                Conquista Recente
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                🎉 Parabéns! Você completou 7 dias seguidos de produtividade!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}