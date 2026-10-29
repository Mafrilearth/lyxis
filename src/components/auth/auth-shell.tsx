import { ThemeToggle } from "@/components/shared/theme-toggle";
import Link from "next/link";
import type React from "react";

interface AuthShellProps {
  children: React.ReactNode;
  mode: "login" | "register";
}

/**
 * Standard Global Authentication Shell (8pt Baseline Grid Architecture)
 * - Exact height header & footer: h-16 (64px = 8 x 8px grid cells).
 * - Symmetrical CAD vertical boundary rails (max-w-6xl, border-x-0 xl:border-x border-border).
 * - Non-redundant: Clean header with Brand and ThemeToggle; mode switcher located exclusively at form bottom.
 * - Semantic Hierarchy: W3C WAI-ARIA Landmark <header>, <main>, and <footer>.
 * - 100% Global English and accessibility compliant.
 */
export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. HEADER (h-16, full horizontal border-b) */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand Identity Anchor */}
          <Link
            href="/"
            aria-label="Lyxis"
            className="flex items-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span className="font-extrabold text-xl tracking-tight text-foreground leading-none select-none">
              Lyxis
            </span>
          </Link>

          {/* System Utility Controls */}
          <div className="flex items-center h-8" role="group" aria-label="System">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER (Responsive rails: border-x-0 on mobile/tablet, xl:border-x when margin exists) */}
      <main
        id="main-content"
        className="flex-1 max-w-6xl w-full mx-auto border-x-0 xl:border-x border-border bg-background flex flex-col items-center justify-center py-16 sm:py-24 px-6 sm:px-8"
      >
        <div className="w-full max-w-md mx-auto">{children}</div>
      </main>

      {/* 3. FOOTER (Symmetrical h-16, full width border-t) */}
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
