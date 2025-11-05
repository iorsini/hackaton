"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Grid, List, Coins } from "lucide-react";
import Link from "next/link";


<Link href="/dashboard/gameficacao">Voltar</Link>

export default function StorePage() {
  const [xp, setXp] = useState(1850);
  const [view, setView] = useState("grid");

  const items = [
    {
      id: 1,
      name: "Tema Minimalista",
      desc: "Interface limpa, foco total no essencial.",
      price: 400,
      image:
        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      name: "Pacote Sons de Concentração",
      desc: "Ambientes calmos para melhorar o foco.",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      name: "Avatar Premium",
      desc: "Desbloqueia novos estilos e expressões.",
      price: 800,
      image:
        "https://images.unsplash.com/photo-1520975618313-44e0d7997f81?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      name: "Relógio Analógico Pomofy",
      desc: "Visual de tempo clássico e minimalista.",
      price: 1000,
      image:
        "https://images.unsplash.com/photo-1616627459347-5f8a1b0a5b4d?w=800&h=600&fit=crop",
    },
  ];

  const handleBuy = (item) => {
    if (xp >= item.price) {
      setXp(xp - item.price);
      alert(`Item adquirido: ${item.name}`);
    } else {
      alert("XP insuficiente");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto">
        <Link
          href="/dashboard/gameficacao"
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <Coins className="w-4 h-4 text-amber-500" />
            <span className="font-medium">{xp} XP</span>
          </div>

          <div className="flex gap-1 border border-neutral-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2 hover:bg-neutral-100 ${
                view === "grid" ? "bg-neutral-100" : ""
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 hover:bg-neutral-100 ${
                view === "list" ? "bg-neutral-100" : ""
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
          Loja Pomofy
        </h1>
        <p className="text-neutral-500 text-sm md:text-base">
          Troca teus pontos por melhorias estéticas e funcionais. Mantém o foco, ganha recompensas.
        </p>
      </div>

      {/* Items */}
      <div
        className={`max-w-5xl mx-auto transition-all ${
          view === "grid"
            ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-4"
        }`}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className={`bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex ${
              view === "list" ? "flex-row h-36" : "flex-col"
            }`}
          >
            <div
              className={`${
                view === "list"
                  ? "w-40 h-full"
                  : "h-48 w-full"
              } flex-shrink-0`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-4 flex-1">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-neutral-500 leading-snug line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-medium text-neutral-700">
                  {item.price} XP
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBuy(item)}
                  className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 transition"
                >
                  Adquirir
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
