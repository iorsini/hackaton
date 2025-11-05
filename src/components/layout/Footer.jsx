"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white/70 backdrop-blur-md text-center py-8 mt-20">
      {/* Redes sociais */}
      <div className="flex justify-center gap-6 mb-4">
        {[
          { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
          { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
          { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-neutral-500 hover:text-indigo-600 transition-colors duration-200"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Texto */}
      <p className="text-xs md:text-sm text-neutral-500 font-medium tracking-wide">
        © 2025 Desenvolvido por{" "}
        <span className="text-neutral-800 font-semibold hover:text-indigo-600 transition-colors">
          Pomofy
        </span>
        . Produtividade com empatia.
      </p>
    </footer>
  );
}
