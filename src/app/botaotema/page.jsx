"use client";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen transition-colors duration-300 bg-fundoClaro text-textoClaro dark:bg-fundoEscuro dark:text-textoEscuro">
      <ThemeSwitcher />
    </main>
  );
}
