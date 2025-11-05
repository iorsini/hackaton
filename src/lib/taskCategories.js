// lib/taskCategories.js
import { Briefcase, Heart, Brain, BookOpen, User, MoreHorizontal } from 'lucide-react';

export const TASK_CATEGORIES = {
  trabalho: {
    id: 'trabalho',
    label: 'Trabalho',
    icon: Briefcase,
    color: '#3b82f6', // azul
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  'saude-fisica': {
    id: 'saude-fisica',
    label: 'Saúde Física',
    icon: Heart,
    color: '#ef4444', // vermelho
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
  'saude-mental': {
    id: 'saude-mental',
    label: 'Saúde Mental',
    icon: Brain,
    color: '#a855f7', // roxo
    gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
  },
  estudo: {
    id: 'estudo',
    label: 'Estudos',
    icon: BookOpen,
    color: '#10b981', // verde
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  pessoal: {
    id: 'pessoal',
    label: 'Pessoal',
    icon: User,
    color: '#f59e0b', // laranja
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  outros: {
    id: 'outros',
    label: 'Outros',
    icon: MoreHorizontal,
    color: '#64748b', // cinza
    gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
  }
};