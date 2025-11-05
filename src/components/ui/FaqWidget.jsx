"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function FaqWidget() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Como funciona o Pomofy?",
      answer:
        "O Pomofy usa a técnica Pomodoro para ajudar você a manter o foco e gerenciar melhor seu tempo.",
    },
    {
      question: "Posso personalizar o tempo de foco e pausa?",
      answer:
        "Sim! Você pode ajustar a duração dos ciclos conforme sua rotina e preferências.",
    },
    {
      question: "O modo escuro está disponível?",
      answer:
        "Sim! O Pomofy conta com dark mode e ajustes de tema para melhorar o conforto visual.",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão para abrir o widget */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Caixa do FAQ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-5 rounded-2xl shadow-xl w-80 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">FAQ</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className="w-full text-left font-medium flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <motion.span
                      animate={{ rotate: activeIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-gray-600 dark:text-gray-300 mt-2"
                      >
                        {faq.answer}
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
