// src/lib/utils.js

// Formatar data
export function formatDate(date, locale = 'pt-BR') {
  return new Date(date).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Formatar data e hora
export function formatDateTime(date, locale = 'pt-BR') {
  return new Date(date).toLocaleString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Data relativa (há 2 horas, há 3 dias)
export function timeAgo(date, locale = 'pt-BR') {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  const intervals = {
    ano: 31536000,
    mês: 2592000,
    dia: 86400,
    hora: 3600,
    minuto: 60
  };
  
  for (const [name, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `há ${interval} ${name}${interval > 1 ? 's' : ''}`;
    }
  }
  
  return 'agora mesmo';
}

// Truncar texto
export function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

// Formatar número (1000 -> 1k)
export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

// Gerar ID único
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Debounce
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Validar email
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Copiar para clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Download arquivo
export function downloadFile(data, filename, type = 'text/plain') {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Combinar classNames (similar ao clsx)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}