"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Standard Global Header Navigation (8pt Baseline Grid Architecture)
 * - Exact height: h-16 (64px = 16 Tailwind units = 8 x 8px grid cells).
 * - Docks firmly to top when scrolling (sticky top-0).
 * - Solid, high-contrast, unfaded grid borders (border-zinc-300 dark:border-zinc-800).
 * - Content mathematically centered along direction axis.
 * - Uniform corner radii (rounded-lg = 8px = 1 grid cell).
 * - Strictly: Brand name only, Masuk, Daftar, Theme Toggle.
 */
export function FloatingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-300 dark:border-zinc-800 bg-background/95 backdrop-blur-md">
      <div className="w-full max-w-6xl mx-auto border-x border-zinc-300 dark:border-zinc-800 px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Anchor: Vertically Centered */}
        <Link href="/" className="flex items-center group shrink-0 outline-none">
          <span className="font-extrabold text-xl tracking-tight text-foreground leading-none transition-opacity group-hover:opacity-85 select-none">
            Lyxis
          </span>
        </Link>

        {/* Action Cluster: Exact Centered Alignment, 8px Radius, Zero Shadows */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-9 px-3.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors border border-transparent shadow-none",
            )}
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-9 px-4 sm:px-5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors border border-transparent shadow-none",
            )}
          >
            Daftar
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
