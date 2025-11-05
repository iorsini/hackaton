"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronDown } from "lucide-react";

export default function FaqWidget() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  const faqs = [
    {
      pergunta: "O que é o Pomofy?",
      resposta:
        "Um temporizador baseado na técnica Pomodoro. Feito para te ajudar a equilibrar foco e pausas com empatia e leveza.",
    },
    {
      pergunta: "Posso personalizar meu humor?",
      resposta:
        "Sim! Antes de iniciar cada sessão, podes escolher teu mood. O Pomofy adapta o ritmo conforme teu estado emocional.",
    },
    {
      pergunta: "O Pomofy é gratuito?",
      resposta:
        "Totalmente. O objetivo é cuidar da tua rotina, não te cobrar por ela.",
    },
    {
      pergunta: "O que acontece nas pausas?",
      resposta:
        "Durante as pausas, o Pomofy te convida a respirar e fazer pequenos gestos de cuidado.",
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 w-full h-0">
      {/* Botão flutuante */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Ajuda Pomofy"
        className="
          absolute bottom-5 right-5
          bg-gradient-to-br from-green-500 to-emerald-500
          text-white
          p-3 rounded-full shadow-lg
          hover:shadow-xl hover:brightness-105
          transition-all duration-200
          z-30
        "
      >
        {open ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
      </motion.button>

      {/* Caixa de FAQ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.25 }}
            className="
              absolute bottom-16 right-5
              w-[85vw] max-w-[300px]
              bg-white/95 text-green-900
              rounded-2xl shadow-xl border border-green-200
              backdrop-blur-md
              z-20 overflow-hidden
            "
          >
            {/* Header */}
            <div className="px-4 py-2 flex justify-between items-center border-b border-green-100 bg-green-50/70">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">Assistente Pomofy</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-green-800/60 hover:text-green-800 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-3 max-h-[40vh] overflow-y-auto text-sm">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-green-100/70 py-2">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex justify-between items-center text-left font-medium text-green-800"
                  >
                    {faq.pergunta}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-green-700 transition-transform duration-300 ${
                        activeIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-1.5 text-xs text-green-700/90 leading-relaxed"
                      >
                        {faq.resposta}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
