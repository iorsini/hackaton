"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Heart,
  Brain,
  Clock,
  Sparkles,
  CheckCircle,
  Leaf,
} from "lucide-react";
import TeamModal from "@/components/dashboard/TeamModal";

export default function AboutPomofy() {
  const [showTeamModal, setShowTeamModal] = useState(false);

  const teamMembers = [
    {
      name: "Paula Guollo",
      role: "Full-Stack Developer",
      github: "https://github.com/paulaguollo",
      linkedin: "https://linkedin.com/in/paula-guollo",
      avatar: "/images/paula.jpeg",
    },
    {
      name: "Guilherme França",
      role: "Full-Stack Developer",
      github: "https://github.com/guilhermesfranca",
      linkedin: "https://www.linkedin.com/in/guilhermesfranca/",
      avatar: "/images/guilherme.jpeg",
    },
    {
      name: "Isadora Barradas",
      role: "Frontend Developer",
      github: "https://github.com/iorsini",
      linkedin: "https://www.linkedin.com/in/isadora-barradas/",
      avatar: "/images/isadora.jpeg",
    },
    {
      name: "Jhonathan Tinoco",
      role: "Full-Stack Developer",
      github: "https://github.com/Jhonathan-Tinoco",
      linkedin: "https://linkedin.com/in/jhonathan-tinoco",
      avatar: "/images/jhonathan.jpeg",
    },
  ];

  const features = [
    {
      icon: <Heart className="w-5 h-5 text-green-700" />,
      title: "Produtividade sem Culpa",
      description: "O Pomofy adapta o ritmo conforme o teu humor.",
    },
    {
      icon: <Brain className="w-5 h-5 text-green-700" />,
      title: "Foco e Criatividade",
      description: "Alterna ciclos de foco e pausas para estimular o equilíbrio mental.",
    },
    {
      icon: <Clock className="w-5 h-5 text-green-700" />,
      title: "Ritmo Saudável",
      description: "Ajuda-te a manter constância diária, sem pressão ou exaustão.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-green-700" />,
      title: "Mood Tracking",
      description: "Vê o teu mood e acompanha a tua evolução ao longo dos dias.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 text-green-900 flex flex-col items-center px-6 py-10">
      {/* HEADER */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 bg-green-700/10 text-green-800 font-medium px-4 py-2 rounded-xl hover:bg-green-700/20 transition-all"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Sobre o Pomofy
        </h1>
        <img
          src="/images/pomofy.webp"
          alt="Pomofy Logo"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-green-500/30"
        />
      </div>

      {/* HERO */}
      <div className="max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-green-200">
        <h2 className="text-3xl font-bold mb-3 text-green-800">
          Um Pomodoro Empático
        </h2>
        <p className="text-green-700 leading-relaxed text-base">
          O <strong>Pomofy</strong> é mais do que um cronômetro. É um espaço de
          produtividade e autocuidado digital. Para te ajudar a focar, pausar e respirar,
          com a calma e satisfação.
        </p>
</div>

      {/* FEATURES GRID */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white/70 hover:bg-white/90 transition-all border border-green-200 rounded-2xl p-6 shadow-md hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">
                  {feature.title}
                </h4>
                <p className="text-green-700 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LISTA DE DESTAQUES */}
      <div className="features-list mt-14 max-w-4xl bg-green-50 text-green-900 rounded-3xl p-8 border border-green-200 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-center">
          O que torna o Pomofy único
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Timer Pomodoro adaptável ao seu humor",
            "Gerenciamento inteligente de tarefas",
            "Mensagens motivacionais personalizadas",
            "Acompanhamento de progresso diário",
          ].map((text, i) => (
            <div key={i} className="feature-item flex items-center gap-3">
              <div className="feature-icon bg-green-500 text-white p-1.5 rounded-full flex items-center justify-center">
                <CheckCircle size={14} strokeWidth={3} />
              </div>
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="mt-16 bg-white/80 backdrop-blur-xl rounded-3xl p-6 text-center max-w-xl shadow-lg border border-green-200">
        <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2 text-green-800">
          <Users size={20} /> Conheça a Equipa
        </h3>
        <p className="text-green-700 text-sm mb-5">
          O Pomofy nasceu de um grupo de criadores apaixonados por tecnologia,
          e bem-estar. Cada funcionalidade reflete um pedacinho de
          cuidado humano.
        </p>
        <button
          onClick={() => setShowTeamModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 font-semibold text-white hover:from-green-500 hover:to-green-400 transition-all shadow-md"
        >
          Ver Equipa
        </button>
      </div>

      <TeamModal
        isOpen={showTeamModal}
        onClose={() => setShowTeamModal(false)}
        teamMembers={teamMembers}
      />
    </div>
  );
}
