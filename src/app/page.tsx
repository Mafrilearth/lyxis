import { FloatingNav } from "@/components/landing/floating-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Standard Global 8pt Grid Architecture
 * Homepage strictly contains: Header, Hero, and Footer.
 * Language: Global English.
 * All components wrapped in visible, solid, high-contrast CAD grid rails (border-zinc-300 dark:border-zinc-800).
 * Footer: Strictly "© 2026. All rights reserved." only.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* 1. HEADER GRID (Strictly 16 Units = 64px = 8x8px) */}
      <FloatingNav />

      {/* 2. HERO GRID CONTAINER (Wrapped in Solid Unfaded Grid Rails) */}
      <main className="flex-1 max-w-6xl w-full mx-auto border-x border-zinc-300 dark:border-zinc-800 bg-background flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center text-center py-20 sm:py-28 lg:py-32 px-6 sm:px-8 space-y-6 border-b border-zinc-300 dark:border-zinc-800 relative">
          <div className="space-y-4 max-w-3xl mx-auto flex flex-col items-center">
            {/* Global Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] text-balance">
              Online TOEFL ITP® Diagnostic & Simulation
            </h1>

            {/* Minimal Essential Value Proposition */}
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Standard 140-item examination across Listening, Structure, and Reading. Calibrated to
              the official 310–677 scaled score.
            </p>

            {/* Core Action Buttons: Directionally Centered, No Shadow, No Hover Border Jumping */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 w-full max-w-md sm:max-w-none mx-auto text-sm">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-none transition-colors",
                )}
              >
                <span>Start Simulation</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-semibold border border-zinc-300 dark:border-zinc-800 bg-background hover:bg-muted text-foreground shadow-none transition-colors",
                )}
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 3. FOOTER GRID (Strictly Copyright Only, No Brand, No Links) */}
      <footer className="w-full border-b border-zinc-300 dark:border-zinc-800 bg-background/95">
        <div className="max-w-6xl mx-auto border-x border-zinc-300 dark:border-zinc-800 py-6 px-6 sm:px-8 flex items-center justify-center text-center font-mono text-xs text-muted-foreground">
          <span>© 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
