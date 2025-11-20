'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Espera carregar
    
    // Sempre redireciona para o dashboard, com ou sem login
    router.push('/dashboard/pomodoro');
  }, [session, status, router]);

  // Tela de loading enquanto verifica
  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    }}
  >
    <img
      src="/images/logos.png"
      alt="Pomofy Logo"
      style={{
        width: "220px",          // 👈 aumenta o tamanho da logo
        height: "auto",
        borderRadius: "24px",    // 👈 bordas suaves
        background: "white",     // 👈 mantém contraste com o fundo roxo
        padding: "1rem",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.25)",
        animation: "pulse 2s ease-in-out infinite",
      }}
    />
    <p
      style={{
        fontSize: "1.5rem",
        fontWeight: "600",
        color: "white",
        marginTop: "1.5rem",
      }}
    >
      Carregando...
    </p>

    <style jsx>{`
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.08);
        }
      }
    `}</style>
  </div>
);
}