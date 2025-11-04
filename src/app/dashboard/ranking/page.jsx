// src/app/dashboard/sobre/page.jsx
"use client";

import { useState } from "react";
import { ArrowLeft, Users, Heart, Brain, Clock, Sparkles } from "lucide-react";
import TeamModal from "@/components/dashboard/TeamModal";

export default function AboutPomofy() {
  const [showTeamModal, setShowTeamModal] = useState(false);

  const teamMembers = [
    {
      name: "Paula Guollo",
      role: "Product Designer & Researcher",
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
      name: "Mishal Saheer",
      role: "Backend Developer",
      github: "https://github.com/msaheers",
      linkedin: "https://www.linkedin.com/in/mishal-saheer-a90146323/",
      avatar: "/images/mishal.jpeg",
    },
  ];

  const features = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Pomodoro Empático",
      description: "O Pomofy adapta o ritmo conforme o teu humor — produtividade sem culpa.",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Foco e Criatividade",
      description: "Alterna ciclos de foco e pausas criativas para estimular o equilíbrio mental.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Ritmo Saudável",
      description: "Ajuda-te a manter constância diária, sem pressão ou exaustão.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Mood Tracking",
      description: "Regista o teu estado emocional e acompanha a tua evolução ao longo dos dias.",
    },
  ];

  return (
    <>
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }
      `}</style>

      <div className="min-h-screen text-white flex flex-col items-center px-6 py-10">
        {/* HEADER */}
        <div className="w-full max-w-5xl flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-white/30 transition-all"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-2xl font-bold">Sobre o Pomofy</h1>
          <img
            src="/images/logo_pomofy.png"
            alt="Pomofy Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* HERO */}
        <div className="max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold mb-4">Um Pomodoro que se importa contigo 💜</h2>
          <p className="text-white/90 leading-relaxed">
            O <strong>Pomofy</strong> é mais do que um cronômetro — é um espaço de
            autocuidado digital. Acreditamos que produtividade não precisa vir à
            custa do bem-estar. Por isso, cada ciclo de foco é acompanhado de pausas
            conscientes e de momentos para verificar o teu <em>mood</em>.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-pink-300" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300/60" />
          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/25 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-pink-400/40 to-purple-500/40 rounded-xl">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TEAM SECTION */}
        <div className="mt-16 bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-center max-w-xl shadow-lg border border-white/20">
          <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
            <Users size={20} /> Conheça a Equipa
          </h3>
          <p className="text-white/80 text-sm mb-5">
            O Pomofy nasceu de um grupo de criadores apaixonados por tecnologia e
            bem-estar. Cada funcionalidade reflete um pedacinho de cuidado humano 💫
          </p>
          <button
            onClick={() => setShowTeamModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-white hover:from-purple-500 hover:to-pink-400 transition-all shadow-lg"
          >
            Ver Equipa
          </button>
        </div>

        <TeamModal
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          teamMembers={teamMembers}
        />

        {/* FOOTER */}
        <footer className="mt-16 text-center text-sm text-white/70">
          © 2025 Pomofy — Um Pomodoro empático que te lembra de cuidar de ti 💜
        </footer>
      </div>
    </>
  );
}
