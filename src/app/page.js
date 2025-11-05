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
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ 
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          🍅
        </div>
        <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          Carregando...
        </p>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}