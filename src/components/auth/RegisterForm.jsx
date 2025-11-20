"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Sparkles, CheckCircle } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Falha no registro");
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = formData.password.length >= 8 ? 'forte' : formData.password.length >= 6 ? 'média' : formData.password.length > 0 ? 'fraca' : '';

  return (
    <>
      <style>{`
        /* Corrige a cor do texto dos inputs */
.form-input {
  color: #1a1a1a; /* texto preto suave */
  background: white;
}

/* Corrige a cor dos placeholders */
.form-input::placeholder {
  color: #9ca3af; /* cinza visível */
  opacity: 1; /* garante que a cor seja aplicada */
}
        
.form-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  color: #111827;
}

        .pomodoro-register {
          min-height: 100vh;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .pomodoro-register::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: floatReverse 25s linear infinite;
        }

        @keyframes floatReverse {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-40px, -40px) rotate(360deg); }
        }

        .register-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 3rem;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 1;
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .register-title {
          text-align: center;
          margin-bottom: 2rem;
        }

        .register-title h1 {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .register-title p {
          color: #666;
          font-size: 0.875rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }
          .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          width: 48px;
          height: 48px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          color: #1a1a1a;
        }

        .back-button:hover {
          border-color: #667eea;
          transform: translateX(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          background: white;
        }

        .form-input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .password-strength {
          margin-top: 0.5rem;
          display: flex;
          gap: 0.25rem;
        }

        .strength-bar {
          flex: 1;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          transition: background 0.3s;
        }

        .strength-bar.active.weak {
          background: #ef4444;
        }

        .strength-bar.active.medium {
          background: #f59e0b;
        }

        .strength-bar.active.strong {
          background: #10b981;
        }

        .strength-label {
          margin-top: 0.25rem;
          font-size: 0.75rem;
          color: #666;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(16, 185, 129, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .features-list {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 16px;
          border: 2px solid #d1fae5;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: #065f46;
          font-size: 0.875rem;
        }

        .feature-item:last-child {
          margin-bottom: 0;
        }

        .feature-icon {
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .footer-text {
          text-align: center;
          margin-top: 2rem;
          color: #666;
          font-size: 0.875rem;
        }

        .footer-link {
          color: #10b981;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #059669;
        }

        .alert {
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .alert-error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        @media (max-width: 640px) {
          .register-card {
            padding: 2rem;
          }

          .register-title h1 {
            font-size: 1.5rem;
          }

          .features-list {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="pomodoro-register">
        <div className="register-card">
          <Link href="/" className="back-button">
            <ArrowLeft size={24} />
          </Link>
          <div className="logo-container">
            <div className="logo">
              <img
                src="/images/logos.png"
                alt="Logo de Tomate"
                className="w-55 h-55 object-contain"
              />
            </div>
          </div>

          <div className="register-title">
            <h1>Crie sua conta</h1>
            <p>Comece a produzir mais com foco e motivação</p>
          </div>

          {error && (
            <div className="alert alert-error">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              {formData.password && (
                <>
                  <div className="password-strength">
                    <div className={`strength-bar ${passwordStrength === 'fraca' || passwordStrength === 'média' || passwordStrength === 'forte' ? 'active weak' : ''}`}></div>
                    <div className={`strength-bar ${passwordStrength === 'média' || passwordStrength === 'forte' ? 'active medium' : ''}`}></div>
                    <div className={`strength-bar ${passwordStrength === 'forte' ? 'active strong' : ''}`}></div>
                  </div>
                  <div className="strength-label">
                    Força da senha: <strong>{passwordStrength || 'muito fraca'}</strong>
                  </div>
                </>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar Senha</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                "Criando conta..."
              ) : (
                <>
                  <Sparkles size={20} />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          <p className="footer-text">
            Já tem uma conta?{" "}
            <Link href="/login" className="footer-link">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}