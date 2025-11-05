"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AvatarPomofy({ level }) {
  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="relative w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-2xl"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-white text-5xl font-bold select-none"
      >
        😎
      </motion.div>
      <div className="absolute -bottom-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-slate-700 shadow-md flex items-center gap-1">
        <Sparkles className="text-yellow-500 w-4 h-4" /> Lv.{level}
      </div>
    </motion.div>
  );
}
