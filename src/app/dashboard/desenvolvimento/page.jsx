"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Timer, Brain, Coffee, Zap, Smile } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FocoPage() {
  const router = useRouter();

  const techniques = [
    {
      id: "classic",
      title: "Clássico (25/5)",
      description:
        "25 minutos de foco seguidos por 5 minutos de pausa. Ideal para manter ritmo estável e evitar fadiga mental. É a técnica original criada por Francesco Cirillo nos anos 80.",
      focus: 25,
      break: 5,
      color: "#3b82f6",
      icon: Brain,
    },
    {
      id: "deep",
      title: "Profundo (50/10)",
      description:
        "Sessões longas de 50 minutos com pausas de 10. Recomendado para trabalho analítico e concentração profunda, reduz interrupções e ajuda a entrar em ‘flow’.",
      focus: 50,
      break: 10,
      color: "#10b981",
      icon: Zap,
    },
    {
      id: "soft",
      title: "Suave (15/3)",
      description:
        "Curto e leve: 15 minutos de foco + 3 de pausa. Ótimo para dias de baixa energia, tarefas pequenas ou para retomar o ritmo de trabalho.",
      focus: 15,
      break: 3,
      color: "#f59e0b",
      icon: Coffee,
    },
    {
      id: "intense",
      title: "Intenso (90/20)",
      description:
        "90 minutos de imersão total seguidos de 20 de pausa longa. Inspirado em estudos de alto ritmo, ideal para quem já domina o foco prolongado.",
      focus: 90,
      break: 20,
      color: "#ec4899",
      icon: Smile,
    },
  ];

  const scienceText = `Trabalhar em blocos definidos respeita nossos ritmos e reduz sobrecarga cognitiva. Pesquisas da Universidade de Illinois (2011) comprovaram que pequenas pausas restauram a atenção.`;

  const perguntas = [
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

  const [respostas, setRespostas] = useState({});
  const [etapa, setEtapa] = useState(0);
  const [resultado, setResultado] = useState(null);

  const handleResposta = (id, valor) => {
    setRespostas({ ...respostas, [id]: valor });
    setEtapa(etapa + 1);
  };

  const calcularResultado = () => {
    const foco = respostas[1];
    const energia = respostas[2];
    const tipo = respostas[3];

    if (energia === "baixo" || foco === "curto")
      setResultado({
        nome: "Suave (15/3)",
        descricao: "Perfeito para recomeçar e manter a leveza.",
        cor: "#f59e0b",
        icon: Coffee,
        mood: "tired",
      });
    else if (foco === "medio" && energia === "medio")
      setResultado({
        nome: "Clássico (25/5)",
        descricao:
          "Equilíbrio ideal entre foco e descanso. O método Pomodoro tradicional.",
        cor: "#3b82f6",
        icon: Brain,
        mood: "creative",
      });
    else if (foco === "longo" || tipo === "tecnico")
      setResultado({
        nome: "Profundo (50/10)",
        descricao:
          "Excelente para manter foco intenso em tarefas complexas e analíticas.",
        cor: "#10b981",
        icon: Zap,
        mood: "focused",
      });
    else
      setResultado({
        nome: "Intenso (90/20)",
        descricao:
          "Modo avançado para quem domina a atenção prolongada e quer explorar o ‘flow’.",
        cor: "#ec4899",
        icon: Smile,
        mood: "energized",
      });
  };

  const handleEscolher = () => {
    router.push(`/dashboard/pomodoro?mode=${resultado.mood}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 sm:px-6 md:px-10 py-10 flex flex-col items-center">
      {/* Título e subtítulo */}
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4"
      >
        Foco e Produtividade
      </motion.h1>

      <p className="text-slate-600 text-center max-w-2xl mb-10 text-sm sm:text-base px-2">
        Conhece as variações da Técnica Pomodoro e descobre qual ritmo de foco
        combina contigo hoje.
      </p>

      {/* Cards das técnicas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-12 max-w-5xl w-full">
        {techniques.map((tech) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon size={28} color={tech.color} />
                <h3
                  className="text-lg sm:text-xl font-semibold"
                  style={{ color: tech.color }}
                >
                  {tech.title}
                </h3>
              </div>
              <p className="text-slate-700 text-sm sm:text-base mb-3">{tech.description}</p>
              <span className="text-xs sm:text-sm text-slate-500">
                Foco: {tech.focus} min • Pausa: {tech.break} min
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Texto científico */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 sm:p-6 shadow-lg max-w-3xl mb-10 w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base text-center">
          {scienceText}
        </p>
      </motion.div>

      {/* Quiz */}
      <AnimatePresence mode="wait">
        {!resultado && etapa < perguntas.length && (
          <motion.div
            key={etapa}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-6">
              {perguntas[etapa].texto}
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4">
              {perguntas[etapa].opcoes.map((op, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleResposta(perguntas[etapa].id, op.valor)}
                  className="p-3 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md text-slate-700 text-sm sm:text-base font-medium transition"
                >
                  {op.label}
                </motion.button>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-6">
              Pergunta {etapa + 1} de {perguntas.length}
            </div>
          </motion.div>
        )}

        {!resultado && etapa === perguntas.length && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
              Pronto para descobrir o teu modo de foco?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={calcularResultado}
              className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
            >
              <ArrowRight size={18} /> Ver resultado
            </motion.button>
          </motion.div>
        )}

        {resultado && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
          >
            <div className="flex justify-center mb-4" style={{ color: resultado.cor }}>
              {<resultado.icon size={48} />}
            </div>
            <h2
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ color: resultado.cor }}
            >
              {resultado.nome}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-6">
              {resultado.descricao}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEscolher}
              className="bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Timer size={18} /> Ir para o Pomodoro
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
