import { FloatingNav } from "./_components/floating-nav";
import { ShowcaseStage } from "./_components/showcase-stage";
import { Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <FloatingNav isAuthenticated={isAuthenticated} />

      <main
        id="main-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col items-center space-y-12 sm:space-y-16"
      >
        <section
          aria-labelledby="hero-title"
          className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-muted hover:border-accent/40 transition-colors">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>ETS Standardized TOEFL ITP® Simulator</span>
            <Chip
              size="sm"
              variant="soft"
              className="h-5 px-2 text-[10px] font-mono border border-border"
            >
              v3.2.7
            </Chip>
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.125] text-balance"
          >
            Predict Your TOEFL Score with Machine Precision
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto text-balance">
            115 minutes, 140 calibrated questions, and verified digital credentials. Built for
            scholarship applicants, academic placement, and career readiness.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/candidate/dashboard"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "inline-flex items-center justify-center rounded-full h-11 px-7 text-sm font-semibold shadow-md shadow-accent/20 gap-2",
                )}
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "inline-flex items-center justify-center rounded-full h-11 px-7 text-sm font-semibold shadow-md shadow-accent/20 gap-2",
                  )}
                >
                  <span>Start Free Diagnostic</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium border-border hover:bg-surface-secondary text-foreground",
                  )}
                >
                  Candidate Sign In
                </Link>
              </>
            )}
          </div>
        </section>

        <section aria-label="Interactive Platform Showcase" className="w-full">
          <ShowcaseStage />
        </section>
      </main>

      <footer
        role="contentinfo"
        className="w-full border-t border-border bg-surface/50 h-16 flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-muted">
          <p>© 2026 Lyxis. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
