"use client";

import { ThemeToggle } from "./theme-toggle";
import { Separator } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FloatingNavProps {
  isAuthenticated?: boolean;
}

export function FloatingNav({ isAuthenticated = false }: FloatingNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Lyxis Home"
          className="flex items-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
        >
          <span className="font-extrabold text-xl tracking-tight text-foreground leading-none font-mono select-none">
            Lyxis
          </span>
        </Link>

        <nav aria-label="Main Navigation" className="flex items-center gap-4 h-8">
          <div className="flex items-center gap-2 h-8" role="group" aria-label="Account">
            {isAuthenticated ? (
              <Link
                href="/candidate/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-8 px-4 text-xs font-semibold rounded-md border-border hover:bg-surface-secondary text-foreground",
                )}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-8 px-3.5 text-xs font-medium rounded-md text-muted hover:text-foreground",
                )}
              >
                Sign In
              </Link>
            )}
          </div>

          <Separator
            orientation="vertical"
            className="!h-4 !w-px my-auto self-center bg-border shrink-0"
          />

          <div className="flex items-center h-8" role="group" aria-label="System Theme">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
