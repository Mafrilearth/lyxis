import { ThemeToggle } from "@/app/_components/theme-toggle";
import Link from "next/link";
import type React from "react";

interface AuthShellProps {
  children: React.ReactNode;
  mode: "login" | "register";
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            aria-label="Lyxis"
            className="flex items-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span className="font-extrabold text-xl tracking-tight text-foreground leading-none select-none">
              Lyxis
            </span>
          </Link>

          <div className="flex items-center h-8" role="group" aria-label="System">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="flex-1 max-w-6xl w-full mx-auto border-x-0 xl:border-x border-border bg-background flex flex-col items-center justify-center py-16 sm:py-24 px-6 sm:px-8"
      >
        <div className="w-full max-w-md mx-auto">{children}</div>
      </main>

      <footer
        role="contentinfo"
        className="w-full border-t border-border bg-background h-16 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-center text-center font-mono text-xs text-muted-foreground">
          <p>© 2026 Lyxis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
