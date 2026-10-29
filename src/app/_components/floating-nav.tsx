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

        <nav aria-label="Main" className="flex items-center gap-4 h-8">
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

          <Separator
            orientation="vertical"
            className="!h-4 !w-px my-auto self-center bg-border shrink-0"
          />

          <div className="flex items-center h-8" role="group" aria-label="System">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
