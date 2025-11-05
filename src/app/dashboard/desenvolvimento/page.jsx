"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Heart, Clock, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const CARDS = [
  {
    id: 1,
    title: "Gestão do Tempo",
    summary: "Organize sua rotina e priorize o essencial.",
    content: "Técnicas como Pomodoro e GTD ajudam na concentração e foco.",
    icon: Clock,
  },
  {
    id: 2,
    title: "Inteligência Emocional",
    summary: "Entenda como o equilíbrio emocional influencia sua produtividade.",
    content: "Reconheça emoções e transforme-as em energia positiva.",
    icon: Heart,
  },
  {
    id: 3,
    title: "Desenvolvimento Cognitivo",
    summary: "Fortaleça o cérebro com práticas de atenção e aprendizado.",
    content: "Mindfulness e leitura ativa expandem a capacidade de foco.",
    icon: Brain,
  },
];

export default function DesenvolvimentoPage() {
  const [openCard, setOpenCard] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 px-6 py-12 relative">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-6 right-6 p-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:scale-110 transition"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={22} />}
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8"
      >
        Desenvolvimento Pessoal & Foco
      </motion.h1>

      <p className="max-w-md mx-auto mb-10 text-center text-slate-600 dark:text-slate-300">
        Explore os temas que fortalecem o seu foco, energia e hábitos para que o
        seu ritmo de trabalho seja sustentável e impactante.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const isOpen = openCard === card.id;
          return (
            <motion.div
              key={card.id}
              className="bg-slate-100 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg cursor-pointer relative overflow-hidden"
              onClick={() => setOpenCard(isOpen ? null : card.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={28} color={theme === "light" ? "#2563eb" : "#60a5fa"} />
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
              <p className="mb-4">{card.summary}</p>
              {isOpen && (
                <motion.div
                  className="mt-4 text-sm text-slate-700 dark:text-slate-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {card.content}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link href="/foco">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl dark:bg-slate-100 dark:text-slate-900"
          >
            Voltar ao Teste de Foco
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
