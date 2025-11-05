"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

import AvatarPomofy from "@/components/gameficacao/AvatarPomofy";
import ProgressBar from "@/components/gameficacao/ProgressBar";

export default function GameficacaoPage() {
  const [xp, setXp] = useState(1850);
  const level = Math.floor(xp / 1000);
  const currentXP = xp % 1000;

  const missões = [
    { id: 1, nome: "Completa 4 Pomodoros hoje", done: true, reward: 200 },
    { id: 2, nome: "Mantém 3 dias de foco", done: false, reward: 300 },
    { id: 3, nome: "Conclui meta semanal", done: false, reward: 500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-6 py-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4"
      >
        PomoGameFy 
      </motion.h1>

      <p className="text-slate-600 text-center mb-10 max-w-2xl">
        Conquista XP, evolui teu avatar e transforma o foco em diversão!
      </p>

      {/* === Avatar + XP === */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
        <AvatarPomofy level={level} />
        <div className="max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold mb-2 text-slate-700">
            Nível {level}
          </h2>
          <ProgressBar value={currentXP} max={1000} />
          <p className="text-sm text-slate-500 mt-2">{currentXP}/1000 XP</p>
        </div>
      </div>

      {/* === Missões === */}
      <div className="max-w-2xl w-full mx-auto mb-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          Missões 
        </h3>
        <div className="grid gap-4">
          {missões.map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className={`p-4 rounded-xl flex items-center justify-between border shadow-md ${
                m.done
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star
                  size={20}
                  className={m.done ? "text-green-500" : "text-slate-400"}
                />
                <span
                  className={`font-medium ${
                    m.done ? "text-green-600 line-through" : "text-slate-700"
                  }`}
                >
                  {m.nome}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-500">
                +{m.reward} XP
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === Botão Loja === */}
      <div className="flex justify-center">
        <Link
          href="/dashboard/store"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md"
        >
          Ir para a Loja <ArrowRight size={18} />
        </Link>
      </div>
      <>
            <Link href="app/dashboard/gameficacao">Voltar</Link>
            </>
    </div>
  );
}
