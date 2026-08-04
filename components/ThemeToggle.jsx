'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full p-1">
      <button
        onClick={() => setTheme('light')}
        className={`w-7 h-7 rounded-full flex items-center justify-center ${theme === 'light'
            ? 'bg-linear-to-r from-orange-600 to-red-600 text-white'
            : 'text-zinc-400'
          }`}
      >
        <Sun className="w-4 h-4" />

      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`w-7 h-7 rounded-full flex items-center justify-center ${theme === 'dark'
            ? 'bg-linear-to-r from-orange-700 to-rose-800 text-white'
            : 'text-zinc-400'
          }`}
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}