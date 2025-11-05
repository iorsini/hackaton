"use client";
import { useState } from "react";

export default function DesafioFoco() {
  const [estado, setEstado] = useState("pronto");
  const [mensagem, setMensagem] = useState("Clique em 'Começar' para testar seu reflexo!");
  const [tempo, setTempo] = useState(0);
  const [inicio, setInicio] = useState(null);

  const iniciar = () => {
    setEstado("esperando");
    setMensagem("Espere o círculo mudar de cor...");
    const delay = Math.floor(Math.random() * 3000) + 2000;
    setTimeout(() => {
      setEstado("clicar");
      setInicio(Date.now());
      setMensagem("AGORA! Clique rápido!");
    }, delay);
  };

  const clicar = () => {
    if (estado === "clicar") {
      const tempoFinal = Date.now() - inicio;
      setTempo(tempoFinal);
      setMensagem(`Teu tempo de reação: ${tempoFinal}ms`);
      setEstado("pronto");
    } else if (estado === "esperando") {
      setMensagem("Clicou cedo demais! Tenta outra vez.");
      setEstado("pronto");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-20">
      <p className="text-center mb-6">{mensagem}</p>
      <div
        onClick={clicar}
        className={`w-32 h-32 rounded-full transition-all duration-300 cursor-pointer ${
          estado === "clicar"
            ? "bg-green-500"
            : estado === "esperando"
            ? "bg-red-400"
            : "bg-slate-300 dark:bg-slate-700"
        }`}
      ></div>
      <button
        onClick={iniciar}
        className="mt-8 px-6 py-3 bg-slate-900 text-white rounded-lg dark:bg-slate-100 dark:text-slate-900 hover:scale-105 transition"
      >
        Começar
      </button>
      {tempo > 0 && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {tempo < 250
            ? "Incrível! Reflexo de ninja."
            : tempo < 400
            ? "Ótimo foco."
            : "Tua mente precisa de uma pausa..."}
        </p>
      )}
    </div>
  );
}
