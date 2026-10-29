"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Standard Global Header Navigation
 * Strictly minimal as specified: Brand name only, Masuk, Daftar, and Theme Toggle.
 * No menus, no extra tags or badges.
 */
export function FloatingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-6xl w-full mx-auto border-x border-border px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Nama Brand Saja */}
        <Link href="/" className="flex items-center group shrink-0">
          <span className="font-extrabold text-xl tracking-tight text-foreground transition-opacity group-hover:opacity-80">
            Lyxis
          </span>
        </Link>

        {/* Aksi Kanan: Masuk, Daftar, Toggle Theme */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground h-9 px-3",
            )}
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-9 px-4 rounded-lg text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
            )}
          >
            Daftar
          </Link>

          <ThemeToggle className="h-9 w-9 rounded-lg border border-border bg-muted/20 hover:bg-muted/60 transition-all" />
        </div>
      </div>
    </header>
  );
}
