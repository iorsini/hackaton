"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-md hover:scale-110 transition"
    >
      {theme === "light" ? (
        <Moon className="text-gray-700" size={20} />
      ) : (
        <Sun className="text-yellow-400" size={22} />
      )}
    </button>
  );
}
