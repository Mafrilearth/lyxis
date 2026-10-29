import { FloatingNav } from "./_components/floating-nav";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between">
      <FloatingNav isAuthenticated={isAuthenticated} />

      <main
        id="main-content"
        className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center justify-center"
      >
        <section
          aria-labelledby="hero-title"
          className="w-full rounded-[34px] border-2 border-border bg-surface-secondary p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <div className="w-full rounded-[28px] border border-border/80 bg-surface p-8 sm:p-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col items-center space-y-7">
            <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_6px_rgba(0,0,0,0.25)] inline-flex">
              <div className="rounded-full border border-border/80 bg-surface-secondary px-3.5 py-1 text-xs font-mono text-muted flex items-center gap-2 shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>TOEFL ITP® Diagnostic Platform</span>
              </div>
            </div>

            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.125] text-balance font-sans"
            >
              Predict Your TOEFL Score with Machine Precision
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mx-auto text-balance">
              Standardized 115-minute diagnostic simulation with 140 calibrated questions, instant
              scaled score prediction, and verified digital credentials.
            </p>

            <div className="w-full max-w-md mx-auto rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              <div className="rounded-full border border-border/80 bg-surface-secondary pl-4 pr-1.5 py-1.5 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <span className="text-xs text-muted font-mono truncate">
                  Target: LPDP Scholarship (550+)
                </span>
                <div className="rounded-full border border-white/20 bg-accent text-accent-foreground px-3.5 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.45)]">
                  <span className="font-mono text-xs tracking-tighter">|||</span>
                  <span>Calibrate</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {isAuthenticated ? (
                <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_3px_10px_rgba(0,0,0,0.3)] inline-flex">
                  <Link
                    href="/candidate/dashboard"
                    className="rounded-full border border-white/20 bg-accent text-accent-foreground font-semibold px-7 py-2.5 text-sm shadow-[0_4px_10px_rgba(0,0,0,0.45)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-all flex items-center gap-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_3px_10px_rgba(0,0,0,0.3)] inline-flex">
                    <Link
                      href="/register"
                      className="rounded-full border border-white/20 bg-accent text-accent-foreground font-semibold px-7 py-2.5 text-sm shadow-[0_4px_10px_rgba(0,0,0,0.45)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-all flex items-center gap-2"
                    >
                      <span>Start Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_8px_rgba(0,0,0,0.2)] inline-flex">
                    <Link
                      href="/login"
                      className="rounded-full border border-border/80 bg-surface-secondary text-foreground font-medium px-6 py-2.5 text-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)] hover:bg-surface transition-all"
                    >
                      Candidate Sign In
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer role="contentinfo" className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
        <div className="rounded-full border-2 border-border bg-surface-secondary p-1 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
          <div className="rounded-full border border-border/80 bg-surface px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-muted shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
            <p>© 2026 Lyxis. All rights reserved.</p>
            <div className="rounded-full border-2 border-border bg-surface-tertiary p-1 shadow-[0_2px_4px_rgba(0,0,0,0.2)] inline-flex">
              <span className="rounded-full border border-border/80 bg-surface-secondary px-3 py-0.5 text-[11px] text-accent font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                Standard CEFR • Scaled 310–677
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
