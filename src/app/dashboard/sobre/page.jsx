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
  Target,
} from "lucide-react";

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
      icon: <Heart className="w-6 h-6" />,
      title: "Produtividade sem Culpa",
      description: "O Pomofy adapta o ritmo conforme o teu humor e energia do momento.",
      color: "from-purple-400 to-purple-500",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Foco e Criatividade",
      description: "Alterna ciclos de foco e pausas para estimular o equilíbrio mental e criativo.",
      color: "from-blue-400 to-blue-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ritmo Saudável",
      description: "Ajuda-te a manter constância diária, sem pressão ou exaustão física.",
      color: "from-green-400 to-green-500",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Mood Tracking",
      description: "Acompanha o teu humor e vê a tua evolução emocional ao longo dos dias.",
      color: "from-indigo-400 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header fixo */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Sobre o Pomofy
            </h1>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Um Pomodoro Empático</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
                Produtividade com Autocuidado
              </h2>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                O <strong className="text-purple-600">Pomofy</strong> é mais do que um cronômetro. É um espaço de
                produtividade e autocuidado digital, criado para te ajudar a focar, pausar e respirar,
                com calma e satisfação.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Funcionalidades Principais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`p-3 sm:p-4 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 text-center shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-2xl sm:rounded-3xl mb-6 shadow-lg">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
              Conheça a Equipa
            </h3>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              O Pomofy nasceu de um grupo de criadores apaixonados por tecnologia e bem-estar.
              Cada funcionalidade reflete um pedacinho de cuidado humano.
            </p>
            
            <button
              onClick={() => setShowTeamModal(true)}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 font-semibold text-white text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Users className="w-5 h-5" />
              Ver Equipa
            </button>
          </div>
        </section>
      </main>

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Nossa Equipa</h3>
              <button
                onClick={() => setShowTeamModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="text-2xl text-gray-600">×</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 border border-gray-200/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 p-1 mb-4 shadow-lg">
                      <div className="w-full h-full rounded-2xl bg-gray-200 overflow-hidden">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e5e7eb" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="sans-serif" font-size="40">👤</text></svg>';
                          }}
                        />
                      </div>
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">{member.role}</p>
                    
                    <div className="flex gap-3">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm rounded-lg transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}