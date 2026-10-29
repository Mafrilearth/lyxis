import { FloatingNav } from "./_components/floating-nav";
import { Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
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
        className="flex-1 max-w-6xl w-full mx-auto border-x-0 xl:border-x border-border bg-background flex flex-col justify-center"
      >
        <section
          aria-labelledby="hero-title"
          className="flex flex-col items-center justify-center text-center py-20 sm:py-28 px-6 sm:px-8 space-y-6"
        >
          <div className="space-y-4 max-w-2xl mx-auto flex flex-col items-center">
            <Chip size="sm" variant="soft" className="border border-border font-mono text-xs">
              TOEFL ITP® Standard
            </Chip>

            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.125] text-balance font-sans"
            >
              Diagnostic Simulation
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mx-auto text-balance">
              Standardized score prediction and verified institutional credentials.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {isAuthenticated ? (
                <Link
                  href="/candidate/dashboard"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                    "inline-flex items-center justify-center rounded-md h-10 px-6 text-sm font-semibold",
                  )}
                >
                  Enter Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className={cn(
                      buttonVariants({ variant: "primary", size: "md" }),
                      "inline-flex items-center justify-center rounded-md h-10 px-6 text-sm font-semibold",
                    )}
                  >
                    Begin Diagnostic
                  </Link>

                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "md" }),
                      "inline-flex items-center justify-center rounded-md h-10 px-6 text-sm font-medium border-border hover:bg-surface-secondary text-foreground",
                    )}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer
        role="contentinfo"
        className="w-full border-t border-border bg-background h-16 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between text-center font-mono text-xs text-muted">
          <p>© 2026 Lyxis. All rights reserved.</p>
          <p className="hidden sm:block">Scaled Score 310–677 • CEFR Mapped</p>
        </div>
      </footer>
    </div>
  );
}
