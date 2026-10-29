"use client";

import { ThemeToggle } from "./theme-toggle";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

interface FloatingNavProps {
  isAuthenticated?: boolean;
}

export function FloatingNav({ isAuthenticated = false }: FloatingNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-5 pb-2">
      <div className="max-w-4xl mx-auto rounded-full border-2 border-border bg-surface-secondary p-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl">
        <div className="rounded-full border border-border/80 bg-surface px-4 sm:px-5 h-12 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
          <Link href="/" aria-label="Lyxis Home" className="flex items-center gap-2.5 outline-none">
            <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              <div className="w-6 h-6 rounded-full border border-border/80 bg-surface flex items-center justify-center text-accent shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="font-extrabold text-base tracking-tight text-foreground font-mono">
              Lyxis
            </span>
          </Link>

          <nav aria-label="Main Navigation" className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                <Link
                  href="/candidate/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold h-7 px-4 border border-white/20 shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-all"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-surface-secondary text-foreground text-xs font-medium h-7 px-3.5 border border-border/80 shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:bg-surface transition-all"
                  >
                    Sign In
                  </Link>
                </div>

                <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold h-7 px-4 border border-white/20 shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

            <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_4px_rgba(0,0,0,0.2)] ml-0.5">
              <div className="rounded-full border border-border/80 bg-surface w-7 h-7 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
