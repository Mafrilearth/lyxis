"use client";

import { ThemeToggle } from "./theme-toggle";
import { Separator } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FloatingNavProps {
  isAuthenticated?: boolean;
}

/**
 * Standard Global Header Navigation (8pt Baseline Grid Architecture)
 * - Exact height: h-16 (64px = 8 x 8px grid cells).
 * - Full horizontal edge-to-edge bottom line (border-b), strictly NO side borders.
 * - Semantic Hierarchy: W3C WAI-ARIA Landmark <header> and <nav>.
 * - Component Grouping: Strict separation between User Authentication and System Utility.
 * - Strict 8pt Scale: h-8 (32px = 4x8pt) interactive controls, gap-2 (8px), gap-4 (16px), h-4 (16px) divider.
 * - Uniform Components: Uses official shadcn buttonVariants and Separator.
 * - Auth-aware: Directs authenticated users to Dashboard; presents unauthenticated users with Sign In/Up.
 * - 100% Global English and accessibility compliant.
 */
export function FloatingNav({ isAuthenticated = false }: FloatingNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* 1. Brand Identity Anchor */}
        <Link
          href="/"
          aria-label="Lyxis"
          className="flex items-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <span className="font-extrabold text-xl tracking-tight text-foreground leading-none select-none">
            Lyxis
          </span>
        </Link>

        {/* 2. Semantic Navigation Landmark */}
        <nav aria-label="Main" className="flex items-center gap-4 h-8">
          {/* Group A: User Authentication Actions */}
          <div className="flex items-center gap-2 h-8" role="group" aria-label="Account">
            {isAuthenticated ? (
              <Link
                href="/candidate/dashboard"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "h-8 px-4 text-sm font-medium rounded-lg",
                )}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "h-8 px-4 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground",
                  )}
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "h-8 px-4 text-sm font-medium rounded-lg",
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Group Boundary Divider (Official Shadcn Separator - Exactly Centered) */}
          <Separator
            orientation="vertical"
            className="!h-4 !w-px my-auto self-center bg-border shrink-0"
          />

          {/* Group B: System Utility Controls */}
          <div className="flex items-center h-8" role="group" aria-label="System">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
