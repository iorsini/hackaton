// src/components/ui/LoadingScreen.jsx
"use client";

export default function LoadingScreen({ message = "Carregando..." }) {
  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .loading-logo {
          width: 220px;
          height: auto;
          border-radius: 24px;
          background: white;
          padding: 1rem;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-text {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-top: 1.5rem;
        }
      `}</style>

      <div className="loading-screen">
        <img
          src="/images/pomofy.webp"
          alt="Pomofy Logo"
          className="loading-logo"
        />
        <p className="loading-text">{message}</p>
      </div>
    </>
  );
}