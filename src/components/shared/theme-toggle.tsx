"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "h-9 w-9 inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-800 bg-background text-muted-foreground opacity-50 shadow-none cursor-default",
          className,
        )}
        aria-label="Toggle visual theme"
        disabled
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "h-9 w-9 inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-800 bg-background text-foreground hover:bg-muted transition-colors shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
        className,
      )}
      title={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-primary transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme (Current: {theme})</span>
    </button>
  );
}
