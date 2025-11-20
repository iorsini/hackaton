"use client";

import { motion } from "framer-motion";
import { Check, ShoppingBag, Sparkles } from "lucide-react";

const RARITY_STYLES = {
  common:   { ring: "ring-slate-200",     chip: "bg-slate-100 text-slate-700",     label: "Comum" },
  rare:     { ring: "ring-indigo-200",    chip: "bg-indigo-100 text-indigo-700",   label: "Raro" },
  epic:     { ring: "ring-fuchsia-200",   chip: "bg-fuchsia-100 text-fuchsia-700", label: "Épico" },
  legendary:{ ring: "ring-amber-200",     chip: "bg-amber-100 text-amber-800",     label: "Lendário" },
};

export default function ItemCard({
  item,
  onBuy,
  onEquip,
  disabled = false,
  owned = false,
}) {
  const { nome, preco, image, rarity = "common" } = item || {};
  const rarityStyle = RARITY_STYLES[rarity] || RARITY_STYLES.common;

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200 shadow-md ${
        disabled ? "opacity-60" : "hover:shadow-xl"
      }`}
    >
      {/* Top media */}
      <div className={`aspect-[4/3] w-full ring-2 ${rarityStyle.ring}`}>
        {image ? (
          <img
            src={image}
            alt={nome}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 grid place-items-center">
            <Sparkles className="w-10 h-10 text-indigo-400" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-800 leading-snug">{nome}</h3>
          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${rarityStyle.chip}`}>
            {RARITY_STYLES[rarity]?.label}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{preco}</span> XP
          </p>

          {owned ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onEquip?.(item)}
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-3 py-2 rounded-xl"
            >
              <Check size={16} /> Equipar
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => !disabled && onBuy?.(item)}
              disabled={disabled}
              className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl ${
                disabled
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              <ShoppingBag size={16} /> Comprar
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
