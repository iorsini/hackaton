// src/components/ui/Card.jsx
export default function Card({ 
  children, 
  hover = false,
  gradient = false,
  className = "",
  onClick,
  ...props 
}) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl p-6 border
        ${gradient 
          ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50' 
          : 'bg-secondary'
        }
        ${hover 
          ? 'hover:border-accent/70 transition-all cursor-pointer hover:scale-[1.02]' 
          : 'border-gray-700/50'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

// Exemplo de uso:
// <Card gradient hover onClick={() => navigate('/somewhere')}>
//   <h3>Título</h3>
//   <p>Conteúdo</p>
// </Card>