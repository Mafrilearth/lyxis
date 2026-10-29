import { FloatingNav } from "./floating-nav";
import { buttonVariants } from "@heroui/styles";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Standard Global 8pt Grid Architecture
 * Pure Essential Minimal Homepage:
 * - Mathematical symmetry & strict 8pt grid scale across all components.
 * - Header: h-16 (64px = 8 x 8px)
 * - Footer: h-16 (64px = 8 x 8px)
 * - Hero Button: Ideal standard sizing (h-10 px-6, text-sm font-semibold, rounded-lg = 8px)
 * - Navbar Buttons: Exact h-8 px-4 (32px height, 16px padding, 8px radius)
 * - Grid Rails: Fully responsive border-x-0 on mobile/tablet/narrow screens, xl:border-x only when margins exist.
 * - Non-redundant: Single primary CTA in hero. Zero duplicate buttons or overlapping copywriting.
 * - Auth-aware: Directs authenticated users to /dashboard; requires unauthenticated users to authenticate first.
 * - Zero micro-interactions.
 * - 100% Global English.
 */
export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. HEADER (h-16, full width border-b) */}
      <FloatingNav isAuthenticated={isAuthenticated} />

      {/* 2. HERO CONTAINER (Responsive rails: border-x-0 when flush against screen, xl:border-x when margin exists) */}
      <main
        id="main-content"
        className="flex-1 max-w-6xl w-full mx-auto border-x-0 xl:border-x border-border bg-background flex flex-col"
      >
        <section
          aria-labelledby="hero-title"
          className="flex-1 flex flex-col items-center justify-center text-center py-24 sm:py-32 px-6 sm:px-8 space-y-6 relative"
        >
          <div className="space-y-4 max-w-3xl mx-auto flex flex-col items-center">
            {/* Title: Concise, unambiguous, official global standard */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.125] text-balance"
            >
              TOEFL Diagnostic
            </h1>

            {/* Description: 100% contextual, zero-redundancy global English */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Standardized score prediction and verified credentials.
            </p>

            {/* Primary Action: Single, non-redundant, ideal standard size (h-10 px-6, 8px radius) */}
            <div className="pt-2 flex justify-center">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "inline-flex items-center justify-center rounded-lg h-10 px-6 text-sm font-semibold",
                  )}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "inline-flex items-center justify-center rounded-lg h-10 px-6 text-sm font-semibold",
                  )}
                >
                  Start Assessment
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 3. FOOTER (Symmetrical h-16, full width border-t, identical horizontal padding) */}
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
