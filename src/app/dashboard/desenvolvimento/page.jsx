"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Target, Heart, Sun, Brain } from "lucide-react";
import Link from "next/link";

const CARDS = [
  {
    id: "gestao-tempo",
    title: "Gestão de Tempo",
    icon: Book,
    summary:
      "Entenda como dividir seu tempo, definir prioridades e aplicar técnicas como Pomodoro, GTD e Deep Work.",
    content:
      "A gestão eficaz do tempo é mais que cronômetros: envolve definir o que é importante, eliminar o que não é, e estruturar blocos de ação para que o foco aconteça. Combine técnicas como o Pomodoro Technique com pausas previstas para recuperar energia e evitar fadiga mental. :contentReference[oaicite:6]{index=6}",
  },
  {
    id: "energia-e-descanso",
    title: "Energia e Descanso",
    icon: Sun,
    summary:
      "Gerenciar sua energia é tão importante quanto gerenciar seu tempo – descubra como equilíbrio faz a diferença.",
    content:
      "Nosso cérebro funciona em ciclos: trabalhar sem pausa drena recursos cognitivos, e pausas curtas ou longas ajudam a restaurar o foco e motivação. Estudos indicam que pausas sistemáticas podem melhorar eficiência e gerar melhor experiência de estudo. :contentReference[oaicite:7]{index=7}",
  },
  {
    id: "mindset-de-crescimento",
    title: "Mindset de Crescimento",
    icon: Brain,
    summary:
      "Cultivar uma mentalidade de aprendizado contínuo libera seu potencial e transforma desafios em oportunidades.",
    content:
      "Quando vemos habilidades como algo que pode ser desenvolvido, nossas respostas ao erro e à pausa mudam — passamos a chamar interrompções de parte do processo, não falhas. Isso fortalece a resiliência, a consistência e a segurança pessoal.",
  },
  {
    id: "consistencia",
    title: "Consistência > Motivação",
    icon: Target,
    summary:
      "Motivação vem e vai — consistência é o que constrói resultados reais. Veja como criar hábitos que duram.",
    content:
      "Criar o hábito de sessões regulares de foco e pausa transforma a produtividade: com o tempo, o cérebro se adapta ao padrão, o que reduz a resistência para começar e melhora o ritmo. Pequenas vitórias acumuladas geram confiança e segurança.",
  },
  {
    id: "equilibrio-emocional",
    title: "Equilíbrio Emocional",
    icon: Heart,
    summary:
      "Trabalhar bem inclui cuidar da mente: aprenda a lidar com ansiedade, distração e manter o foco interno.",
    content:
      "Alta produtividade não significa ignorar sinais de exaustão ou ansiedade. Prestar atenção na fadiga, descansar adequadamente e ajustar seus blocos de foco com pausas mais longas quando necessário, ajuda a sustentar rendimento e bem-estar.",
  },
];

export default function DesenvolvimentoPage() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8"
      >
        Desenvolvimento Pessoal & Foco
      </motion.h1>

      <p className="text-slate-600 max-w-md mx-auto mb-10 text-center">
        Explore os temas que fortalecem o seu foco, energia e hábitos para que o seu ritmo de trabalho seja sustentável e impactante.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const isOpen = openCard === card.id;
          return (
            <motion.div
              key={card.id}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg cursor-pointer relative overflow-hidden"
              onClick={() => setOpenCard(isOpen ? null : card.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={28} color="#2563eb" />
                <h3 className="text-xl font-semibold text-slate-800">
                  {card.title}
                </h3>
              </div>
              <p className="text-slate-700 mb-4">{card.summary}</p>
              {isOpen && (
                <motion.div
                  className="mt-4 text-slate-600 text-sm"
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
            className="bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl"
          >
            Voltar ao Teste de Foco
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
