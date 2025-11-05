"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Brain,
  Heart,
  Clock,
  Sun,
  Moon,
  Timer,
  Coffee,
  Zap,
  Smile,
} from "lucide-react";
import DesafioFoco from "@/components/teste/DesafioFoco";

const perguntasFoco = [
  {
    id: 1,
    texto: "Como você se sente mais produtivo?",
    opcoes: [
      { texto: "Explorando ideias novas", tipo: "criativo" },
      { texto: "Com metas claras e listas", tipo: "estrategista" },
      { texto: "Num ambiente calmo e equilibrado", tipo: "zen" },
    ],
  },
  {
    id: 2,
    texto: "Qual trilha sonora combina com seu momento de foco?",
    opcoes: [
      { texto: "Lo-fi ou jazz leve", tipo: "zen" },
      { texto: "Pop animado ou eletrônica", tipo: "criativo" },
      { texto: "Silêncio total ou sons da natureza", tipo: "estrategista" },
    ],
  },
  {
    id: 3,
    texto: "Quando precisa resolver algo difícil, você...",
    opcoes: [
      { texto: "Desenha, rabisca e pensa visualmente", tipo: "criativo" },
      { texto: "Respira fundo e organiza passo a passo", tipo: "estrategista" },
      { texto: "Desliga tudo, toma um café e volta tranquilo", tipo: "zen" },
    ],
  },
];

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
    summary:
      "Entenda como o equilíbrio emocional influencia sua produtividade.",
    content: "Reconheça emoções e transforme-as em energia positiva.",
    icon: Heart,
  },
  {
    id: 3,
    title: "Desenvolvimento Cognitivo",
    summary:
      "Fortaleça o cérebro com práticas de atenção e aprendizado.",
    content: "Mindfulness e leitura ativa expandem a capacidade de foco.",
    icon: Brain,
  },
];

export default function TesteFocoPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [perguntaAtualFoco, setPerguntaAtualFoco] = useState(0);
  const [respostasFoco, setRespostasFoco] = useState([]);
  const [resultadoFoco, setResultadoFoco] = useState(null);
  const [openCard, setOpenCard] = useState(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // ====== Lógica do teste de foco ======
  const handleRespostaFoco = (tipo) => {
    const novasRespostas = [...respostasFoco, tipo];
    setRespostasFoco(novasRespostas);
    if (perguntaAtualFoco + 1 < perguntasFoco.length) {
      setPerguntaAtualFoco(perguntaAtualFoco + 1);
    } else {
      const contagem = novasRespostas.reduce((acc, t) => {
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {});
      const tipoFinal = Object.keys(contagem).reduce((a, b) =>
        contagem[a] > contagem[b] ? a : b
      );
      setResultadoFoco(tipoFinal);
    }
  };

  const estilosFoco = {
    criativo: { cor: "from-pink-500 to-purple-600" },
    estrategista: { cor: "from-indigo-500 to-blue-600" },
    zen: { cor: "from-green-400 to-teal-500" },
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 px-4 sm:px-6 lg:px-10 py-12 relative">
      
      {/* Botão tema */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-6 right-6 p-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:scale-110 transition"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={22} />}
      </button>

      {/* ====== Teste de Foco ====== */}
      <div className="flex flex-col items-center justify-center mb-20">
        <motion.div
          className="w-full max-w-2xl bg-white/70 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-slate-200/30 dark:border-slate-700/30"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            Descubra seu tipo de foco
          </h2>
          <AnimatePresence mode="wait">
            {!resultadoFoco ? (
              <motion.div
                key={perguntaAtualFoco}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-lg mb-6 font-medium">
                  {perguntasFoco[perguntaAtualFoco].texto}
                </p>
                <div className="flex flex-col gap-3">
                  {perguntasFoco[perguntaAtualFoco].opcoes.map((opcao, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleRespostaFoco(opcao.tipo)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 py-3 rounded-xl shadow-sm hover:shadow-md transition text-sm sm:text-base"
                    >
                      {opcao.texto}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="resultadoFoco"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br ${estilosFoco[resultadoFoco].cor} text-white shadow-lg`}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Teu foco é {resultadoFoco.toUpperCase()}!
                </h3>
                <p className="text-sm opacity-90">
                  Esse estilo revela como você rende melhor. Explore abaixo!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const isOpen = openCard === card.id;
          return (
            <motion.div
              key={card.id}
              className="bg-white dark:bg-slate-800/70 rounded-2xl p-6 shadow-md border border-slate-200/50 dark:border-slate-700/50 cursor-pointer hover:shadow-lg transition"
              onClick={() => setOpenCard(isOpen ? null : card.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon
                  size={26}
                  color={theme === "light" ? "#4338ca" : "#818cf8"}
                />
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <p className="text-sm mb-3 text-slate-600 dark:text-slate-300">
                {card.summary}
              </p>
              {isOpen && (
                <motion.div
                  className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {card.content}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ====== Mini Jogo / Desafio ====== */}
      <div className="max-w-5xl mx-auto">
        <DesafioFoco />
      </div>
    </div>
  );
}
