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

const perguntasPomodoro = [
  {
    id: 1,
    texto: "Por quanto tempo você costuma manter o foco antes de se distrair?",
    opcoes: [
      { label: "Menos de 15 minutos", valor: "curto" },
      { label: "Cerca de 25 minutos", valor: "medio" },
      { label: "40-60 minutos", valor: "longo" },
      { label: "Mais de 1h30", valor: "extenso" },
    ],
  },
  {
    id: 2,
    texto: "Como está o teu nível de energia hoje?",
    opcoes: [
      { label: "Baixo, cansado", valor: "baixo" },
      { label: "Normal", valor: "medio" },
      { label: "Motivado e energizado", valor: "alto" },
    ],
  },
  {
    id: 3,
    texto: "Qual tipo de tarefa você vai fazer?",
    opcoes: [
      { label: "Criativa ou artística", valor: "criativo" },
      { label: "Analítica ou técnica", valor: "tecnico" },
      { label: "Rotineira ou simples", valor: "rotina" },
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

  const [etapaPomodoro, setEtapaPomodoro] = useState(0);
  const [respostasPomodoro, setRespostasPomodoro] = useState({});
  const [resultadoPomodoro, setResultadoPomodoro] = useState(null);

  const [perguntaAtualFoco, setPerguntaAtualFoco] = useState(0);
  const [respostasFoco, setRespostasFoco] = useState([]);
  const [resultadoFoco, setResultadoFoco] = useState(null);

  const [openCard, setOpenCard] = useState(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // ====== Funções do teste Pomodoro ======
  const handleRespostaPomodoro = (id, valor) => {
    setRespostasPomodoro({ ...respostasPomodoro, [id]: valor });
    setEtapaPomodoro(etapaPomodoro + 1);
  };

  const calcularPomodoro = () => {
    const foco = respostasPomodoro[1];
    const energia = respostasPomodoro[2];
    const tipo = respostasPomodoro[3];
    if (energia === "baixo" || foco === "curto")
      setResultadoPomodoro({
        nome: "Suave (15/3)",
        cor: "#f59e0b",
        icon: Coffee,
      });
    else if (foco === "medio" && energia === "medio")
      setResultadoPomodoro({
        nome: "Clássico (25/5)",
        cor: "#3b82f6",
        icon: Brain,
      });
    else if (foco === "longo" || tipo === "tecnico")
      setResultadoPomodoro({
        nome: "Profundo (50/10)",
        cor: "#10b981",
        icon: Zap,
      });
    else
      setResultadoPomodoro({
        nome: "Intenso (90/20)",
        cor: "#ec4899",
        icon: Smile,
      });
  };

  // ====== Funções do teste de foco ======
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
    criativo: { cor: "from-pink-400 to-purple-500" },
    estrategista: { cor: "from-blue-500 to-indigo-600" },
    zen: { cor: "from-green-400 to-teal-500" },
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 px-6 py-12 relative">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-6 right-6 p-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:scale-110 transition"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={22} />}
      </button>

      {/* ====== Topo com duas colunas unificadas ====== */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 mb-20">
        {/* Coluna 1 */}
        <motion.div
          className="flex-1 bg-slate-100 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
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
                <p className="text-lg mb-6">
                  {perguntasFoco[perguntaAtualFoco].texto}
                </p>
                <div className="flex flex-col gap-3">
                  {perguntasFoco[perguntaAtualFoco].opcoes.map((opcao, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleRespostaFoco(opcao.tipo)}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-slate-900 py-3 rounded-xl shadow hover:shadow-md transition"
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
                className={`text-center p-6 rounded-2xl bg-gradient-to-br ${estilosFoco[resultadoFoco].cor} text-white shadow-lg`}
              >
                <h3 className="text-xl font-bold mb-2">
                  Teu foco é {resultadoFoco.toUpperCase()}!
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ====== Cards e mini jogo ====== */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-semibold mt-8 mb-6 text-center"
      >
        Desenvolvimento Pessoal & Foco
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const isOpen = openCard === card.id;
          return (
            <motion.div
              key={card.id}
              className="bg-slate-100 dark:bg-slate-800/70 rounded-2xl p-6 shadow-lg cursor-pointer"
              onClick={() => setOpenCard(isOpen ? null : card.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon
                  size={28}
                  color={theme === "light" ? "#2563eb" : "#60a5fa"}
                />
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

      <DesafioFoco />
    </div>
  );
}
