"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Github, Mail, Lock, Sparkles, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const errorParam = searchParams.get("error");

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);

  useEffect(() => {
    if (errorParam) {
      const errorMessages = {
        OAuthSignin: "Erro ao conectar. Tente novamente.",
        OAuthCallback: "Erro na autenticação. Tente novamente.",
        Configuration: "Erro no servidor. Contacte o suporte.",
        AccessDenied: "Acesso negado. Verifique suas permissões.",
        Verification: "Verificação falhou. Tente novamente.",
      };

      setError(
        errorMessages[errorParam] || "Erro de autenticação. Tente novamente."
      );

      setTimeout(() => {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }, 100);
    }
  }, [errorParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/pomodoro");
      }
    } catch {
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setError("");
    setOauthLoading(provider);
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard/pomodoro",
        redirect: true,
      });
    } catch (error) {
      setError("Login OAuth falhou. Tente novamente.");
      setOauthLoading(null);
    }
  };

  return (
    <>
      <style>{`
        .form-input {
  color: #1a1a1a; /* texto preto suave */
  background: white;
}

/* Corrige a cor dos placeholders */
.form-input::placeholder {
  color: #9ca3af; /* cinza visível */
  opacity: 1; /* garante que a cor seja aplicada */
}

/* Modo focado (borda e texto com destaque) */
.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  color: #111827; /* um pouco mais escuro ao digitar */
}
        
        .pomodoro-login {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .pomodoro-login::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: float 20s linear infinite;
        }

        @keyframes float {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .login-card {
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

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .login-title {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-title h1 {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .login-title p {
          color: #666;
          font-size: 0.875rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
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
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          color: #999;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .oauth-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .oauth-btn {
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .oauth-btn:hover:not(:disabled) {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .oauth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .oauth-btn.github {
          color: #1a1a1a;
        }

        .oauth-btn.google {
          color: #1a1a1a;
        }

        .footer-text {
          text-align: center;
          margin-top: 2rem;
          color: #666;
          font-size: 0.875rem;
        }

        .footer-link {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #764ba2;
        }

        .alert {
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .alert-success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #6ee7b7;
        }

        .alert-error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        @media (max-width: 640px) {
          .login-card {
            padding: 2rem;
          }

          .back-button {
            top: 1.5rem;
            left: 1.5rem;
            width: 40px;
            height: 40px;
          }

          .login-title h1 {
            font-size: 1.5rem;
          }

          .oauth-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="pomodoro-login">
        <div className="login-card">
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

          <div className="login-title">
            <h1>Bem-vindo de volta!</h1>
            <p>Entre para continuar seu progresso</p>
          </div>

          {registered && (
            <div className="alert alert-success">
              ✓ Conta criada! Faça login para continuar.
            </div>
          )}
          {error && <div className="alert alert-error">✕ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                "Entrando..."
              ) : (
                <>
                  <Sparkles size={20} color="#FFFFFF" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">OU ENTRE COM</span>
            <div className="divider-line"></div>
          </div>

          <div className="oauth-buttons">
            <button
              onClick={() => handleOAuthSignIn("github")}
              disabled={oauthLoading === "github"}
              className="oauth-btn github"
            >
              {oauthLoading === "github" ? (
                <span>...</span>
              ) : (
                <>
                  <Github size={20} />
                  <span>GitHub</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading === "google"}
              className="oauth-btn google"
            >
              {oauthLoading === "google" ? (
                <span>...</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                      fill="#4285F4"
                      d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
                    />
                    <path
                      fill="#34A853"
                      d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
                    />
                    <path
                      fill="#EA4335"
                      d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
                    />
                  </svg>
                  <span>Google</span>
                </>
              )}
            </button>
          </div>

          <p className="footer-text">
            Não tem uma conta?{" "}
            <Link href="/register" className="footer-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default function LoginForm() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div style={{ color: "white", fontSize: "1.5rem" }}>
            Carregando...
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}