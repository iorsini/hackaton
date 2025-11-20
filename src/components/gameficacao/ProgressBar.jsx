"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ value, max }) {
  const progress = (value / max) * 100;
  return (
    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6 }}
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-inner"
      ></motion.div>
    </div>
  );
}
