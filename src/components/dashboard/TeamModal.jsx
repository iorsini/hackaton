"use client";

import { useEffect } from "react";
import { X, Github, Linkedin } from "lucide-react";

export default function TeamModal({ isOpen, onClose, teamMembers = [] }) {
  // useEffect sempre no topo
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [isOpen, onClose]);

  // hooks antes do return, sem condicional
  const safeTeam = teamMembers.map((m) => ({
    ...m,
    name: m?.name ?? "Membro",
    role: m?.role ?? "Contributor",
    avatar: m?.avatar ?? "",
    github: m?.github ?? "",
    linkedin: m?.linkedin ?? "",
  }));

  if (!isOpen) return null;

  const initials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Fundo escurecido */}
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl mx-4 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white text-lg font-semibold">Nossa Equipa</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safeTeam.map((member, idx) => (
              <div
                key={`${member.name}-${idx}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 hover:bg-white/20 transition p-4"
              >
                {/* Avatar ou iniciais */}
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white/30 shadow"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="hidden w-14 h-14 rounded-full items-center justify-center font-bold text-white bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-white/30 shadow"
                  style={{ display: member.avatar ? "none" : "flex" }}
                >
                  {initials(member.name)}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-white font-semibold leading-tight">
                    {member.name}
                  </p>
                  <p className="text-white/70 text-sm">{member.role}</p>

                  <div className="mt-3 flex items-center gap-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-white/90 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg text-sm transition"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {member.linkedin && member.linkedin !== "NAO SEI" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-white/90 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg text-sm transition"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Fechar */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 shadow-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
